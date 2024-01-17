import { geminiVisionPrompt } from "~/server/utils/vertex_ai";

export default defineEventHandler(async (event) => {
  const body = await readBody<{
    imageType: string;
    imageData: string;
    prompt: string;
  }>(event);

  const readable = new ReadableStream({
    async start(controller) {
      const promptResponse = await geminiVisionPrompt({
        imageType: body.imageType,
        imageData: body.imageData,
        prompt: body.prompt,
      });
      for await (const chunk of promptResponse) {
        controller.enqueue(chunk.candidates[0].content.parts[0].text);
      }
      controller.close();
    },
  });
  return sendStream(event, readable);
});
