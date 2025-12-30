import React, { useEffect, useRef } from 'react';
import './Lightning.css';

interface LightningBolt {
  x: number;
  y: number;
  segments: { x: number; y: number }[];
  life: number;
  maxLife: number;
}

const Lightning: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth / 2; // mitad de resolución
canvas.height = window.innerHeight / 2;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`

    const bolts: LightningBolt[] = [];

    const createBolt = () => {
      const startX = Math.random() * canvas.width;
      const startY = 0;
      const segments = [{ x: startX, y: startY }];
      const endY = canvas.height;

      for (let y = startY; y < endY; y += 10) {
        const x = segments[segments.length - 1].x + (Math.random() - 0.5) * 20;
        segments.push({ x, y });
      }

      bolts.push({
        x: startX,
        y: startY,
        segments,
        life: 0,
        maxLife: 30,
      });
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Math.random() < 0.02) {
        createBolt();
      }

      bolts.forEach((bolt, index) => {
        bolt.life++;
        if (bolt.life > bolt.maxLife) {
          bolts.splice(index, 1);
          return;
        }

        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - bolt.life / bolt.maxLife})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bolt.segments[0].x, bolt.segments[0].y);

        for (let i = 1; i < bolt.segments.length; i++) {
          ctx.lineTo(bolt.segments[i].x, bolt.segments[i].y);
        }

        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="lightning-canvas" />;
};

export default Lightning;
