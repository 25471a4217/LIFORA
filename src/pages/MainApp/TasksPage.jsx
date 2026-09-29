import { useState, useEffect, useRef } from 'react';
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
      <label style={{ display: 'block', marginTop: '0.75rem', color: 'var(--text)' }}>Mission Title</label>
      <input className="onboard-input" type="text" placeholder="Build React RAG Component" value={form.title} onChange={set('title')} />
      
      <label style={{ display: 'block', marginTop: '0.75rem', color: 'var(--text)' }}>Goal Category</label>
      <input className="onboard-input" type="text" placeholder="AI Architect Roadmap" value={form.goal} onChange={set('goal')} />
      
      <label style={{ display: 'block', marginTop: '0.75rem', color: 'var(--text)' }}>Difficulty Level</label>
      <select className="onboard-input" value={form.priority} onChange={set('priority')} style={{ background: '#0e1937', color: '#eef3ff' }}>
        <option value="Level 1 🎮">Level 1 🎮 (Quick Warm-up)</option>
        <option value="Boss Level 👾">Boss Level 👾 (High Impact / Complex)</option>
        <option value="Checkpoint 🚩">Checkpoint 🚩 (Milestone Task)</option>
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '0.75rem' }}>
        <div>
          <label style={{ display: 'block', color: 'var(--text)' }}>Time</label>
          <input className="onboard-input" type="text" placeholder="14:00" value={form.time} onChange={set('time')} />
        </div>
        <div>
          <label style={{ display: 'block', color: 'var(--text)' }}>Duration</label>
          <input className="onboard-input" type="text" placeholder="10 min Sprint" value={form.duration} onChange={set('duration')} />
        </div>
      </div>
    </Modal>
  );
}

const STUDY_RESOURCES = {
  'Full Stack Development': {
    video: 'https://www.youtube.com/watch?v=nu_pCVPKzTk',
    textbook: 'https://eloquentjavascript.net/',
    tutorial: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started',
    videoTitle: '📺 Full Stack Video',
    textbookTitle: '📖 JS Textbook',
    tutorialTitle: '🔗 React Tutorial'
  },
  'Prompt Engineering': {
    video: 'https://www.youtube.com/watch?v=jC4v5AS4RIM',
    textbook: 'https://www.promptingguide.ai/',
    tutorial: 'https://platform.openai.com/docs/guides/prompt-engineering',
    videoTitle: '📺 Prompt Eng. Video',
    textbookTitle: '📖 Prompt Guide',
    tutorialTitle: '🔗 OpenAI Tips'
  },
  'Quantum Computing': {
    video: 'https://www.youtube.com/watch?v=F_Riqjdh2oM',
    textbook: 'https://learn.qiskit.org/',
    tutorial: 'https://quantum-computing.ibm.com/lab/docs/iql',
    videoTitle: '📺 Quantum Video',
    textbookTitle: '📖 Qiskit Book',
    tutorialTitle: '🔗 IBM Quantum Labs'
  },
  'AI & Machine Learning': {
    video: 'https://www.youtube.com/watch?v=aircAruvnKk',
    textbook: 'https://www.statlearning.com/',
    tutorial: 'https://www.kaggle.com/learn/intro-to-machine-learning',
    videoTitle: '📺 Neural Net Video',
    textbookTitle: '📖 ML Textbook',
    tutorialTitle: '🔗 Kaggle Practice'
  },
  'Entrepreneurship': {
    video: 'https://www.youtube.com/watch?v=CBYhX5cTL5A',
    textbook: 'https://playbook.samaltman.com/',
    tutorial: 'https://www.startupschool.org/',
    videoTitle: '📺 Startup Validation Video',
    textbookTitle: '📖 Sam Altman Playbook',
    tutorialTitle: '🔗 YC Startup School'
  },
  'Default': {
    video: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    textbook: 'https://github.com/ossu/computer-science',
    tutorial: 'https://www.w3schools.com/',
    videoTitle: '📺 CS Mastery Video',
    textbookTitle: '📖 CS Textbook Reference',
    tutorialTitle: '🔗 W3Schools Guide'
  }
};

function getResourcesForSkill(skillName) {
  if (!skillName) return STUDY_RESOURCES['Default'];
  const matchedKey = Object.keys(STUDY_RESOURCES).find(
    k => k.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(k.toLowerCase())
  );
  return matchedKey ? STUDY_RESOURCES[matchedKey] : STUDY_RESOURCES['Default'];
}

function MissionSprintModal({ task, onComplete, onClose, selectedAreas }) {
  const [secondsLeft, setSecondsLeft] = useState(600); // 10 minutes default
  const [active, setActive] = useState(false);
  const resources = getResourcesForSkill(task.goal || selectedAreas?.[0] || 'Default');

  useEffect(() => {
    if (!active || secondsLeft <= 0) return;
    const timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [active, secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  // Tabs: 'notes' | 'voice'
  const [activeTab, setActiveTab] = useState('notes');

  // Notes state
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem(`practice_notes_${task.id}`) || '';
  });

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setNotes(val);
    localStorage.setItem(`practice_notes_${task.id}`, val);
  };

  const wordCount = notes.trim() === '' ? 0 : notes.trim().split(/\s+/).length;
  const charCount = notes.length;

  // Voice recorder state
  const [isRecording, setIsRecording] = useState(false);
  const [recordDuration, setRecordDuration] = useState(0);
  const [memos, setMemos] = useState([]);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      
      const chunks = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setMemos(prev => [
          ...prev, 
          { 
            id: Date.now(), 
            url, 
            name: `Practice memo ${prev.length + 1}`,
            duration: formatDuration(recordDuration)
          }
        ]);
        stream.getTracks().forEach(track => track.stop());
      };
      
      recorder.start();
      setIsRecording(true);
      setRecordDuration(0);
      
      timerRef.current = setInterval(() => {
        setRecordDuration(d => d + 1);
      }, 1000);

    } catch (err) {
      console.warn("Microphone not available, using simulated recording:", err);
      setIsRecording(true);
      setRecordDuration(0);
      timerRef.current = setInterval(() => {
        setRecordDuration(d => d + 1);
      }, 1000);
      
      mediaRecorderRef.current = {
        stop: () => {
          clearInterval(timerRef.current);
          setIsRecording(false);
          setMemos(prev => [
            ...prev,
            {
              id: Date.now(),
              url: null,
              name: `Practice memo ${prev.length + 1} (Simulated)`,
              duration: formatDuration(recordDuration)
            }
          ]);
        }
      };
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      clearInterval(timerRef.current);
      setIsRecording(false);
    }
  };

  const formatDuration = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <Modal
      title={`🎮 Mission Sprint: ${task.title}`}
      onClose={onClose}
      footer={
        <div style={{ display: 'flex', gap: '0.8rem', width: '100%', justifyContent: 'space-between' }}>
          <button className="secondary-btn" onClick={() => setActive(!active)}>
            {active ? 'Pause Sprint' : 'Start 10-Min Sprint'}
          </button>
          <button 
            className="primary-btn" 
            onClick={onComplete}
            disabled={secondsLeft > 0}
            style={{
              opacity: secondsLeft > 0 ? 0.25 : 1,
              pointerEvents: secondsLeft > 0 ? 'none' : 'auto',
              cursor: secondsLeft > 0 ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            Mark Mission Complete (+{task.xp || 35} XP)
          </button>
        </div>
      }
    >
      <div style={{ padding: '0.5rem 0' }}>
        <p style={{ color: 'var(--muted)', margin: '0 0 1rem', textAlign: 'center', fontSize: '0.9rem' }}>
          The goal is not to solve everything at once. Just commit <strong>10 minutes</strong> to build natural momentum!
        </p>

        {/* Dynamic resources inside sprint modal */}
        <div className="feature-card" style={{ marginBottom: '1rem', border: '1px solid rgba(118,245,255,0.3)', background: 'rgba(118,245,255,0.02)', textAlign: 'left', padding: '0.75rem 1rem' }}>
          <strong style={{ color: '#76f5ff', display: 'block', marginBottom: '0.4rem', fontSize: '0.88rem' }}>🎯 Suggested Study Materials for {task.goal || 'Focus Skill'}:</strong>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem' }}>
            <div>🎥 <b>Video:</b> <a href={resources.video} target="_blank" rel="noreferrer" style={{ color: '#8da9ff', textDecoration: 'none' }}>{resources.videoTitle} ↗</a></div>
            <div>📖 <b>Textbook:</b> <a href={resources.textbook} target="_blank" rel="noreferrer" style={{ color: '#8da9ff', textDecoration: 'none' }}>{resources.textbookTitle} ↗</a></div>
            <div>💻 <b>Tutorial:</b> <a href={resources.tutorial} target="_blank" rel="noreferrer" style={{ color: '#8da9ff', textDecoration: 'none' }}>{resources.tutorialTitle} ↗</a></div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '1rem 0' }}>
          <div 
            onClick={() => setSecondsLeft(0)} 
            style={{ fontSize: '3rem', fontWeight: 800, color: '#76f5ff', letterSpacing: '0.05em', fontFamily: 'monospace', lineHeight: 1, cursor: 'pointer' }}
            title="Click to skip timer for testing"
          >
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <p style={{ fontSize: '0.82rem', color: '#8da9ff', marginTop: '0.3rem', margin: 0 }}>
            {active ? '⚡ Sprint Active! Focus on the next immediate line or step.' : 'Press Start to begin your zero-pressure sprint.'}
          </p>
        </div>

        {/* Activities Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1rem', marginTop: '1.25rem' }}>
          <button 
            onClick={() => setActiveTab('notes')}
            style={{
              flex: 1,
              padding: '0.6rem',
              border: 'none',
              background: 'none',
              color: activeTab === 'notes' ? '#76f5ff' : 'var(--muted)',
              borderBottom: activeTab === 'notes' ? '2px solid #76f5ff' : 'none',
              fontWeight: activeTab === 'notes' ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📝 Practice Sheet
          </button>
          <button 
            onClick={() => setActiveTab('voice')}
            style={{
              flex: 1,
              padding: '0.6rem',
              border: 'none',
              background: 'none',
              color: activeTab === 'voice' ? '#76f5ff' : 'var(--muted)',
              borderBottom: activeTab === 'voice' ? '2px solid #76f5ff' : 'none',
              fontWeight: activeTab === 'voice' ? 'bold' : 'normal',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            🎙️ Voice Recorder
          </button>
        </div>

        {/* Notes Tab Content */}
        {activeTab === 'notes' && (
          <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>Practice Sheet Canvas</label>
              <span style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                Auto-saved
              </span>
            </div>
            <textarea
              placeholder="Jot down commands, prompts, pseudocode, or notes here..."
              value={notes}
              onChange={handleNotesChange}
              style={{
                width: '100%',
                height: '90px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '0.6rem 0.75rem',
                color: 'var(--text)',
                fontSize: '0.86rem',
                resize: 'none',
                fontFamily: 'monospace',
                outline: 'none'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.2rem' }}>
              <span>{wordCount} words | {charCount} characters</span>
            </div>
          </div>
        )}

        {/* Voice Tab Content */}
        {activeTab === 'voice' && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.25rem', marginBottom: '0.75rem' }}>
              {/* Record Button */}
              {!isRecording ? (
                <button 
                  onClick={startRecording}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#ef4444',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
                  }}
                  title="Start Recording"
                >
                  <span style={{ fontSize: '1.25rem', color: '#ffffff' }}>🎙️</span>
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#0f172a',
                    border: '2px solid #ef4444',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 0 12px rgba(239, 68, 68, 0.5)'
                  }}
                  title="Stop Recording"
                >
                  <div style={{ width: 12, height: 12, background: '#ef4444', borderRadius: 2 }} />
                </button>
              )}

              {/* Status and Visualizer */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: isRecording ? '#ef4444' : 'var(--muted)' }}>
                  {isRecording ? `🔴 RECORDING [ ${formatDuration(recordDuration)} ]` : 'Verbal Practice Mode'}
                </span>
                
                {/* CSS Animated Audio Waveform using pre-defined styles */}
                <div className="audio-wave-visualizer" style={{ display: 'flex', gap: 3, alignItems: 'center', height: 20, marginTop: 4 }}>
                  <div className="wave-bar" style={{ animationPlayState: isRecording ? 'running' : 'paused' }} />
                  <div className="wave-bar" style={{ animationPlayState: isRecording ? 'running' : 'paused' }} />
                  <div className="wave-bar" style={{ animationPlayState: isRecording ? 'running' : 'paused' }} />
                  <div className="wave-bar" style={{ animationPlayState: isRecording ? 'running' : 'paused' }} />
                  <div className="wave-bar" style={{ animationPlayState: isRecording ? 'running' : 'paused' }} />
                </div>
              </div>
            </div>

            {/* List of saved memos */}
            <div style={{ maxHeight: '90px', overflowY: 'auto', textAlign: 'left', paddingRight: '0.2rem' }}>
              {memos.length === 0 ? (
                <p style={{ fontStyle: 'italic', fontSize: '0.78rem', color: 'var(--muted)', textAlign: 'center', margin: '0.5rem 0' }}>
                  No voice notes recorded yet. Record your verbal summaries here.
                </p>
              ) : (
                <div style={{ display: 'grid', gap: '0.35rem' }}>
                  {memos.map(memo => (
                    <div 
                      key={memo.id} 
                      style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        background: 'var(--surface-soft)', 
                        padding: '0.35rem 0.5rem', 
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        fontSize: '0.78rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', minWidth: 0, flex: 1 }}>
                        <span style={{ fontSize: '0.85rem' }}>📻</span>
                        <span style={{ fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{memo.name}</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>({memo.duration})</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {memo.url ? (
                          <audio src={memo.url} controls style={{ height: 20, width: 110 }} />
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600 }}>🎙️ Saved</span>
                        )}
                        <button 
                          onClick={() => setMemos(prev => prev.filter(m => m.id !== memo.id))}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff7676',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            padding: '0 0.15rem'
                          }}
                          title="Delete Memo"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}

const SUB_TOPICS_MAP = {
  'Full Stack Development': [
    'Frontend Components & React Hooks',
    'REST API Routing & Express Server',
    'Database Schemas & Data Seeding'
  ],
  'Prompt Engineering': [
    'System Instructions & Prompt Roleplaying',
    'Few-Shot Priming & Output Formats',
    'Chain-of-Thought Reasonings & Tools'
  ],
  'Quantum Computing': [
    'Qubit Superpositions & States',
    'Quantum Gates (Hadamard, CNOT)',
    'Quantum Circuit Designing & Run'
  ],
  'AI & Machine Learning': [
    'Supervised Learning Algorithms',
    'Neural Network Training & Activation',
    'Model Performance Metrics & Plots'
  ],
  'Entrepreneurship': [
    'Customer Interviews & MVP Scopes',
    'Pitch Deck Structuring & Flow',
    'Traction & OKR Performance Checks'
  ],
  'Default': [
    'Core Syntax & Variables Setup',
    'Logic Controls & Conditional Branching',
    'Functional Coding & Testing'
  ]
};

function getSubTopicsForSkill(skillName) {
  if (!skillName) return SUB_TOPICS_MAP['Default'];
  const matchedKey = Object.keys(SUB_TOPICS_MAP).find(
    k => k.toLowerCase().includes(skillName.toLowerCase()) || skillName.toLowerCase().includes(k.toLowerCase())
  );
  return matchedKey ? SUB_TOPICS_MAP[matchedKey] : SUB_TOPICS_MAP['Default'];
}

function CompleteModal({ task, onManual, onClose, selectedAreas }) {
  const resources = getResourcesForSkill(task.goal || selectedAreas?.[0] || 'Default');
  const subTopics = getSubTopicsForSkill(task.goal || selectedAreas?.[0] || 'Default');

  const [checkedStates, setCheckedStates] = useState(() =>
    subTopics.map((_, i) => i === 0)
  );

  const handleToggle = (index) => {
    setCheckedStates(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const allCompleted = checkedStates.every(Boolean);

  return (
    <Modal title="🚀 Start Mission Control" onClose={onClose} footer={
      <>
        <button className="secondary-btn" onClick={onClose}>← Back</button>
        {allCompleted && (
          <button className="primary-btn" onClick={() => onManual(45)}>Claim Victory (+45 XP)</button>
        )}
      </>
    }>
      <p style={{ lineHeight: '1.5', color: 'var(--text)' }}>
        Ready to check off <strong>{task.title}</strong>? Connect a small present action to your near-future career momentum!
      </p>

      {/* Sub-topics Section */}
      <div className="feature-card" style={{ marginBottom: '1rem', border: '1px solid rgba(118, 245, 255, 0.4)', background: 'rgba(118, 245, 255, 0.04)', padding: '1rem' }}>
        <strong style={{ color: '#000000', display: 'block', marginBottom: '0.6rem', fontSize: '0.92rem', fontWeight: 800 }}>📋 Mission Sub-topics:</strong>
        <div style={{ display: 'grid', gap: '0.6rem', fontSize: '0.86rem' }}>
          {subTopics.map((topic, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <input 
                type="checkbox" 
                checked={checkedStates[i]} 
                onChange={() => handleToggle(i)} 
                style={{ accentColor: '#76f5ff', cursor: 'pointer', width: '16px', height: '16px' }} 
              />
              <span style={{ color: '#000000', fontWeight: 700 }}>{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic resources inside complete task modal */}
      <div className="feature-card" style={{ marginBottom: '0.5rem', border: '1px solid rgba(167, 139, 250, 0.3)', background: 'rgba(167, 139, 250, 0.05)', padding: '1rem' }}>
        <strong style={{ color: '#a78bfa', display: 'block', marginBottom: '0.6rem', fontSize: '0.92rem' }}>🎯 Mission Resources for {task.goal || 'Focus Skill'}:</strong>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.86rem' }}>
          <div>🎥 <b>Video Lesson:</b> <a href={resources.video} target="_blank" rel="noreferrer" style={{ color: '#76f5ff', textDecoration: 'none', fontWeight: 600 }}>{resources.videoTitle} ↗</a></div>
          <div>📖 <b>Textbook/Book:</b> <a href={resources.textbook} target="_blank" rel="noreferrer" style={{ color: '#76f5ff', textDecoration: 'none', fontWeight: 600 }}>{resources.textbookTitle} ↗</a></div>
          <div>💻 <b>Material Tutorial:</b> <a href={resources.tutorial} target="_blank" rel="noreferrer" style={{ color: '#76f5ff', textDecoration: 'none', fontWeight: 600 }}>{resources.tutorialTitle} ↗</a></div>
        </div>
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
        <p style={{ color: 'var(--text)' }}>
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

  function manualComplete(taskToComplete, customXP) {
    const task = taskToComplete || completeTask;
    const earnedXP = customXP !== undefined ? customXP : (task.xp || 30);
    update({
      tasks: state.tasks.map(t => t.id === task.id ? { ...t, completed: true, status: 'completed', priority: 'Mission Complete 🏆' } : t)
    });
    updateUser({ xp: (state.user.xp || 0) + earnedXP });
    setCompleteTask(null);
    setSprintTask(null);
    setXpModal({ task, xp: earnedXP });
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
          <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0' }}>
            Turn daily goals into levels, checkpoints, and boss challenges. Small present actions create big future progress.
          </p>
        </div>
        <button className="primary-btn" onClick={() => setShowAdd(true)}>+ New Mission 🚀</button>
      </div>

      {/* Gamified Mission Progress Tracker */}
      <div className="insight-card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="eyebrow" style={{ color: '#76f5ff' }}>MISSION PROGRESS</span>
            <h3 style={{ margin: '0.2rem 0' }}>{completedCount} of {totalCount} Missions Accomplished ({completionPercentage}%)</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
              "If you finish just 1 micro-step now, your afternoon workload becomes 50% easier."
            </p>
          </div>
          <div style={{ width: '180px', height: '10px', background: 'var(--border)', borderRadius: '10px', overflow: 'hidden' }}>
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
            const selectedAreas = state.selectedAreas || [];
            const resources = !isComplete ? getResourcesForSkill(task.goal || selectedAreas[0] || 'Default') : null;

            return (
              <article key={task.id} className={`task-card${isComplete ? ' completed' : ''}`} style={{ borderLeft: isBoss ? '4px solid #ff7676' : isComplete ? '4px solid #46ecb4' : '4px solid #5d8bff' }}>
                <header>
                  <div>
                    <div style={{ display: 'inline-block', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '6px', background: isBoss ? 'rgba(255,118,118,0.2)' : isComplete ? 'rgba(70,236,180,0.2)' : 'rgba(93,139,255,0.2)', color: isBoss ? '#ff7676' : isComplete ? '#46ecb4' : '#8da9ff', marginBottom: '0.4rem' }}>
                      {badge}
                    </div>
                    <strong style={{ fontSize: '1.05rem', display: 'block' }}>{task.title}</strong>
                    <p style={{ margin: '0.2rem 0 0', color: 'var(--muted)', fontSize: '0.88rem' }}>{task.goal}</p>
                  </div>
                  <button className={isComplete ? 'secondary-btn' : 'primary-btn'} onClick={() => !isComplete && handleComplete(task)}>
                    {isComplete ? '✓ Victory' : 'Start Mission'}
                  </button>
                </header>

                <div className="task-meta" style={{ marginTop: '1rem' }}>
                  <span>🕒 {task.time || '10 min'}</span>
                  <span>⏱️ {task.duration}</span>
                  <span style={{ color: '#76f5ff', fontWeight: 600 }}>+{task.xp || 30} XP</span>
                </div>

                {!isComplete && resources && (
                  <div className="task-resources" style={{ marginTop: '0.8rem', padding: '0.6rem 0.8rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 'bold', display: 'block', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>📚 SUGGESTED STUDY RESOURCES:</span>
                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', fontSize: '0.78rem' }}>
                      <a href={resources.video} target="_blank" rel="noreferrer" className="hover-brighten" style={{ color: '#76f5ff', textDecoration: 'none', fontWeight: 600 }}>{resources.videoTitle}</a>
                      <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                      <a href={resources.textbook} target="_blank" rel="noreferrer" className="hover-brighten" style={{ color: '#76f5ff', textDecoration: 'none', fontWeight: 600 }}>{resources.textbookTitle}</a>
                      <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
                      <a href={resources.tutorial} target="_blank" rel="noreferrer" className="hover-brighten" style={{ color: '#76f5ff', textDecoration: 'none', fontWeight: 600 }}>{resources.tutorialTitle}</a>
                    </div>
                  </div>
                )}

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
      {completeTask && <CompleteModal task={completeTask} onManual={(xp) => manualComplete(completeTask, xp)} onClose={() => setCompleteTask(null)} selectedAreas={state.selectedAreas} />}
      {sprintTask && <MissionSprintModal task={sprintTask} onComplete={() => manualComplete(sprintTask)} onClose={() => setSprintTask(null)} selectedAreas={state.selectedAreas} />}
      {xpModal && <XPModal task={xpModal.task} xp={xpModal.xp} onClose={() => setXpModal(null)} />}
    </div>
  );
}
