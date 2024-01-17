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

  const imageContents = await downloadFileIntoMemory(imageData.fileName);
  const imageB64 = Buffer.from(imageContents).toString("base64");
  return {
    contents: imageB64,
    type: imageData.fileType,
  };
});
