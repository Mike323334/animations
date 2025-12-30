import React, { useEffect, useRef } from 'react';
import './Fireworks.css';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  exploded: boolean;
  particles: Particle[];
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const rockets: Rocket[] = [];

    const createRocket = () => {
      const colors = ['#ff0040', '#00ff80', '#0080ff', '#ffff00', '#ff8000'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      rockets.push({
        x: Math.random() * canvas.width,
        y: canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 5 + 10),
        color,
        exploded: false,
        particles: [],
      });
    };

    const explodeRocket = (rocket: Rocket) => {
      rocket.exploded = true;
      for (let i = 0; i < 50; i++) {
        const angle = (Math.PI * 2 * i) / 50;
        const speed = Math.random() * 5 + 2;
        rocket.particles.push({
          x: rocket.x,
          y: rocket.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: rocket.color,
          life: 0,
          maxLife: Math.random() * 60 + 60,
        });
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update rockets
      rockets.forEach((rocket, index) => {
        if (!rocket.exploded) {
          rocket.x += rocket.vx;
          rocket.y += rocket.vy;
          rocket.vy += 0.1; // gravity

          // Draw rocket
          ctx.fillStyle = rocket.color;
          ctx.beginPath();
          ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
          ctx.fill();

          // Check if rocket should explode
          if (rocket.vy >= 0) {
            explodeRocket(rocket);
          }
        } else {
          // Update particles
          rocket.particles.forEach((particle, pIndex) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.05; // gravity
            particle.life++;

            // Draw particle
            const alpha = 1 - particle.life / particle.maxLife;
            ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba');
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
            ctx.fill();

            // Remove dead particles
            if (particle.life >= particle.maxLife) {
              rocket.particles.splice(pIndex, 1);
            }
          });

          // Remove rocket if no particles left
          if (rocket.particles.length === 0) {
            rockets.splice(index, 1);
          }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const interval = setInterval(createRocket, 1000);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
};

export default Fireworks;
