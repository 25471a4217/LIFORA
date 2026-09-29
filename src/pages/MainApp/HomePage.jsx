import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { COURSE_MAPPING } from '../OnboardingPage';

function AnimatedCounter({ value, duration = 1200 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const endValue = parseInt(value, 10);
    if (isNaN(endValue)) return;

    let frameId;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(percentage * endValue));

      if (progress < duration) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [value, duration]);

  return <>{count}</>;
}

export default function HomePage({ onNavigate }) {
  const { state } = useApp();
  const name = state.user.name || 'Learner';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const selectedAreas = state.selectedAreas || [];

  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, []);

  const getPriorityItem = (index, badgeName, defaultSkill, defaultDesc) => {
    const skill = selectedAreas[index];
    if (skill) {
      const match = COURSE_MAPPING[skill];
      if (match) {
        return {
          title: match.title,
          desc: `Current Unit: ${match.current}`,
          badge: badgeName
        };
      }
      return {
        title: skill,
        desc: `Practice core concepts of ${skill}`,
        badge: badgeName
      };
    }
    return {
      title: defaultSkill,
      desc: defaultDesc,
      badge: badgeName
    };
  };

  const doNowItem = getPriorityItem(0, '🔥 DO NOW', 'DSA Practice', 'High impact + deadline approaching');
  const nextItem = getPriorityItem(1, '⭐ NEXT', 'Python Practice', 'Strengthen core skills');
  const laterItem = getPriorityItem(2, '🕒 LATER', 'AI News', 'Stay informed with research updates');
  const skipTodayItem = getPriorityItem(3, '⏸ SKIP TODAY', 'Optional reading', 'Reserve energy for mission tasks');

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <p className="eyebrow">{greeting}, {name} 👋</p>
          <h1>Let's make today count.</h1>
        </div>
        <div className="chip">{state.user.dailyCompletion}% complete</div>
      </div>

      {/* Row 1 */}
      <div style={{ marginBottom: '1.5rem' }}>
        {/* AI Priority Engine */}
        <article className="priority-card">
          <div className="hero-head">
            <span className="eyebrow">AI PRIORITY ENGINE</span>
            <strong>AI has analyzed your goals and available time.</strong>
          </div>
          <div className="priority-block clickable-priority" onClick={() => onNavigate('learning')}>
            <span>{doNowItem.badge}</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>{doNowItem.title}</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>{doNowItem.desc}</p>
          </div>
          <div className="priority-block secondary clickable-priority" onClick={() => onNavigate('learning')}>
            <span>{nextItem.badge}</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>{nextItem.title}</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>{nextItem.desc}</p>
          </div>
          <div className="priority-block tertiary clickable-priority" onClick={() => onNavigate('learning')}>
            <span>{laterItem.badge}</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>{laterItem.title}</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>{laterItem.desc}</p>
          </div>
          <div className="priority-block muted clickable-priority" onClick={() => onNavigate('learning')}>
            <span>{skipTodayItem.badge}</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>{skipTodayItem.title}</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>{skipTodayItem.desc}</p>
          </div>
        </article>
      </div>

      {/* Row 2 */}
      <div className="grid-3col small-gap">
        {/* Growth Score (Learning, Focus, Skills, Career) */}
        <article className="score-card premium-score-card">
          <div className="hero-head">
            <span className="eyebrow">LIFORA GROWTH SCORE</span>
            <strong>Your learning and cognitive index.</strong>
          </div>
          
          <div className="growth-score-content">
            {/* Left/Top: Circular Animated Score */}
            <div className="circular-gauge-container">
              <svg width="120" height="120" viewBox="0 0 120 120" className="circular-gauge-svg">
                <defs>
                  <linearGradient id="bluePurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="var(--surface-soft)"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="url(#bluePurpleGrad)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 314.16,
                    strokeDashoffset: animated ? 314.16 - (76 / 100) * 314.16 : 314.16,
                    transition: 'stroke-dashoffset 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%'
                  }}
                />
              </svg>
              <div className="gauge-text">
                <span className="gauge-number">
                  <AnimatedCounter value={76} duration={1200} />
                </span>
                <span className="gauge-label">/100</span>
              </div>
            </div>

            {/* Right/Bottom: Linear Progress Bars */}
            <div className="progress-bars-container">
              {[
                { label: 'Learning', val: 82 },
                { label: 'Focus', val: 68 },
                { label: 'Skills', val: 71 },
                { label: 'Career', val: 80 }
              ].map(({ label, val }) => (
                <div key={label} className="bar-graph-item">
                  <div className="bar-graph-header">
                    <span className="bar-graph-label">{label}</span>
                    <span className="bar-graph-value">
                      <AnimatedCounter value={val} duration={1200} />%
                    </span>
                  </div>
                  <div className="bar-graph-track">
                    <div
                      className={`bar-graph-fill bar-fill-${label.toLowerCase()}`}
                      style={{
                        width: animated ? `${val}%` : '0%',
                        transition: 'width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Quick Actions & Focus */}
        <article className="actions-card premium-actions-card">
          <div className="hero-head">
            <span className="eyebrow">QUICK ACTIONS & FOCUS</span>
            <strong>Move your plan forward.</strong>
          </div>
          
          <div className="actions-focus-container">
            <div className="action-grid" style={{ display: 'grid', gap: '0.5rem', flex: '1.2' }}>
              {[
                ['⏱️ Start Focus', 'tasks'],
                ['📚 Learn', 'learning'],
                ['🤖 Ask AI', 'coach'],
                ['🔥 Track Habit', 'habits'],
                ['🎯 Set Goal', 'future'],
              ].map(([label, page]) => (
                <button key={label} className="action-pill" onClick={() => page && onNavigate(page)} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}>
                  {label}
                </button>
              ))}
            </div>
            
            {/* Animated Focus Calibrator Widget */}
            <div className="focus-calibrator-widget">
              <div className="focus-breather-circle">
                <span className="focus-emoji">🧘</span>
              </div>
              <span className="focus-breather-text">Focus Breath</span>
            </div>
          </div>
        </article>

        {/* Today's Challenge */}
        <article className="challenge-card premium-challenge-card">
          <div className="hero-head">
            <span className="eyebrow">TODAY'S CHALLENGE</span>
            <strong>30-Minute Deep Work Challenge</strong>
          </div>
          
          <div className="challenge-body">
            <div className="challenge-visual">
              <div className="pulse-ring" />
              <span className="challenge-emoji">⚡</span>
            </div>
            
            <div className="challenge-info">
              <p className="challenge-progress">
                <strong>18 / 30</strong> minutes
              </p>
              <div className="challenge-bar-track">
                <div
                  className="challenge-bar-fill"
                  style={{
                    width: animated ? '60%' : '0%',
                    transition: 'width 1.5s cubic-bezier(0.1, 0.8, 0.2, 1)'
                  }}
                />
              </div>
              <p className="reward-copy">💰 +50 XP Reward</p>
            </div>
          </div>
          
          <button className="primary-btn challenge-btn" onClick={() => onNavigate('tasks')}>
            Start Challenge
          </button>
        </article>
      </div>
    </div>
  );
}
