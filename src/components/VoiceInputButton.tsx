import React, { useEffect, useState } from 'react';

interface VoiceInputButtonProps {
  isActive: boolean;
  onClick: () => void;
}

const VoiceInputButton: React.FC<VoiceInputButtonProps> = ({ isActive, onClick }) => {
  const [scale, setScale] = useState(1);
  
  // Pulse animation effect when active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        setScale(prev => (prev === 1 ? 1.1 : 1));
      }, 500);
    } else {
      setScale(1);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg flex items-center justify-center ${
        isActive ? 'bg-red-500' : 'bg-indigo-600'
      } hover:${isActive ? 'bg-red-600' : 'bg-indigo-700'} transition-colors`}
      style={{ 
        transform: `scale(${scale})`,
        transition: 'transform 0.3s ease-in-out',
      }}
      aria-label="Voice input"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth={1.5} 
        stroke="currentColor" 
        className="w-7 h-7 text-white"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" 
        />
      </svg>
      
      {isActive && (
        <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
      )}
    </button>
  );
};

export default VoiceInputButton;