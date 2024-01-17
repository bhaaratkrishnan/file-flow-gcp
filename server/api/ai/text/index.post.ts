export default defineEventHandler(async (event) => {
  const body = await readBody<string>(event);
  const readable = new ReadableStream({
    async start(controller) {
      const promptResponse = await geminiStreamPrompt(body);
      for await (const chunk of promptResponse) {
        if (
          chunk.candidates.length > 0 &&
          chunk.candidates[0].content.parts !== undefined &&
          chunk.candidates[0].content.parts.length > 0
        ) {
          controller.enqueue(chunk.candidates[0].content.parts[0].text);
        }
      }
      controller.close();
    },
  });

  return sendStream(event, readable);
});
