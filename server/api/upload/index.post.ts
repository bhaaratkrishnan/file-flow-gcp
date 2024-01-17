import { checkKeyAvailability, setEntity } from "~/server/utils/datastore";
import { getSignedUrl } from "~/server/utils/google_cloud_storage";
import { generateShortUrlId } from "~/server/utils/id_generator";
import { findNextNoon } from "~/server/utils/timestamp";

// Important
// Service Account should be created with Service Account Token Creator Role
// Go to Storage Bucket and add the service account with Storage Admin Permissions
// IAM Service Account Credential API should be Enabled
// Impersanate the service using gcloud cli
// Add client_email in json file
// Current Account : share-safe-service-account-2@serverless-web-apis-test.iam.gserviceaccount.com
export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);
    const clientIp = getHeader(event, "X-Forwarded-For") ?? "Undefined";
    const currentHost = getHeader(event, "host");
    const clientData = await $fetch("/api/user", {
      method: "get",
      headers: {
        "X-Forwarded-For": clientIp,
      },
    });
    if (clientData.ip === "Undefined" || clientData.count >= 5) {
      return { code: 400, detail: "You have exceeded your daily user limit" };
    }

    if (formData.get("upload") === null) {
      return;
    }
    const file = formData.get("upload") as File;
    const fileName = `${clientData.ip}/${file.name}`;
    const fileType = file.name.split(".").pop();
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileUploadResponse = await uploadFile({
      fileName,
      fileBuffer,
    });
    if (!fileUploadResponse) {
      throw createError({
        statusCode: 500,
        message: "Error Occured While Uploading File",
      });
    }
    console.log("Uploaded file");
    
    const signedUrl = await getSignedUrl(fileName);
    console.log("Got signed url");
    
    let shortUrlId = generateShortUrlId();
    while (!(await checkKeyAvailability("urls", shortUrlId))) {
      shortUrlId = generateShortUrlId();
    }
    console.log("Got short url id");
    
    await setEntity("urls", shortUrlId, {
      fileUrl: signedUrl,
      fileName: fileName,
      fileType: fileType,
      timeStamp: findNextNoon(),
    });
    console.log("Set url entity");
    clientData.fileFlows.push(shortUrlId);
    await setEntity("user", clientIp, {
      count: clientData.count + 1,
      fileFlows: clientData.fileFlows,
      timeStamp: findNextNoon(),
    });
    console.log("Set user entity");
    return {
      code: 200,
      detail: `${currentHost}/api/upload/${shortUrlId}`,
    };
  } catch (err) {
    console.log(err);
    
    return { code: 400, detail: "Error Occured Try Again After Sometime" };
  }
});
