"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
export default function DevAlert({ children }: { children: React.ReactNode }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <AnimatePresence>
        {isVisible && (
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
            exit={{
              opacity: 0,
              scale: 0.95,
              translateY: 50,
              filter: "blur(5px)",
            }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-5 z-20"
          >
            <p className="w-[max-content] bg-full drop-shadow-sm px-3 py-1 border rounded-full select-none text-sm">
              {children}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(5px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              filter: "blur(5px)",
            }}
            transition={{ duration: 0.35 }}
            className="blur-bg fixed bottom-5 flex flex-col items-center justify-center z-10"
          />
        )}
      </AnimatePresence>
    </>
  );
}
