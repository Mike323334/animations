import React, { useState } from 'react';
import ParticleExplosion from './ParticleExplosion';
import WaveAnimation from './WaveAnimation';
import BouncingBalls from './BouncingBalls';
import Fireworks from './Fireworks';
import OptionBar from './OptionBar';
import Matrix from './Matrix';
import Galaxy from './Galaxy';
import Aurora from './Aurora';
import Lightning from './Lightning';
import CombinedAnimation from './CombinedAnimation';
import './App.css';



const animationsMap = {
  particle: <ParticleExplosion />,
  wave: <WaveAnimation />,
  balls: <BouncingBalls />,
  fireworks: <Fireworks />,
  matrix: <Matrix />,
  galaxy: <Galaxy />,
  aurora: <Aurora />,
  lightning: <Lightning />,
  combined: <CombinedAnimation />

};

const App: React.FC = () => {
 const [currentAnimation, setCurrentAnimation] = useState<
  'particle' | 'wave' | 'balls' | 'fireworks' | 'matrix' | 'galaxy' | 'aurora' | 'lightning' | 'combined'
>('particle');


  return (
    <div className="App">
      <OptionBar
        currentAnimation={currentAnimation}
        setCurrentAnimation={setCurrentAnimation}
      />
      {animationsMap[currentAnimation]}
    </div>
  );
};

export default App;
