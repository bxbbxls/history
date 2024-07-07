"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  useState,
  FC,
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { AiOutlineSearch } from "react-icons/ai";

const Topic: FC<{ children: ReactNode; href: string }> = ({
  children,
  href,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  let defaultContent: ReactNode[] = [];
  let hoverContent: ReactNode | null = null;

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === TopicContent) {
      hoverContent = child; // Include only TopicContent in the hover content
    } else {
      defaultContent.push(child); // Include everything else in the default content
    }
  });

  return (
    <motion.div
      layout
      className="relative"
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
    >
      {defaultContent}
      <AnimatePresence>
        {isHovering && hoverContent && (
          <motion.div
            id="info-contain"
            initial={{ opacity: 0, scale: 0, x: "-45%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0, x: "-45%", y: "-45%" }}
            whileTap={{
              scale: 0.99,
              transition: {
                type: "spring",
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
              },
              rotate: [0, 2, -2, 2, -2, 0], // Rotate keyframes
              x: [0, -5, 5, -5, 5, 0], // Shake keyframes
            }}
            drag
            dragConstraints={{
              top: -2.5,
              left: -2.5,
              right: 2.5,
              bottom: 2.5,
            }}
            className="z-20 p-[10px] pb-[5px] mt-9 w-max max-w-80 overflow-auto absolute top-0 left-0 dark:bg-[#191919] bg-[#f9f9f9] text-foreground/80 border rounded-2xl shadow-lg"
          >
            {hoverContent}
            <div className="absolute bottom-3 left-[42%] right-[100%] h-[.25rem] w-[15%] rounded-full bg-foreground/25" />
            <Link
              target="_blank"
              href={`https://en.wikipedia.org/w/index.php?search=${href}`}
            >
              <AiOutlineSearch className="absolute bottom-3 right-3 size-[1.75rem] p-1 rounded-full fill-muted-foreground hover:bg-foreground/25 cursor-pointer transition-colors duration-200 ease-in-out" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
export default Topic;

export const TopicContent: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const TopicSub: FC<{ title: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <p className="details-title !pb-0 mb-[-2.5px]">{title}</p>
      <div>{children}</div>
    </>
  );
};

export const TopicImage: FC<{ title: string; src: string }> = ({
  title,
  src,
}) => {
  return (
    <>
      <Image
        className="select-none rounded-[6px] object-cover bg-border grid justify-center items-center border border-transparent w-full mb-1"
        width={300}
        height={100}
        src={src}
        quality={100}
        draggable={false}
        alt={`Image of ${title}`}
      />
    </>
  );
};
