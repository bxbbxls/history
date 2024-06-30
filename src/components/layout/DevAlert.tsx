"use client";
import { motion } from "framer-motion";
export default function DevAlert({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
        translateY: 50,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        translateY: 0,
        filter: "blur(0px)",
      }}
      transition={{ duration: 0.35 }}
      className="fixed bottom-5"
    >
      <p className="bg-full drop-shadow-sm px-3 py-1 border rounded-full select-none text-sm">
        {children}
      </p>
    </motion.div>
  );
}
