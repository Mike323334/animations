import React, { useEffect, useRef } from 'react';
import './Snowfall.css';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const snowflakes: Snowflake[] = [];

    const createSnowflake = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 4 + 1;
      const speed = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.8 + 0.2;

      snowflakes.push({ x, y, radius, speed, opacity });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((flake, index) => {
        flake.y += flake.speed;
        if (flake.y > canvas.height) {
          snowflakes.splice(index, 1);
          createSnowflake();
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
      });

      if (snowflakes.length < 100) {
        createSnowflake();
      }

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

  return <canvas ref={canvasRef} className="snowfall-canvas" />;
};

export default Snowfall;
