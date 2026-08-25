export default function FuturePage() {
  const timeline = [
    { year: '2026', label: 'Foundations' },
    { year: '2027', label: 'Advanced Skills' },
    { year: '2028', label: 'Projects + Internship' },
    { year: '2029', label: 'Job Ready' },
  ];
  const gaps = [
    { skill: 'Python', from: '70%', to: '80%' },
    { skill: 'DSA', from: '52%', to: '75%' },
    { skill: 'ML', from: '35%', to: '70%' },
    { skill: 'SQL', from: '48%', to: '65%' },
    { skill: 'Git', from: '60%', to: '70%' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Future planner</span>
          <h2 style={{ margin: 0 }}>My Future</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.3rem 0 0' }}>Become an AI Engineer</p>
        </div>
      </div>

      <div className="timeline-card">
        {timeline.map(t => (
          <div key={t.year}>
            <strong style={{ color: '#5d8bff' }}>{t.year}</strong>
            <span style={{ color: 'rgba(255,255,255,0.8)' }}>{t.label}</span>
          </div>
        ))}
      </div>

      <div className="gap-card">
        <div>
          <h3 style={{ margin: 0 }}>Career skill gap</h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.3rem 0 0' }}>You vs Required</p>
        </div>
        <div className="gap-list">
          {gaps.map(g => (
            <div key={g.skill}>
              <span style={{ color: 'rgba(255,255,255,0.8)' }}>{g.skill}</span>
              <strong style={{ color: '#5d8bff' }}>{g.from} → {g.to}</strong>
            </div>
          ))}
        </div>
        <button className="primary-btn" style={{ width: 'fit-content' }}>Generate My Skill Plan</button>
      </div>
    </div>
  );
}
