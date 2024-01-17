import { urlsSchemaFs } from "~/server/utils/types";
export default defineEventHandler(async (event) => {
  const imageId = getQuery(event).id;
  if (imageId === undefined) {
    throw createError({
      statusCode: 400,
      message: "Bad Request",
    });
  }
  const imageData: urlsSchemaFs = await getEntity("urls", imageId as string);

  if (imageData === undefined) {
    throw createError({
      statusCode: 404,
      message: "Not Found",
    });
  }
  const fileContents = await downloadFileIntoMemory(imageData.fileName);
  const fileB64 = Buffer.from(fileContents).toString("base64");
  const txtBytes = Buffer.from(fileB64, "base64");
  const response = txtBytes.toString("utf8");
  return response as string;
});
