import { VertexAI, GenerateContentResult } from "@google-cloud/vertexai";

const projectId = useRuntimeConfig().public.projectId;
const projectLocation = useRuntimeConfig().public.projectLocation;

const vertex_ai = new VertexAI({
  project: projectId,
  location: projectLocation,
});

export async function geminiPrompt(prompt: string) {
  const model = "gemini-pro";
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generation_config: { max_output_tokens: 2048, temperature: 0.9, top_p: 1 },
  });
  const response = await generativeModel.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  return response;
}

async function geminiVisionPrompt(
  prompt: string,
  imageType: string,
  imageData: string,
) {
  const model = "gemini-pro-vision";
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generation_config: { max_output_tokens: 2048, temperature: 0.9, top_p: 1 },
  });
  const response = await generativeModel.generateContent({
    contents: [
      {
        role: "user",
        parts: [
          { text: prompt },
          {
            inline_data: {
              mime_type: imageType,
              data: imageData,
            },
          },
        ],
      },
    ],
  });
  return response;
}

export async function summarizeText(text: String) {
  return await geminiPrompt(`Summarize this text : ${text}`);
}

export async function makeThisBetter(text: String) {
  return await geminiPrompt(`Make this better : ${text}`);
}

export async function extractTextFromImage(
  imageType: string,
  imageData: string,
) {
  return await geminiVisionPrompt(
    "Extract text from this image",
    imageType,
    imageData,
  );
}

export async function imagePrompt({
  prompt,
  imageType,
  imageData,
}: {
  prompt: string;
  imageType: string;
  imageData: string;
}) {
  return await geminiVisionPrompt(prompt, imageType, imageData);
}

export function aiResponseToText(response: GenerateContentResult): string {
  let textResponse = "";
  response.response.candidates.forEach((candidate) => {
    textResponse += candidate.content.parts
      .map((part) => {
        return part.text;
      })
      .join(" ");
  });
  return textResponse;
}
