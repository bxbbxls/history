import { WikiFetchData } from "@/lib/utils";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import { systemImport } from "@/lib/ai/prompt";

export async function processData(id: string) {
  const pageText = await WikiFetchData(id);
  const contextFile = pageText ? pageText.toString() : "";
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const system = systemImport;
  console.log("system:", system);

  const key2 = 'AIzaSyDLdoXhvWx6z7jAjkb4BBtcRK90yq--Cs8';
  const genAI = new GoogleGenerativeAI(key2);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: safetySettings,
    systemInstruction: system,
  });

  console.log("GPT Loaded:", model);

  let jsonData = null;
  console.log("jsonData set null:", jsonData);

  try {
    console.log("contextFile:", contextFile);
    if (contextFile) {
      const prompt = contextFile;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let textResponse = await response.text();

      console.log("textResponse:", textResponse);

      // Remove triple backticks from the response
      textResponse = textResponse.replace(/```json|```/g, "");
      console.log("FORMATTED textResponse:", textResponse);

      jsonData = JSON.parse(textResponse);
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }

  return jsonData;
}
