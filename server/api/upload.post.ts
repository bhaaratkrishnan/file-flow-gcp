import { Storage } from "@google-cloud/storage";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  if (formData.get("upload") === null) {
    return;
  }
  const file = formData.get("upload") as File;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const bucketName = "test-bucket-code-vipa";
  const storage = new Storage();
  const bucket = storage.bucket(bucketName);
  const fileUpload = bucket.file(file.name);
  await fileUpload.save(fileBuffer);
  const [url] = await storage.bucket(bucketName).file(file.name).getSignedUrl({
    expires:Date.now() + 15 * 60 *1000,
    action:"read",
    version:"v2"
  });
  return url;
});
