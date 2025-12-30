import React, { useEffect, useRef } from 'react';
import './Galaxy.css';

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
}

interface Planet {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;
  speed: number;
  orbitRadius: number;
}

const Galaxy: React.FC = () => {
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

    const stars: Star[] = [];
    const planets: Planet[] = [];

    // Create stars
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        brightness: Math.random(),
      });
    }

    // Create planets
    const planetColors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
    for (let i = 0; i < 5; i++) {
      planets.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: Math.random() * 20 + 10,
        color: planetColors[i],
        angle: (Math.PI * 2 * i) / 5,
        speed: 0.005 + Math.random() * 0.01,
        orbitRadius: 100 + i * 50,
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw planets
      planets.forEach(planet => {
        planet.angle += planet.speed;
        planet.x = canvas.width / 2 + Math.cos(planet.angle) * planet.orbitRadius;
        planet.y = canvas.height / 2 + Math.sin(planet.angle) * planet.orbitRadius;

        ctx.fillStyle = planet.color;
        ctx.beginPath();
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw orbit path
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, planet.orbitRadius, 0, Math.PI * 2);
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

  return <canvas ref={canvasRef} className="galaxy-canvas" />;
};

export default Galaxy;
