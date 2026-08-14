"use client";

import { motion } from "framer-motion";
import { headingFade, viewportOnce } from "@/lib/motion";
import { H2 } from "@/lib/styles";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = "" }: Props) {
  return (
    <motion.h2
      variants={headingFade}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`${H2} ${className}`}
    >
      {children}
    </motion.h2>
  );
}
