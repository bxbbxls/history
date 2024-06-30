import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function WikiSearch(
  query: string,
  action: string,
  lang: "ru" | "es" | "en" = "en"
): Promise<any> {
  if (!query) return;
  try {
    const url = new URL(`https://${lang}.wikipedia.org/w/api.php`);
    const params = {
      action: action,
      srsearch: query,
      list: "search",
      format: "json",
      srlimit: 10,
      origin: "*",
      // origin: window.location.origin,
    };
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function WikiFetchData(id: string): Promise<string | null> {
  try {
    const url = new URL(`https://en.wikipedia.org/w/api.php`);
    const params = {
      action: "query",
      pageids: id,
      format: "json",
      origin: "*",
    };
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value.toString())
    );
    const response = await fetch(url);
    const data = await response.json();

    const pageId = Object.keys(data.query.pages)[0];
    const pageTitle = data.query.pages[pageId].title;

    const parseUrl = new URL(`https://en.wikipedia.org/w/api.php`);
    const parseParams = {
      action: "parse",
      prop: "text",
      page: pageTitle,
      format: "json",
      origin: "*",
    };
    Object.entries(parseParams).forEach(([key, value]) =>
      parseUrl.searchParams.append(key, value.toString())
    );
    const parseResponse = await fetch(parseUrl);
    const parseData = await parseResponse.json();

    return parseData.parse.text["*"];
  } catch (error) {
    console.error(error);
    return null;
  }
}
