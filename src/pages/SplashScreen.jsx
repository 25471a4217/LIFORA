import { useEffect } from 'react';

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="splash-screen">
      <div className="splash-bg" />
      <div className="splash-panel">
        <div className="logo-mark">
          <svg viewBox="0 0 120 120" className="logo-symbol" style={{ width: '100%', height: '100%' }}>
            <defs>
              <linearGradient id="splashGradient" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b5cff" />
                <stop offset="100%" stopColor="#a678ff" />
              </linearGradient>
            </defs>
            <path d="M30 20 L55 20 C60 40 80 25 76 52 C74 65 62 75 44 80 L60 100" fill="none" stroke="url(#splashGradient)" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="35" cy="70" r="6" fill="#5ff" />
            <circle cx="70" cy="35" r="6" fill="#fff" />
          </svg>
        </div>
        <div className="splash-copy">
          <span className="eyebrow">LIFORA</span>
          <h1>Your Intelligent Life Operating System</h1>
          <p>Learn • Focus • Build • Grow • Achieve</p>
        </div>
        <div className="splash-loader">
          <div /><div /><div />
        </div>
      </div>
    </div>
  );
}
