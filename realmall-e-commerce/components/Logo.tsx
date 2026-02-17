
import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-10", showText = true, light = false }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 100 100" className="h-full w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bagGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        {/* Shopping Bag Silhouette */}
        <path d="M30 35 L70 35 L75 85 L25 85 Z" fill="url(#bagGradient)" />
        {/* Handles */}
        <path d="M40 35 Q40 20 50 20 Q60 20 60 35" stroke={light ? "white" : "#4338ca"} strokeWidth="4" fill="none" />
        {/* Dynamic Swooshes */}
        <path d="M65 30 Q85 45 65 75" stroke="url(#bagGradient)" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
        <path d="M72 45 Q90 55 75 80" stroke="url(#bagGradient)" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={`text-2xl font-bold tracking-tighter ${light ? 'text-white' : 'text-slate-900'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            REALMALL
          </span>
          <span className={`text-[8px] uppercase tracking-[0.1em] mt-0.5 ${light ? 'text-indigo-200' : 'text-indigo-600 font-semibold'}`}>
            shop securely with us
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
