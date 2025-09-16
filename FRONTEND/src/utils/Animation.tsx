// src/components/Home/Animation.tsx
import React from "react";
import { motion } from "framer-motion";

interface AnimationProps {
  children: React.ReactNode;
  initialX?: number;
  initialY?: number;
  initialScale?: number;
  transitionDuration?: number;
  delay?: number;
}

const Animation: React.FC<AnimationProps> = ({
  children,
  initialX = 0,
  initialY = 50,
  initialScale = 0.8,
  transitionDuration = 0.8,
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, x: initialX, y: initialY, scale: initialScale }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    exit={{ opacity: 0, x: initialX, y: initialY, scale: initialScale }}
    transition={{ duration: transitionDuration, delay }}
  >
    {children}
  </motion.div>
);

export default Animation;
