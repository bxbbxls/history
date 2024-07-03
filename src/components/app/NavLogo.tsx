"use client";
import Link from "next/link";
import { useState } from "react";
import Confetti from "react-dom-confetti";

const confettiConfig = {
  angle: 336,
  spread: 129,
  startVelocity: 53,
  elementCount: 70,
  dragFriction: 0.13,
  duration: 3000,
  stagger: 2,
  width: "10px",
  height: "10px",
  perspective: "1000px",
  colors: ["#f8ec8b", "#aaf2f9", "#d1abf7", "#63d860", "#fa8f8f"],
};

export default function NavLogo() {
  const [isExploding, setIsExploding] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);

  const handleHover = () => {
    setHoverCount((prevCount) => prevCount + 1);
    if (hoverCount % 10 === 9) {
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
      }, 3000);
    }
  };

  return (
    <>
      <button
        onMouseEnter={handleHover}
        className="hover:scale-[1.05] transition-all z-30 cursor-pointer text-foreground px-3 py-1 bg-full border rounded-full select-none hover:bg-muted-foreground/10 active:scale-95 duration-300 hover:drop-shadow-sm"
      >
        <Link className="select-none" href="/">
          Historia
        </Link>
      </button>
      <div className="absolute left-0 top-0 z-20">
        <Confetti active={isExploding} config={confettiConfig} />
      </div>
    </>
  );
}
