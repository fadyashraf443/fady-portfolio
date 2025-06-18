import React, { useEffect, useState } from 'react';
import { Shield, Terminal, Eye } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps = [
    { text: 'Initializing security protocols...', icon: Shield },
    { text: 'Loading threat detection systems...', icon: Eye },
    { text: 'Establishing secure connection...', icon: Terminal },
    { text: 'Activating SOC interface...', icon: Shield },
    { text: 'System ready. Welcome, Agent.', icon: Terminal }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const newProgress = prev + Math.random() * 10;
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length);
        setCurrentStep(Math.min(stepIndex, loadingSteps.length - 1));
        
        return Math.min(newProgress, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep]?.icon || Shield;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-spin"></div>
            <div className="absolute inset-2 border-4 border-green-400 rounded-full animate-spin-reverse"></div>
            <div className="absolute inset-4 flex items-center justify-center">
              <CurrentIcon className="w-8 h-8 text-cyan-400 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="mb-8">
          <h1 className="cyber-title text-3xl mb-4">FADY.SYS</h1>
          <p className="cyber-text text-cyan-400 mb-2">
            {loadingSteps[currentStep]?.text || 'Loading...'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-400 to-green-400 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Matrix-style falling text */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute text-green-400 text-xs font-mono animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              >
                {Math.random().toString(36).substring(7)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;