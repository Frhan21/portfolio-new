'use client';

import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';

interface CircleConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  blur: string;
  speed: [number, number];
}

function ParallaxCircle({ config }: { config: CircleConfig }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const y = useTransform(scrollYProgress, [0, 1], config.speed);

  return (
    <motion.div
      ref={containerRef}
      style={{
        y,
        top: config.top,
        bottom: config.bottom,
        left: config.left,
        right: config.right,
      }}
      className={`absolute ${config.size} bg-orange-500/30 dark:bg-orange-500/15 rounded-full ${config.blur}`}
    />
  );
}

const circles: CircleConfig[] = [
  {
    top: '2%',
    left: '10%',
    size: 'w-[300px] h-[300px] md:w-[500px] md:h-[500px]',
    blur: 'blur-[100px] md:blur-[150px]',
    speed: [0, 60],
  },
  {
    top: '15%',
    right: '5%',
    size: 'w-[400px] h-[400px] md:w-[600px] md:h-[600px]',
    blur: 'blur-[120px] md:blur-[150px]',
    speed: [0, -80],
  },
  {
    top: '35%',
    left: '15%',
    size: 'w-[350px] h-[350px] md:w-[500px] md:h-[500px]',
    blur: 'blur-[100px] md:blur-[150px]',
    speed: [0, 50],
  },
  {
    top: '55%',
    right: '10%',
    size: 'w-[450px] h-[450px] md:w-[600px] md:h-[600px]',
    blur: 'blur-[120px] md:blur-[150px]',
    speed: [0, -70],
  },
  {
    top: '75%',
    left: '5%',
    size: 'w-[500px] h-[500px] md:w-[700px] md:h-[700px]',
    blur: 'blur-[120px] md:blur-[180px]',
    speed: [0, 90],
  },
  {
    bottom: '5%',
    right: '15%',
    size: 'w-[400px] h-[400px] md:w-[500px] md:h-[500px]',
    blur: 'blur-[100px] md:blur-[150px]',
    speed: [0, -60],
  },
];

export function ParallaxBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
      {circles.map((circle, i) => (
        <ParallaxCircle key={i} config={circle} />
      ))}
    </div>
  );
}
