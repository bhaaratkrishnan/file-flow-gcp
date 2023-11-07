import { Storage } from "@google-cloud/storage";
import { checkKeyAvailability, setEntity } from "~/server/utils/datastore";
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
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const bucketName = "test-bucket-code-vipa";
    const storage = new Storage();
    const bucket = storage.bucket(bucketName);
    const fileUpload = bucket.file(`${file.name}`);
    await fileUpload.save(fileBuffer);
    console.log("File Uploaded");
    
    const [url] = await fileUpload.getSignedUrl({
      expires: Date.now() + 60 * 60 * 1000,
      action: "read",
      version: "v4",
    });
    console.log("URL Signed");
    
    let shortUrlId = generateShortUrlId();
    console.log(shortUrlId);
  
    while (!(await checkKeyAvailability("urls", shortUrlId))) {
      shortUrlId = generateShortUrlId();
    }
    console.log("Loop over");
    await setEntity("urls", shortUrlId, {
      fileUrl: url,
      timeStamp: new Date(Date.now() + 60 * 60 * 1000),
    });
    console.log(clientData.fileFlows);
    clientData.fileFlows.push(shortUrlId);
    await setEntity("user", clientIp, {
      count: clientData.count + 1,
      fileFlows: clientData.fileFlows,
      timeStamp: findNextNoon(),
    });
    return {
      code: 200,
      detail: `${useRuntimeConfig().baseUrl}/api/upload/${shortUrlId}`,
    };
  } catch (err) {
    return { code: 400, detail: "Error Occured Try Again After Sometime" };
  }
});
