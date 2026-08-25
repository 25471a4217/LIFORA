import { useApp } from '../../context/AppContext';

const BADGES = [
  { emoji: '🏆', name: '7 Day Streak', locked: false },
  { emoji: '🧠', name: 'Quiz Master', locked: false },
  { emoji: '🔥', name: 'Deep Work', locked: false },
  { emoji: '🚀', name: 'Skill Builder', locked: true },
  { emoji: '🎯', name: 'Goal Crusher', locked: true },
];

export default function RewardsPage() {
  const { state } = useApp();
  const { xp, level } = state.user;
  const pct = ((xp % 500) / 500) * 100;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">My Level</span>
          <h2 style={{ margin: 0 }}>Level {level}</h2>
        </div>
      </div>

      <div className="rewards-shell">
        <div className="xp-bar">
          <span style={{ width: `${pct}%` }} />
        </div>
        <p style={{ color: '#8da9ff', margin: 0 }}>{xp.toLocaleString()} XP · {500 - (xp % 500)} XP to next level</p>
      </div>

      <div className="badge-grid">
        {BADGES.map(b => (
          <article key={b.name} className={b.locked ? 'locked' : ''}>
            <span style={{ fontSize: '2rem' }}>{b.emoji}</span>
            <strong style={{ display: 'block', marginTop: '0.5rem' }}>{b.name}</strong>
            {b.locked && <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>Locked</span>}
          </article>
        ))}
      </div>
    </div>
  );
}
