import { aiResponseToText } from "~/server/utils/vertex_ai";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    imageType: string;
    imageData: string;
    prompt: string;
  }>(event);

  const promptResponse = await imagePrompt({
    imageType: body.imageType,
    imageData: body.imageData,
    prompt: body.prompt,
  });
  let response = aiResponseToText(promptResponse);
  return response;
});
