'use client';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode } from 'react';

export default function AntigravityCard({ children }: { children: ReactNode }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement with spring physics
  const springConfig = { damping: 20, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-3, 3]), springConfig);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      // Continuous floating oscillation
      animate={{ y: [0, -4, 0] }}
      transition={{ 
        y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        duration: 0.5 
      }}
      className="relative p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl h-full flex flex-col"
    >
      <div style={{ transform: 'translateZ(20px)' }} className="h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
