"use client";
import Button from "@/components/app/Button";
import Link from "next/link";
import { motion, stagger } from "framer-motion";
import { transcode } from "buffer";

const container = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { scale: 0, top: 100, filter: "blur(20px)" },
  show: { scale: 1, top: 30, filter: "blur(0px)" },
};

const spring = {
  type: "spring",
  damping: 12,
  stiffness: 100,
  transition: { duration: 0.5 },
};

export default function NotFound() {
  return (
    <main className="flex flex-col justify-center min-h-[90vh] w-full">
      <div className="flex flex-col gap-3 items-center justify-center text-center h-56">
        <motion.div
          className="text-[4rem] dark:text-foreground/90 text-foreground/70 font-rounded font-bold flex justify-center items-center"
          variants={container}
          initial="hidden"
          animate="show"
          style={{
            width: 100,
            background: "rgba(255, 255, 255, 0)",
            height: 100,
            borderRadius: 30,
            position: "relative",
          }}
        >
          <motion.h1
            className="text-404"
            style={{
              ...charStyle,
              left: -11,
            }}
            variants={item}
            transition={spring}
          >
            4
          </motion.h1>
          <motion.h1
            style={{
              ...charStyle,
              left: 30,
            }}
            variants={item}
            transition={spring}
          >
            0
          </motion.h1>
          <motion.h1
            style={{
              ...charStyle,
              left: 70,
            }}
            variants={item}
            transition={spring}
          >
            4
          </motion.h1>
        </motion.div>

        <div className="font-rounded flex flex-col gap-2 items-center justify-center text-center">
          <p>this page doesn&apos;t exist</p>
          <Button className="text-sm w-fit bg-background/15 hover:bg-background/25 backdrop-blur-[10px] text-background">
            <Link href="/1">Return</Link>
          </Button>
        </div>
      </div>
      <div className="dark:opacity-5 opacity-100 circle-404 bg-blue-500 animate-move-up !top-[65%]" />
      <div className="dark:opacity-5 opacity-100 circle-404 bg-pink-500 animate-move-right !left-[55%] !top-[35%]" />
      <div className="dark:opacity-5 opacity-100 circle-404 bg-yellow-500 animate-move-left !left-[15%]" />
    </main>
  );
}

const charStyle: React.CSSProperties = {
  position: "absolute",
};
