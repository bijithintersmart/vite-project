import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useTheme } from "../ThemeContext";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });

      const target = e.target;
      const isInteractive = target.closest("button, a");
      setIsHoveringInteractive(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const cursorColor = theme === "light" ? "#4f46e5" : "#818cf8";
  const dotColor = theme === "light" ? "#1f2937" : "#f9fafb";

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      borderColor: cursorColor,
      backgroundColor: "rgba(0,0,0,0)",
      mixBlendMode: "normal",
      scale: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.1 },
    },
    hovered: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      mixBlendMode: "difference",
      transition: { type: "tween", ease: "easeOut", duration: 0.1 },
    },
  };

  const dotVariants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      backgroundColor: dotColor,
      scale: 1,
      transition: { type: "tween", ease: "easeOut", duration: 0.15 },
    },
    hovered: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0.5,
      transition: { type: "tween", ease: "easeOut", duration: 0.15 },
    },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-50 border-2 border-solid"
        variants={cursorVariants}
        animate={isHoveringInteractive ? "hovered" : "default"}
      ></motion.div>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-50"
        variants={dotVariants}
        animate={isHoveringInteractive ? "hovered" : "default"}
      ></motion.div>
    </>
  );
};

export default CustomCursor;
