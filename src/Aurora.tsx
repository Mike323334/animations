import React, { useEffect, useRef } from 'react';
import './Aurora.css';

const Aurora: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
     canvas.width = window.innerWidth / 2; // mitad de resolución
canvas.height = window.innerHeight / 2;
canvas.style.width = `${window.innerWidth}px`;
canvas.style.height = `${window.innerHeight}px`
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw aurora waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${(i * 60 + time * 0.5) % 360}, 70%, 50%)`;
        ctx.lineWidth = 3;
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x += 5) {
          const y =
            canvas.height / 2 +
            Math.sin(x * 0.005 + time + i * 0.5) *
              100 *
              Math.sin(time * 0.01 + i) *
              0.5;

          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      time += 0.05;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="aurora-canvas" />;
};

export default React.memo(Aurora);
