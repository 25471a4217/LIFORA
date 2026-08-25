export default function AnalyticsPage() {
  const bars = [72, 88, 65, 75, 92, 60, 77];

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Analytics</span>
          <h2 style={{ margin: 0 }}>Performance overview</h2>
        </div>
      </div>

      <div className="analytics-grid">
        <article className="analytics-card">
          <span className="eyebrow">Focus score</span>
          <strong style={{ fontSize: '2rem' }}>72</strong>
          <p style={{ color: '#5dffb5', margin: 0, fontSize: '0.9rem' }}>+12% from last week</p>
        </article>
        <article className="analytics-card">
          <span className="eyebrow">Weekly learning</span>
          <strong style={{ fontSize: '2rem' }}>8h 20m</strong>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.9rem' }}>Steady upward momentum</p>
        </article>
        <article className="analytics-card">
          <span className="eyebrow">Habit consistency</span>
          <strong style={{ fontSize: '2rem' }}>81%</strong>
          <p style={{ color: '#5dffb5', margin: 0, fontSize: '0.9rem' }}>Great streaks maintained</p>
        </article>
      </div>

      <div className="chart-grid">
        <div className="bar-chart">
          <h4 style={{ margin: '0 0 1rem' }}>Daily focus</h4>
          <div>
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} title={`${h}%`} />
            ))}
          </div>
        </div>
        <div className="line-chart">
          <h4 style={{ margin: '0 0 1rem' }}>Skill growth</h4>
          <svg viewBox="0 0 200 120" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#85c0ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#85c0ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points="0,95 35,80 70,68 105,50 140,40 175,30 200,22"
              fill="none"
              stroke="#85c0ff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {[0, 35, 70, 105, 140, 175, 200].map((x, i) => {
              const ys = [95, 80, 68, 50, 40, 30, 22];
              return <circle key={i} cx={x} cy={ys[i]} r="4" fill="#85c0ff" />;
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}
