import { useState } from 'react';

const INITIAL_HABITS = [
  { id: 'h1', name: 'Study', streak: 12, completed: false },
  { id: 'h2', name: 'Exercise', streak: 7, completed: false },
  { id: 'h3', name: 'Reading', streak: 5, completed: false },
];

export default function HabitsPage() {
  const [habits, setHabits] = useState(INITIAL_HABITS);

  function complete(id) {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, completed: true, streak: h.streak + 1 } : h));
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Habit tracker</span>
          <h2 style={{ margin: 0 }}>Daily habits</h2>
        </div>
        <button className="primary-btn">Add Habit</button>
      </div>

      <div className="habit-grid">
        {habits.map(h => (
          <article key={h.id} className="habit-card">
            <h3 style={{ margin: 0 }}>{h.name}</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>🔥 {h.streak} day streak</p>
            <button
              className="ghost-btn"
              onClick={() => complete(h.id)}
              disabled={h.completed}
              style={h.completed ? { color: '#5dffb5', borderColor: 'rgba(93,255,181,0.3)' } : {}}
            >
              {h.completed ? '✓ Done' : 'Complete'}
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
