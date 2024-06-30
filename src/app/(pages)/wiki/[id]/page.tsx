import DevAlert from "@/components/layout/DevAlert";
import { WikiFetchData } from "@/lib/utils";

export default async function WikiID({ params }: { params: { id: string } }) {
  const { id } = params;
  const pageText = await WikiFetchData(id);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* Ensure page data is loaded with {pageText && ()} */}
      {pageText && <DevAlert>Page Data Loaded</DevAlert>}
      {pageText ? (
        <div
          dangerouslySetInnerHTML={{
            __html: pageText,
          }}
        ></div>
      ) : (
        <p>Error fetching page data</p>
      )}
    </main>
  );
}
