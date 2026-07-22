'use client';

import { ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import type { LenisRef } from 'lenis/react';

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        duration: 0.7,
        smoothWheel: true,
      }}
      autoRaf={false}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
