"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const img = "/assets/IMG_1585.jpg";

export default function TopicTitle({
  hover = false,
  title,
  children,
  src,
  className,
  href,
}: {
  hover?: boolean;
  title: string;
  children?: React.ReactNode;
  src?: string;
  className?: string;
  href?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      setIsHovering(false);
    }, 250);
  };

  const whileHoverStyles = hover
  ? { translateY: 20, scale: 10 }  // if hover is true
  : { translateY: 0, scale: 1 };   // if hover is false

  return (
    <a
      href={href}
      className="bg-muted/70 text-muted-foreground rounded-full border p-0.5 w-fit flex items-center gap-1.5 pr-3.5"
    >
      <motion.div
        whileHover={whileHoverStyles}
        style={{
          zIndex: 21,
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Image
          className={`rounded-full aspect-square object-cover bg-border grid justify-center items-center border border-transparent ${
            isHovering ? "border shadow-lg" : ""
          }`}
          width={25}
          height={25}
          src={src}
          quality={100}
          alt={`Image of ${title}`}
          unoptimized={isHovering}
        />
      </motion.div>
      {title}
    </a>
  );
}
