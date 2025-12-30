import React from 'react';
import './OptionBar.css';

interface OptionBarProps {
  currentAnimation: 'particle' | 'wave' | 'balls' | 'fireworks' | 'matrix' | 'galaxy' | 'aurora' | 'lightning' | 'combined';
  setCurrentAnimation: (animation: 'particle' | 'wave' | 'balls' | 'fireworks' | 'matrix' | 'galaxy' | 'aurora' | 'lightning'| 'combined') => void;
}

const OptionBar: React.FC<OptionBarProps> = ({ currentAnimation, setCurrentAnimation }) => {
  return (
    <div className="option-bar">
      <h2>Select Animation</h2>
      <div className="option-buttons">
        <button
          className={currentAnimation === 'particle' ? 'active' : ''}
          onClick={() => setCurrentAnimation('particle')}
        >
          Particle Explosion
        </button>
        <button
          className={currentAnimation === 'wave' ? 'active' : ''}
          onClick={() => setCurrentAnimation('wave')}
        >
          Wave Animation
        </button>
        <button
          className={currentAnimation === 'balls' ? 'active' : ''}
          onClick={() => setCurrentAnimation('balls')}
        >
          Bouncing Balls Animation
        </button>
        <button
          className={currentAnimation === 'fireworks' ? 'active' : ''}
          onClick={() => setCurrentAnimation('fireworks')}
        >
          Fireworks Animation
        </button>
        <button
          className={currentAnimation === 'matrix' ? 'active' : ''}
          onClick={() => setCurrentAnimation('matrix')}
        >
          Matrix Rain Animation
        </button>
          <button
          className={currentAnimation === 'galaxy' ? 'active' : ''}
          onClick={() => setCurrentAnimation('galaxy')}
        >
          Galaxy Animation
        </button>
        <button
          className={currentAnimation === 'aurora' ? 'active' : ''}
          onClick={() => setCurrentAnimation('aurora')}
        >
          Aurora Animation
        </button>

        <button
          className={currentAnimation === 'lightning' ? 'active' : ''}
          onClick={() => setCurrentAnimation('lightning')}
        >
          Lightning Animation
        </button>

        
        <button
          className={currentAnimation === 'combined' ? 'active' : ''}
          onClick={() => setCurrentAnimation('combined')}
        >
          Combined Animation
        </button>
      </div>
    </div>
  );
};

export default OptionBar;
