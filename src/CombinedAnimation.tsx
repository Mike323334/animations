import React from 'react';
import ParticleExplosion from './ParticleExplosion';
import WaveAnimation from './WaveAnimation';
import BouncingBalls from './BouncingBalls';
import Fireworks from './Fireworks';
import Matrix from './Matrix';
import Galaxy from './Galaxy';
import Aurora from './Aurora';
import Lightning from './Lightning';
import Snowfall from './Snowfall';
import './CombinedAnimation.css';

const CombinedAnimation: React.FC = () => {
  return (
    <div className="combined-animation">
      <div className="layer particle">
        <ParticleExplosion />
      </div>

      <div className="layer wave">
        <WaveAnimation />
      </div>

      <div className="layer balls">
        <BouncingBalls />
      </div>

      <div className="layer fireworks">
        <Fireworks />
      </div>

      <div className="layer matrix">
        <Matrix />
      </div>

      <div className="layer galaxy">
        <Galaxy />
      </div>

      <div className="layer aurora">
        <Aurora />
      </div>

      <div className="layer lightning">
        <Lightning />
      </div>

    
    </div>
  );
};

export default CombinedAnimation;
