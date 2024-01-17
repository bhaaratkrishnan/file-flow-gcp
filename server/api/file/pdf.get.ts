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
  const response = await $fetch(
    useRuntimeConfig().googleFunctionPdfUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: fileB64,
      }),
    },
  );
  return response as string;
});
