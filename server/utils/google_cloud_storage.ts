import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucket = storage.bucket(useRuntimeConfig().storageBucketName);

export async function downloadFileIntoMemory(
  fileName: string,
): Promise<Buffer> {
  const file = bucket.file(fileName);
  const contents = await file.download();
  return contents[0];
}

export async function uploadFile({
  fileName,
  fileBuffer,
}: {
  fileName: string;
  fileBuffer: Buffer;
}): Promise<boolean> {
  try {
    const file = bucket.file(fileName);
    await file.save(fileBuffer);
    return true;
  } catch (err) {
    return false;
  }
}

export async function getSignedUrl(fileName: string): Promise<string> {
  const file = bucket.file(fileName);
  const [url] = await file.getSignedUrl({
    expires: Date.now() + 60 * 60 * 1000,
    action: "read",
    version: "v4",
  });
  return url;
}
