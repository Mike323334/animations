import React, { useEffect, useRef } from 'react';
import './WaveAnimation.css';

const WaveAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `hsl(${(i * 60) % 360}, 70%, 50%)`;
        ctx.lineWidth = 3;
        ctx.moveTo(0, canvas.height / 2);

        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + Math.sin((x * 0.01) + time + i) * 50 * (i + 1) * 0.5;
          ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      time += 0.05;
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

  return <canvas ref={canvasRef} className="wave-canvas" />;
};

export default WaveAnimation;
