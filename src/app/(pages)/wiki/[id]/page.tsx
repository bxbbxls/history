"use client";
import { useEffect, useState } from "react";
import DevAlert from "@/components/app/DevAlert";
import Button from "@/components/app/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipArrow,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Grid } from "react-loader-spinner";
import Topic, {
  TopicContent,
  TopicImage,
  TopicSub,
} from "@/components/app/Wiki/Topic";
import TopicTitle from "@/components/app/Wiki/TopicTitle";
import { processData } from "@/lib/ai/processData";
import ReactMarkdown from "react-markdown";
import Head from "next/head";

export default function WikiID({ params }: { params: { id: string } }) {
  const { id } = params;
  const [jsonData, setJsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      console.log("fetchData");
      const data = await processData(id);
      console.log("data:", data);
      setJsonData(data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Grid
          visible={true}
          height="40"
          width="40"
          color="hsl(var(--muted-foreground))"
          ariaLabel="grid-loading"
          radius="12.5"
          wrapperStyle={{}}
          wrapperClass="grid-wrapper"
        />
      </div>
    );
  }

  if (!jsonData) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Error loading data</p>
        <Button>
          <Link href={`/wiki/${id}`}>Reload</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 max-sm:pt-2">
      <DevAlert>Page Data Loaded</DevAlert>
      <Head>
        <title>Hello</title>
      </Head>
      <div className="flex-col flex gap-4">
        <div className="wiki-container">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold font-rounded flex justify-between items-center gap-2">
              {jsonData?.historic_event_name}
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
                        target="_blank"
                        href="https://en.wikipedia.org/wiki/Main_Page"
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
                {jsonData?.countries.map((country: string, index: number) => (
                  <p className="topics-container-item" key={index}>
                    {country}
                  </p>
                ))}
                <p className="topics-container-item">{jsonData?.year}</p>
              </div>
              <p className="details-title !pb-0 mb-[-5px]">
                Significant Figures
              </p>
              <div className="topics-container topic-figures">
                {jsonData?.significant_figures.map(
                  (figure: any, index: number) => (
                    <Topic href={figure.name} key={index}>
                      <TopicTitle
                        title={figure.name}
                        className="z-30"
                        src={
                          figure.image
                            ? figure.image
                            : "/assets/avatar_placeholder.png"
                        }
                      />
                      <TopicContent>
                        <TopicImage
                          title="Abraham Lincoln"
                          src={
                            figure.image
                              ? figure.image
                              : "/assets/avatar_placeholder.png"
                          }
                        />
                        <TopicSub title="Role">
                          <p className="leading-[1.1] pb-1">{figure.role}</p>
                        </TopicSub>
                        <TopicSub title="Born">
                          <p className="leading-[1.1] pb-1">
                            {figure.birth_year}, {figure.country}
                          </p>
                        </TopicSub>
                        <TopicSub title="Died">
                          <p className="leading-[1.1] pb-1">
                            {figure.death_year}
                          </p>
                        </TopicSub>
                      </TopicContent>
                    </Topic>
                  )
                )}
              </div>
              <p className="details-title !pb-0 mb-[-5px]">Major Events</p>
              <div className="topics-container topic-locations">
                {jsonData?.major_events.map((event: any, index: number) => (
                  <ReactMarkdown className="topics-container-item" key={index}>
                    {event}
                  </ReactMarkdown>
                ))}
              </div>
            </div>

            <div className="details-container">
              <p className="details-title">Causes</p>
              <div>
                <ReactMarkdown>{jsonData?.causes}</ReactMarkdown>
              </div>
              <p className="details-title">Consequences</p>
              <div>
                <ReactMarkdown>{jsonData?.consequences}</ReactMarkdown>
              </div>
              <p className="details-title">Full Explanation</p>
              <div>
                <ReactMarkdown>{jsonData?.full_explanation}</ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
