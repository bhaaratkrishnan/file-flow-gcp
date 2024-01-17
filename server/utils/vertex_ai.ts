import { VertexAI, GenerateContentResult } from "@google-cloud/vertexai";

const projectId = useRuntimeConfig().projectId;
const projectLocation = useRuntimeConfig().projectLocation;

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

export async function geminiStreamPrompt(prompt: string) {
  const model = "gemini-pro";
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generation_config: { max_output_tokens: 2048, temperature: 0.9, top_p: 1 },
  });
  const response = await generativeModel.generateContentStream({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });
  return response.stream;
}

export async function geminiVisionPrompt({
  prompt,
  imageType,
  imageData,
}: {
  prompt: string;
  imageType: string;
  imageData: string;
}) {
  const model = "gemini-pro-vision";
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model,
    generation_config: { max_output_tokens: 2048, temperature: 0.9, top_p: 1 },
  });
  imageType = "image/" + imageType;

  const response = await generativeModel.generateContentStream({
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
  return response.stream;
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
