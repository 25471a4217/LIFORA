const GROUPS = [
  { name: 'AI Engineers', members: '1,284', desc: 'Active challenges · Progress 72%' },
  { name: 'Placement 2027', members: '968', desc: 'Mock interviews · Study sprints' },
  { name: 'Fitness Challenge', members: '542', desc: 'Daily habits · Energy focus' },
];

export default function CommunityPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Community</span>
          <h2 style={{ margin: 0 }}>People building the same future</h2>
        </div>
      </div>

      <div className="community-grid">
        {GROUPS.map(g => (
          <article key={g.name}>
            <h3 style={{ margin: 0 }}>{g.name}</h3>
            <p style={{ color: 'var(--muted)', margin: '0.4rem 0' }}>{g.members} members · {g.desc}</p>
            <button className="ghost-btn">Join</button>
          </article>
        ))}
      </div>
    </div>
  );
}
