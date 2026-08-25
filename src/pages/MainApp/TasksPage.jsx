import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';

function AddTaskModal({ onSave, onClose }) {
  const [form, setForm] = useState({ title: '', goal: '', time: '', duration: '', priority: 'Level 1 🎮' });
  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));
  function save() {
    if (!form.title || !form.goal || !form.time || !form.duration) return;
    onSave(form);
  }
  return (
    <Modal title="Deploy New Mission 🚀" onClose={onClose} footer={
      <button className="primary-btn" onClick={save}>Launch Mission</button>
    }>
      <label style={{ display: 'block', marginTop: '0.75rem', color: 'rgba(255,255,255,0.86)' }}>Mission Title</label>
      <input className="onboard-input" type="text" placeholder="Build React RAG Component" value={form.title} onChange={set('title')} />
      
      <label style={{ display: 'block', marginTop: '0.75rem', color: 'rgba(255,255,255,0.86)' }}>Goal Category</label>
      <input className="onboard-input" type="text" placeholder="AI Architect Roadmap" value={form.goal} onChange={set('goal')} />
      
      <label style={{ display: 'block', marginTop: '0.75rem', color: 'rgba(255,255,255,0.86)' }}>Difficulty Level</label>
      <select className="onboard-input" value={form.priority} onChange={set('priority')} style={{ background: '#0e1937', color: '#eef3ff' }}>
        <option value="Level 1 🎮">Level 1 🎮 (Quick Warm-up)</option>
        <option value="Boss Level 👾">Boss Level 👾 (High Impact / Complex)</option>
        <option value="Checkpoint 🚩">Checkpoint 🚩 (Milestone Task)</option>
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.86)' }}>Time</label>
          <input className="onboard-input" type="text" placeholder="14:00" value={form.time} onChange={set('time')} />
        </div>
        <div>
          <label style={{ display: 'block', color: 'rgba(255,255,255,0.86)' }}>Duration</label>
          <input className="onboard-input" type="text" placeholder="10 min Sprint" value={form.duration} onChange={set('duration')} />
        </div>
      </div>
    </Modal>
  );
}

function MissionSprintModal({ task, onComplete, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes default
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!active || secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [active, secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <Modal
      title={`🎮 Mission Sprint: ${task.title}`}
      onClose={onClose}
      footer={
        <div style={{ display: 'flex', gap: '0.8rem', width: '100%', justifyContent: 'space-between' }}>
          <button className="secondary-btn" onClick={() => setActive(!active)}>
            {active ? 'Pause Sprint' : 'Start 10-Min Sprint'}
          </button>
          <button className="primary-btn" onClick={onComplete}>
            Mark Mission Complete (+{task.xp || 35} XP)
          </button>
        </div>
      }
    >
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0 0 1rem' }}>
          The goal is not to solve everything at once. Just commit <strong>10 minutes</strong> to build natural momentum!
        </p>

        <div style={{ fontSize: '3rem', fontWeight: 800, color: '#76f5ff', letterSpacing: '0.05em', fontFamily: 'monospace' }}>
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>

        <p style={{ fontSize: '0.85rem', color: '#8da9ff', marginTop: '0.5rem' }}>
          {active ? '⚡ Sprint Active! Focus on the next immediate line or step.' : 'Press Start to begin your zero-pressure sprint.'}
        </p>
      </div>
    </Modal>
  );
}

function CompleteModal({ task, onManual, onSprint, onClose }) {
  return (
    <Modal title="Mission Victory Verification 🏆" onClose={onClose} footer={
      <>
        <button className="secondary-btn" onClick={onManual}>Instant Victory</button>
        <button className="primary-btn" onClick={onSprint}>Start 10-Min Sprint</button>
      </>
    }>
      <p style={{ lineHeight: '1.5', color: 'rgba(255,255,255,0.9)' }}>
        Ready to check off <strong>{task.title}</strong>? Connect a small present action to your near-future career momentum!
      </p>
      <div className="feature-card" style={{ marginBottom: '0.5rem', border: '1px solid rgba(118,245,255,0.3)' }}>
        <strong>⚡ 10-Minute Mission Sprint</strong>
        <p style={{ margin: '0.3rem 0 0', color: 'rgba(255,255,255,0.7)' }}>
          Work for just 10 minutes. If you start now, you'll reach a much lighter position by the end of the hour.
        </p>
      </div>
      <div className="feature-card" style={{ marginBottom: '0.5rem' }}>
        <strong> instant Checkpoint Victory</strong>
        <p style={{ margin: '0.3rem 0 0', color: 'rgba(255,255,255,0.7)' }}>Claim +{task.xp || 35} XP immediately.</p>
      </div>
    </Modal>
  );
}

function XPModal({ task, xp, onClose }) {
  return (
    <Modal title="Mission Accomplished! 🏆" onClose={onClose} footer={<button className="primary-btn" onClick={onClose}>Continue Journey</button>}>
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
        <h3>+{xp} XP Earned!</h3>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>
          By finishing <strong>{task.title}</strong>, your future workload just got significantly lighter.
        </p>
      </div>
    </Modal>
  );
}

const FILTERS = ['today', 'upcoming', 'completed', 'all'];

export default function TasksPage({ addTaskTrigger }) {
  const { state, update, updateUser } = useApp();
  const [filter, setFilter] = useState('today');
  const [showAdd, setShowAdd] = useState(false);
  const [completeTask, setCompleteTask] = useState(null);
  const [sprintTask, setSprintTask] = useState(null);
  const [xpModal, setXpModal] = useState(null);

  useEffect(() => {
    if (addTaskTrigger) setShowAdd(true);
  }, [addTaskTrigger]);

  const filtered = state.tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'completed') return t.completed;
    return t.status === filter;
  });

  const completedCount = state.tasks.filter(t => t.completed).length;
  const totalCount = state.tasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  function saveTask(form) {
    const newTask = {
      id: `t${Date.now()}`,
      title: form.title,
      status: 'today',
      priority: form.priority || 'Level 1 🎮',
      time: form.time,
      goal: form.goal,
      duration: form.duration,
      xp: form.priority.includes('Boss') ? 50 : 30,
      completed: false,
    };
    update({ tasks: [...state.tasks, newTask] });
    setShowAdd(false);
  }

  function handleComplete(task) {
    setCompleteTask(task);
  }

  function manualComplete(taskToComplete) {
    const task = taskToComplete || completeTask;
    update({
      tasks: state.tasks.map(t => t.id === task.id ? { ...t, completed: true, status: 'completed', priority: 'Mission Complete 🏆' } : t)
    });
    updateUser({ xp: (state.user.xp || 0) + (task.xp || 30) });
    setCompleteTask(null);
    setSprintTask(null);
    setXpModal({ task, xp: task.xp || 30 });
  }

  function startSprint(task) {
    setCompleteTask(null);
    setSprintTask(task);
  }

  function reschedule(id) {
    update({ tasks: state.tasks.map(t => t.id === id ? { ...t, status: 'upcoming' } : t) });
  }

  function deleteTask(id) {
    update({ tasks: state.tasks.filter(t => t.id !== id) });
  }

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="eyebrow">TASK GAMIFICATION SYSTEM</span>
          <h2 style={{ margin: 0 }}>Mission Control & Sprints</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.3rem 0 0' }}>
            Turn daily goals into levels, checkpoints, and boss challenges. Small present actions create big future progress.
          </p>
        </div>
        <button className="primary-btn" onClick={() => setShowAdd(true)}>+ New Mission 🚀</button>
      </div>

      {/* Gamified Mission Progress Tracker */}
      <div className="insight-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(14,25,55,0.95), rgba(29,45,82,0.88))', border: '1px solid rgba(118,245,255,0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow" style={{ color: '#76f5ff' }}>MISSION PROGRESS</span>
            <h3 style={{ margin: '0.2rem 0' }}>{completedCount} of {totalCount} Missions Accomplished ({completionPercentage}%)</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
              "If you finish just 1 micro-step now, your afternoon workload becomes 50% easier."
            </p>
          </div>
          <div style={{ width: '180px', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${completionPercentage}%`, height: '100%', background: 'linear-gradient(90deg, #5d8bff, #76f5ff)', transition: 'width 0.5s ease' }} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tab-row" role="tablist">
        {FILTERS.map(f => (
          <button key={f} className={`tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)} role="tab">
            {f === 'today' ? 'Active Missions 🚀' : f === 'completed' ? 'Victories 🏆' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="task-grid">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>Your mission radar is clear.</h3>
            <p>Deploy your next mission to trigger momentum!</p>
          </div>
        ) : (
          filtered.map(task => {
            const isBoss = task.priority?.includes('Boss');
            const isComplete = task.completed;
            const badge = isComplete ? 'Mission Complete 🏆' : task.priority || 'Level 1 🎮';

            return (
              <article key={task.id} className={`task-card${isComplete ? ' completed' : ''}`} style={{ borderLeft: isBoss ? '4px solid #ff7676' : isComplete ? '4px solid #46ecb4' : '4px solid #5d8bff' }}>
                <header>
                  <div>
                    <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', background: isBoss ? 'rgba(255,118,118,0.2)' : isComplete ? 'rgba(70,236,180,0.2)' : 'rgba(93,139,255,0.2)', color: isBoss ? '#ff7676' : isComplete ? '#46ecb4' : '#8da9ff', marginBottom: '0.4rem' }}>
                      {badge}
                    </div>
                    <strong style={{ fontSize: '1.05rem', display: 'block' }}>{task.title}</strong>
                    <p style={{ margin: '0.2rem 0 0', color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem' }}>{task.goal}</p>
                  </div>
                  <button className={isComplete ? 'secondary-btn' : 'primary-btn'} onClick={() => !isComplete && handleComplete(task)}>
                    {isComplete ? '✓ Victory' : 'Play Mission'}
                  </button>
                </header>

                <div className="task-meta" style={{ marginTop: '1rem' }}>
                  <span>🕒 {task.time || '10 min'}</span>
                  <span>⏱️ {task.duration}</span>
                  <span style={{ color: '#76f5ff', fontWeight: 600 }}>+{task.xp || 30} XP</span>
                </div>

                <div className="task-actions" style={{ marginTop: '0.8rem' }}>
                  {!isComplete && (
                    <button className="secondary-btn" onClick={() => startSprint(task)}>⚡ 10-Min Sprint</button>
                  )}
                  <button className="ghost-btn" onClick={() => reschedule(task.id)}>Reschedule</button>
                  <button className="ghost-btn" onClick={() => deleteTask(task.id)} style={{ color: '#ff9494' }}>Delete</button>
                </div>
              </article>
            );
          })
        )}
      </div>

      {showAdd && <AddTaskModal onSave={saveTask} onClose={() => setShowAdd(false)} />}
      {completeTask && <CompleteModal task={completeTask} onManual={() => manualComplete(completeTask)} onSprint={() => startSprint(completeTask)} onClose={() => setCompleteTask(null)} />}
      {sprintTask && <MissionSprintModal task={sprintTask} onComplete={() => manualComplete(sprintTask)} onClose={() => setSprintTask(null)} />}
      {xpModal && <XPModal task={xpModal.task} xp={xpModal.xp} onClose={() => setXpModal(null)} />}
    </div>
  );
}
