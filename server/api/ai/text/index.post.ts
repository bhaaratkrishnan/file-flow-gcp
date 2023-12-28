import { aiResponseToText, geminiPrompt } from "~/server/utils/vertex_ai";

export default defineEventHandler(async (event) => {
  const body = await readBody<string>(event);
  const promptResponse = await geminiPrompt(body);
  let response = aiResponseToText(promptResponse);
  return response;
});
