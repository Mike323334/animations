import React, { useEffect, useState } from 'react';
import './ParticleExplosion.css';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
}

const ParticleExplosion: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = () => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        size: Math.random() * 20 + 20,
      });
    }
    setParticles(newParticles);
  };

  useEffect(() => {
    createParticles();
    const interval = setInterval(createParticles, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vy: particle.vy + 0.1, // gravity
        })).filter(particle => particle.y < window.innerHeight + 50)
      );
    };
    const animationId = requestAnimationFrame(function animateLoop() {
      animate();
      requestAnimationFrame(animateLoop);
    });
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className="particle-container">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleExplosion;
