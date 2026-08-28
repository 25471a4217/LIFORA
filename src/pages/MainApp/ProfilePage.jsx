import { useApp } from '../../context/AppContext';

export default function ProfilePage() {
  const { state } = useApp();
  const { name, mainGoal, level, xp, streak, growthScore, focusAreas } = state.user;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Profile</span>
          <h2 style={{ margin: 0 }}>{name || 'Learner'}</h2>
          <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0' }}>{mainGoal}</p>
        </div>
        <button className="ghost-btn">Edit Profile</button>
      </div>

      <div className="profile-grid">
        {[
          ['Level', level],
          ['XP', xp?.toLocaleString()],
          ['Streak', `${streak} days`],
          ['Growth Score', growthScore],
        ].map(([label, val]) => (
          <article key={label}>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{label}</span>
            <strong style={{ display: 'block', fontSize: '1.6rem', marginTop: '0.3rem' }}>{val}</strong>
          </article>
        ))}
      </div>

      <div className="focus-list">
        <h3>Top {focusAreas?.length || 5} Focus Areas</h3>
        <div className="pill-list">
          {(focusAreas || ['AI', 'Coding', 'Career', 'Education', 'Growth']).map(area => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
