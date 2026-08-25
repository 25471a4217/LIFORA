import { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const COMMANDS = [
  { label: 'Create task', page: null, action: 'addTask' },
  { label: 'Ask AI', page: 'coach' },
  { label: 'Open planner', page: 'future' },
  { label: 'View goals', page: 'profile' },
  { label: 'Start learning', page: 'learning' },
  { label: 'Check analytics', page: 'analytics' },
  { label: 'My Habits', page: 'habits' },
  { label: 'Rewards', page: 'rewards' },
];

export default function CommandCenter({ onClose, onNavigate, onOpenAddTask }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  function handleCommand(cmd) {
    if (cmd.action === 'addTask') {
      onOpenAddTask?.();
    } else if (cmd.page) {
      onNavigate(cmd.page);
    }
    onClose();
  }

  return (
    <div className="command-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="command-shell">
        <div className="command-header">
          <h3 style={{ margin: 0 }}>LIFORA COMMAND CENTER</h3>
          <p>Ctrl + K to open</p>
        </div>
        <input
          ref={inputRef}
          id="commandInput"
          type="search"
          placeholder="Create task, start focus, ask AI..."
          className="onboard-input"
          style={{ marginTop: 0 }}
        />
        <div className="command-list">
          {COMMANDS.map((cmd) => (
            <button
              key={cmd.label}
              className="command-action"
              onClick={() => handleCommand(cmd)}
            >
              <span>{cmd.label}</span>
              <span style={{ color: '#5d8bff', fontSize: '0.8rem' }}>→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
