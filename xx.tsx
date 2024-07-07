import { useEffect, useState } from 'react';
import DevAlert from "@/components/app/DevAlert";
import LocationCon from "@/components/app/Wiki/LocationCon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { WikiFetchData } from "@/lib/utils";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
require("dotenv").config();

export default async function WikiID({ params }: { params: { id: string } }) {
  const { id } = params;
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

  const system = `You are an assistant specifically for world history. You are a helpful assistant that specializes in summarizing and extracting relevant information from text about historic events. Be unbiased about the information ,You will STRICTLY respond with the requested information in JSON format with the following topics:

historic_event_name: The name of the historic event.
quick_summary: A quick summary of the historic event.
countries: A list of max 5 countries involved in the historic event.
year: The year of when the historic event took place and ended, Example: 1945-1949.
significant_figures: A list of max 5 most significant figures (people, leaders, etc.) involved in the historic event, in order of importance, with a brief explanation of their role, include each figure's name, role in the event, their, birth and death year, and country of origin.
major_events: A list of max 3 major events or key moments that occurred during the historic event.
causes: A brief explanation of the causes or reasons that led to the historic event.
consequences: A brief explanation of the consequences or impacts of the historic event.
full_explanation: Give a full explanation of the historic event in detail as referenced from the context, try not to change the information from the context.

If the requested information is not found in the provided context, you will respond with 'Not found' for the respective topic. Ensure that your response is a valid JSON object.`;

  // Initialize Gemini
  const key = process.env.GEMINI;
  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: safetySettings,
    systemInstruction: system,
  });

  // Generate summary or relevant information
  let textResponse = "";
  if (contextFile) {
    const prompt = contextFile;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    textResponse = await response.text();
  }

  // Remove triple backticks from the response
  console.log("textResponse:", textResponse);
  textResponse = textResponse.replace(/```json|```/g, "");
  console.log("FORMATTED textResponse:", textResponse);

  // Parse the JSON response
  let jsonData;
  try {
    jsonData = JSON.parse(textResponse);
  } catch (error) {
    console.error("Error parsing JSON response:", error);
  }
  console.log(jsonData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Ensure page data is loaded with {pageText && ()} */}
      {pageText && <DevAlert>Page Data Loaded</DevAlert>}
      {pageText && jsonData ? (
        <div className="flex-col flex gap-4">
          <div className="wiki-container">
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold font-rounded flex justify-between items-center">
                {jsonData.historic_event_name}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AiOutlineInfoCircle
                        className="fill-border antialiased"
                        size={24}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="z-40 relative">
                      <TooltipArrow className="fill-popover rounded-b-sm tooltip z-50 relative scale-110" />
                      <p>
                        This information is courtesy of{" "}
                        <Link
                          className="text-[hsl(var(--theme))]"
                          href=''
                        >
                          Wikipedia®
                        </Link>
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h1>

              <div className="flex flex-col gap-2">
                <div className="topics-container topic-summaries">
                  <p>{jsonData.countries.join(", ")}</p>
                  <p>{jsonData.year}</p>
                </div>
                <div className="topics-container topic-figures">
                  {jsonData.significant_figures.map((figure: any, index: number) => (
                    <div key={index}>
                      <p>Name: {figure.name}</p>
                      <p>Role: {figure.role}</p>
                      <p>Birth Year: {figure.birth_year}</p>
                      <p>Death Year: {figure.death_year}</p>
                      <p>Country of Origin: {figure.country_of_origin}</p>
                    </div>
                  ))}
                </div>
                <div className="topics-container topic-locations">
                  {jsonData.major_events.map((event: any, index: number) => (
                    <p key={index}>{event}</p>
                  ))}
                </div>
              </div>

              <div className="details-container">
                <p className="details-title">Causes</p>
                <div>
                  <p>{jsonData.causes}</p>
                </div>
                <p className="details-title">Consequences</p>
                <div>
                  <p>{jsonData.consequences}</p>
                </div>
                <p className="details-title">Full Explanation</p>
                <div>
                  <p>{jsonData.full_explanation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Error fetching page data</p>
      )}
    </main>
  );
}