import { useApp } from '../../context/AppContext';

export default function HomePage({ onNavigate }) {
  const { state } = useApp();
  const name = state.user.name || 'Learner';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

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
          <div className="priority-block">
            <span>🔥 DO NOW</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>DSA Practice</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>High impact + deadline approaching</p>
          </div>
          <div className="priority-block secondary">
            <span>⭐ NEXT</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>Python Practice</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Strengthen core skills</p>
          </div>
          <div className="priority-block tertiary">
            <span>🕒 LATER</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>AI News</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Stay informed with research updates</p>
          </div>
          <div className="priority-block muted">
            <span>⏸ SKIP TODAY</span>
            <strong style={{ display: 'block', marginTop: '0.3rem' }}>Optional reading</strong>
            <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.9rem' }}>Reserve energy for mission tasks</p>
          </div>
        </article>
      </div>

      {/* Row 2 */}
      <div className="grid-3col small-gap">
        {/* Growth Score (Learning, Focus, Skills, Career) */}
        <article className="score-card">
          <div className="hero-head">
            <span className="eyebrow">LIFORA GROWTH SCORE</span>
            <strong>76 / 100</strong>
          </div>
          <div className="score-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[['Learning', 82], ['Focus', 68], ['Skills', 71], ['Career', 80]].map(([label, val]) => (
              <div key={label} className="radial" data-value={val}>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </article>

        {/* Quick Actions */}
        <article className="actions-card">
          <div className="hero-head">
            <span className="eyebrow">QUICK ACTIONS</span>
            <strong>Move your plan forward.</strong>
          </div>
          <div className="action-grid">
            {[
              ['Start Focus', null],
              ['Learn', 'learning'],
              ['Ask AI', 'coach'],
              ['Track Habit', 'habits'],
              ['Set Goal', 'future'],
            ].map(([label, page]) => (
              <button key={label} className="action-pill" onClick={() => page && onNavigate(page)}>{label}</button>
            ))}
          </div>
        </article>

        {/* Today's Challenge */}
        <article className="challenge-card">
          <div className="hero-head">
            <span className="eyebrow">TODAY'S CHALLENGE</span>
            <strong>30-Minute Deep Work Challenge</strong>
          </div>
          <p className="challenge-progress"><strong>18 / 30</strong> minutes</p>
          <p className="reward-copy">Reward: +50 XP</p>
          <button className="primary-btn">Start Challenge</button>
        </article>
      </div>
    </div>
  );
}
