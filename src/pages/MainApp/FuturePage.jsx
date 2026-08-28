import { useApp } from '../../context/AppContext';

export default function FuturePage() {
  const { state } = useApp();
  const selectedSkills = state.user?.focusAreas || state.selectedAreas || [];
  const targetGoal = state.user?.mainGoal || state.mainGoal || 'Become an AI Engineer';

  // Generate dynamic timeline based on selected skills
  const timeline = [
    { year: '2026', label: `Foundations of ${selectedSkills[0] || 'Core Tech'}` },
    { year: '2027', label: `Advanced ${selectedSkills[1] || 'Modern Stack'} & ${selectedSkills[2] || 'System Design'}` },
    { year: '2028', label: `Capstone Projects in ${selectedSkills[3] || 'Next-Gen Domains'} + Internship` },
    { year: '2029', label: `${targetGoal} (Job Ready)` },
  ];

  // Generate dynamic gaps based on selected skills
  const basePercentages = [
    { from: '40%', to: '85%' },
    { from: '30%', to: '80%' },
    { from: '25%', to: '75%' },
    { from: '20%', to: '70%' },
    { from: '15%', to: '70%' },
  ];

  const gaps = selectedSkills.slice(0, 5).map((skill, index) => ({
    skill: skill,
    from: basePercentages[index]?.from || '20%',
    to: basePercentages[index]?.to || '75%',
  }));

  // fallback to default gaps if no skills selected
  if (gaps.length === 0) {
    gaps.push(
      { skill: 'Python Coding', from: '50%', to: '85%' },
      { skill: 'Algorithms & DSA', from: '35%', to: '75%' },
      { skill: 'System Architecture', from: '20%', to: '70%' }
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Future planner</span>
          <h2 style={{ margin: 0 }}>My Future</h2>
          <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0' }}>{targetGoal}</p>
        </div>
      </div>

      <div className="timeline-card">
        {timeline.map(t => (
          <div key={t.year}>
            <strong style={{ color: 'var(--blue)' }}>{t.year}</strong>
            <span style={{ color: 'var(--text)' }}>{t.label}</span>
          </div>
        ))}
      </div>

      <div className="gap-card">
        <div>
          <h3 style={{ margin: 0 }}>Career skill gap</h3>
          <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0' }}>You vs Required</p>
        </div>
        <div className="gap-list">
          {gaps.map(g => (
            <div key={g.skill}>
              <span style={{ color: 'var(--text)' }}>{g.skill}</span>
              <strong style={{ color: 'var(--blue)' }}>{g.from} → {g.to}</strong>
            </div>
          ))}
        </div>
        <button className="primary-btn" style={{ width: 'fit-content' }}>Generate My Skill Plan</button>
      </div>
    </div>
  );
}
