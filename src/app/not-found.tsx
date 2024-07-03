import Button from "@/components/app/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center min-h-[90vh] w-full">
      <div className="pb-80 flex flex-col gap-3 items-center justify-center text-center h-56">
        <div>
          <p className="leading-[20px]">
            <br /> &nbsp;&#x2571;|&#x3001;
            <br /> (˚ˎ 。7
            <br /> &nbsp;|&#x3001;˜〵
            <br />
            &nbsp; &nbsp;&nbsp;じしˍ,)&#x30CE;
          </p>
        </div>
        <div className="font-rounded flex flex-col gap-2 items-center justify-center text-center">
          <p>this page doesn&apos;t exist</p>
          <Button className="text-sm w-fit">
            <Link href="/">Return</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-1 sm:grid-cols-2 lg:grid-cols-4"></div>
    </main>
  );
}
