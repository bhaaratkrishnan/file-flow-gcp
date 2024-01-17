import { urlsSchemaFs } from "~/server/utils/types";

export default defineEventHandler(async (event): Promise<string> => {
  const imageId = getRouterParam(event, "id");
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
  return imageData.fileType;
});
