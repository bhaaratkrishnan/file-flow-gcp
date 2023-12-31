import { urlsSchemaFs } from "~/server/utils/types";

export default defineEventHandler(async (event) => {
  const imageId = getRouterParam(event, "id");
  const fileType = getQuery(event).type;
  if (imageId === undefined) {
    throw createError({
      statusCode: 400,
      message: "Bad Request",
    });
  }
  const imageData: urlsSchemaFs = await getEntity("urls", imageId);

  if (imageData === undefined) {
    throw createError({
      statusCode: 404,
      message: "Not Found",
    });
  }
  if (fileType !== undefined) {
    return {
      type: imageData.fileType,
      contents: "",
    };
  }
  const imageContents = await downloadFileIntoMemory(imageData.fileName);
  const imageB64 = Buffer.from(imageContents).toString("base64");
  return {
    contents: imageB64,
    type: imageData.fileType,
  };
});
