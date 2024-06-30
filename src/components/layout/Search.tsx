"use client";
import { WikiSearch } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Search() {
  const [wiki, setWikiData] = useState<any>(null);
  const [query, setQuery] = useState("");
  const action = "query";
  const lang = "en";
  useEffect(() => {
    const getWikiData = async () => {
      if (query) {
        const data = await WikiSearch(query, action, lang);
        setWikiData(data);
      }
    };
    getWikiData();
  }, [query]);
  const handleSearch = () => {
    const getWikiData = async () => {
      if (query) {
        const data = await WikiSearch(query, action, lang);
        setWikiData(data);
      }
    };
    getWikiData();
  };

  return (
    <div className="relative">
      <div className="flex flex-col justify-center w-[25rem] max-w-[25rem]">
        <div className="search-container">
          <button
            className="bg-full drop-shadow-sm px-3 py-1 border rounded-full select-none text-muted-foreground"
            onClick={handleSearch}
          >
            Search
          </button>
          <input
            className="bg-full drop-shadow-sm py-1 pl-4 w-full rounded-full border placeholder:text-muted-foreground"
            placeholder="Search Historia..."
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {wiki?.query?.search && (
          <>
            {query.length > 1 && (
              <div className="dropdown-container absolute top-full left-0 z-10 bg-full shadow-lg rounded-md">
                <ul>
                  {wiki.query.search.map((result: any, index: any) => (
                    <li key={index}>
                      <Link
                        className="link"
                        target="_blank"
                        href={/wiki/ + result.pageid}
                      >
                        {result.title
                          .split("(")
                          .map((part: any, index: any) => {
                            if (index === 0) {
                              return part;
                            } else {
                              const [text, type] = part.split(")");
                              return (
                                <>
                                  {" "}
                                  <span className="text-center truncate bg-foreground/10 pb-[0.5px] px-2 py-0 text-muted-foreground rounded-full text-xs">
                                    {text}
                                  </span>
                                  {type}
                                </>
                              );
                            }
                          })}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
