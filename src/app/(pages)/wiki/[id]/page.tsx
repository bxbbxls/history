"use client";
import { useEffect, useState } from "react";
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
import dataExample from "@/lib/ai/data_example.json"; // Import the example data
import { AnimatePresence, motion } from "framer-motion";
import Topic, {
  TopicContent,
  TopicImage,
  TopicSub,
} from "@/components/app/Wiki/Topic";
import TopicTitle from "@/components/app/Wiki/TopicTitle";

export default function WikiID({ params }: { params: { id: string } }) {
  const { id } = params;
  const [jsonData, setJsonData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Simulate fetching data from the API
    const fetchData = async () => {
      // Directly use the imported JSON data
      setJsonData(dataExample);
    };

    fetchData();
  }, [id]);

  if (!jsonData) {
    return <p>Loading...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DevAlert>Page Data Loaded</DevAlert>
      <div className="flex-col flex gap-4">
        <div className="wiki-container">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-rounded flex justify-between items-center gap-2">
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
                        href="wikipedia.org"
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
                {jsonData.countries.map((country: string, index: number) => (
                  <p className="topics-container-item" key={index}>
                    {country}
                  </p>
                ))}
                <p className="topics-container-item">{jsonData.year}</p>
              </div>
              <p className="details-title !pb-0 mb-[-5px]">
                Significant Figures
              </p>
              <div className="topics-container topic-figures">
                {jsonData.significant_figures.map(
                  (figure: any, index: number) => (
                    <Topic key={index}>
                      <TopicTitle
                        title={figure.name}
                        className="z-30"
                        src="/assets/abraham.jpg"
                      />
                      <TopicContent>
                        <TopicImage
                          title="Abraham Lincoln"
                          src="/assets/abraham.jpg"
                        />
                        <TopicSub title="Role">
                          <p>{figure.role}</p>
                        </TopicSub>
                        <TopicSub title="Born">
                          <p>
                            {figure.birth_year}, {figure.country}
                          </p>
                        </TopicSub>
                        <TopicSub title="Died">
                          <p>{figure.death_year}</p>
                        </TopicSub>
                      </TopicContent>
                    </Topic>
                    // <motion.div layout key={index} className="relative">
                    //   <ImageIcon className="z-30" src="/assets/abraham.jpg">
                    //     <motion.p
                    //       onHoverStart={() => setHoveredIndex(index)}
                    //       onHoverEnd={() => setHoveredIndex(null)}
                    //       className="text-sm"
                    //     >
                    //       {figure.name}
                    //     </motion.p>
                    //   </ImageIcon>
                    //   <AnimatePresence>
                    //     {hoveredIndex === index && (
                    //       <motion.div
                    //         id="info-contain"
                    //         initial={{ opacity: 0, scale: 0.5, x: -50, y: -35 }}
                    //         animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    //         exit={{ opacity: 0, scale: 0.5, x: -50, y: -35 }}
                    //         className="z-20 pt-[10px] px-[10px] pb-[5px] mt-9 w-max max-w-80 overflow-auto max-h-40 absolute top-0 left-0 bg-muted text-foreground/80 border rounded-2xl shadow-lg"
                    //       >
                    //         <p className="details-title !pb-0 mb-[-5px]">
                    //           Role
                    //         </p>
                    //         <p>{figure.role}</p>
                    //         <p className="details-title !pb-0 mb-[-5px]">
                    //           Born
                    //         </p>
                    //         <p>
                    //           {figure.birth_year}, {figure.country}
                    //         </p>
                    //         <p className="details-title !pb-0 mb-[-5px]">
                    //           Died
                    //         </p>
                    //         <p>{figure.death_year}</p>
                    //       </motion.div>
                    //     )}
                    //   </AnimatePresence>
                    // </motion.div>
                  )
                )}
              </div>
              <p className="details-title !pb-0 mb-[-5px]">Major Events</p>
              <motion.div layout className="topics-container topic-locations">
                {jsonData.major_events.map((event: any, index: number) => (
                  <p className="topics-container-item" key={index}>
                    {event}
                  </p>
                ))}
              </motion.div>
            </div>

            <motion.div layout className="details-container">
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
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
