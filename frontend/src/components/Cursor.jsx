import React, { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    document.body.classList.add("cursor-none");
    let rx = 0, ry = 0, dx = 0, dy = 0;
    let raf;
    const move = (e) => {
      dx = e.clientX; dy = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx - 3}px, ${dy - 3}px, 0)`;
    };
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx - 18}px, ${ry - 18}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    const overInteractive = (e) => {
      const t = e.target.closest("a, button, [data-cursor='hover'], input, textarea, select");
      setHovering(!!t);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", overInteractive);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", overInteractive);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none w-1.5 h-1.5 bg-nerv-orange shadow-[0_0_10px_#FF6B00]"
      />
      <div
        ref={ringRef}
        className={`hidden md:block fixed top-0 left-0 z-[9999] pointer-events-none border-2 transition-[width,height,border-color] duration-200 ${
          hovering ? "w-12 h-12 border-nerv-red" : "w-9 h-9 border-nerv-orange/70"
        } clip-hex`}
      />
    </>
  );
}
