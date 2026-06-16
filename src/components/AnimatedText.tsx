"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({ text, className = "", delay = 0, once = true }: Props) {
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%", opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.75,
                  ease: [0.22, 1, 0.36, 1],
                  delay: delay + i * 0.055,
                },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-60px" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
