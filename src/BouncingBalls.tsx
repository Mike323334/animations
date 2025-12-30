import React, { useEffect, useRef } from 'react';
import './BouncingBalls.css';

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  radius: number;
}

const BouncingBalls: React.FC = () => {
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

    const balls: Ball[] = [];
    for (let i = 0; i < 10; i++) {
      balls.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 10,
        vy: (Math.random() - 0.5) * 10,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        radius: Math.random() * 20 + 10,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      balls.forEach(ball => {
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.vy += 0.5; // gravity

        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.vx *= -0.8; // bounce with damping
          ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.vy *= -0.8;
          ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
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

  return <canvas ref={canvasRef} className="bouncing-balls-canvas" />;
};

export default BouncingBalls;
