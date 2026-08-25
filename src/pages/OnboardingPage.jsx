import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const SKILL_ITEMS = [
  // Core Tech & AI
  { id: 'Full Stack Development', label: 'Full Stack Development', icon: '💻', tag: 'Core Tech' },
  { id: 'Prompt Engineering', label: 'Prompt Engineering', icon: '🤖', tag: 'AI Skill' },
  { id: 'Quantum Computing', label: 'Quantum Computing', icon: '⚛️', tag: 'Next-Gen' },
  { id: 'AI & Machine Learning', label: 'AI & Machine Learning', icon: '🧠', tag: 'AI Skill' },
  { id: 'Data Science', label: 'Data Science & Analytics', icon: '📊', tag: 'Tech' },
  { id: 'Cyber Security', label: 'Cyber Security', icon: '🛡️', tag: 'Tech' },
  { id: 'Cloud & DevOps', label: 'Cloud & DevOps', icon: '☁️', tag: 'Core Tech' },
  { id: 'Mobile App Development', label: 'Mobile App Dev', icon: '📱', tag: 'Tech' },
  { id: 'UI/UX Design', label: 'UI/UX Design', icon: '🎨', tag: 'Design' },
  { id: 'Blockchain', label: 'Blockchain & Web3', icon: '⛓️', tag: 'Next-Gen' },
  { id: 'Competitive Exams', label: 'Competitive Exams', icon: '📝', tag: 'Academics' },
  { id: 'Fitness & Health', label: 'Fitness & Health', icon: '🏋️', tag: 'Lifestyle' },
  { id: 'Finance & Investing', label: 'Finance & Investing', icon: '💰', tag: 'Lifestyle' },
  { id: 'Entrepreneurship', label: 'Startup & Business', icon: '🚀', tag: 'Business' },
  { id: 'Personal Growth', label: 'Personal Growth', icon: '🌱', tag: 'Lifestyle' },
  { id: 'Communication', label: 'Communication & Pitching', icon: '🗣️', tag: 'Business' },

  // 20 NEW HIGH-DEMAND SKILLS
  { id: 'LLM & Agentic AI', label: 'LLM & Agentic AI', icon: '🤖', tag: 'AI Skill' },
  { id: 'Generative AI & RAG', label: 'Generative AI & RAG', icon: '✨', tag: 'AI Skill' },
  { id: 'Frontend & React', label: 'Frontend & React.js', icon: '⚛️', tag: 'Core Tech' },
  { id: 'Backend & Microservices', label: 'Backend & Microservices', icon: '⚙️', tag: 'Core Tech' },
  { id: 'System Architecture', label: 'System Architecture', icon: '📐', tag: 'Engineering' },
  { id: 'Database & SQL/NoSQL', label: 'Database Engineering', icon: '🗄️', tag: 'Core Tech' },
  { id: 'API Design & GraphQL', label: 'API Design & GraphQL', icon: '🔌', tag: 'Core Tech' },
  { id: 'Data Engineering & ETL', label: 'Data Engineering', icon: '🔀', tag: 'Tech' },
  { id: 'Embedded Systems & IoT', label: 'Embedded Systems & IoT', icon: '🔌', tag: 'Next-Gen' },
  { id: 'Robotics & Automation', label: 'Robotics & Automation', icon: '🤖', tag: 'Next-Gen' },
  { id: 'AR/VR & Spatial Computing', label: 'AR/VR Spatial Computing', icon: '🥽', tag: 'Next-Gen' },
  { id: 'Game Development', label: 'Game Dev & Unity/Unreal', icon: '🎮', tag: 'Tech' },
  { id: 'Ethical Hacking', label: 'Ethical Hacking & PenTest', icon: '🔓', tag: 'Security' },
  { id: 'Deep Learning & Vision', label: 'Deep Learning & Vision', icon: '👁️', tag: 'AI Skill' },
  { id: 'NLP & Language Models', label: 'NLP & Language Models', icon: '💬', tag: 'AI Skill' },
  { id: 'Product Management', label: 'Product Management', icon: '📋', tag: 'Management' },
  { id: 'Digital Marketing & Growth', label: 'Digital Growth Marketing', icon: '📈', tag: 'Business' },
  { id: 'Public Speaking', label: 'Public Speaking & Keynotes', icon: '🎙️', tag: 'Leadership' },
  { id: 'Time Management', label: 'High Productivity & Habits', icon: '⏳', tag: 'Mindset' },
  { id: 'Executive Leadership', label: 'Executive Leadership', icon: '👑', tag: 'Leadership' },
];

const GOAL_ITEMS = [
  { id: 'Become a Full Stack Engineer', label: 'Become a Full Stack Engineer', icon: '💻', primarySkill: 'Full Stack Development' },
  { id: 'Become a Prompt Engineer & AI Architect', label: 'Become a Prompt Engineer & AI Architect', icon: '🤖', primarySkill: 'Prompt Engineering' },
  { id: 'Quantum Computing Specialist', label: 'Quantum Computing Specialist', icon: '⚛️', primarySkill: 'Quantum Computing' },
  { id: 'Become an AI Engineer', label: 'Become an AI Engineer', icon: '🧠', primarySkill: 'AI & Machine Learning' },
  { id: 'LLM Agentic Systems Specialist', label: 'LLM Agentic Systems Specialist', icon: '⚡', primarySkill: 'LLM & Agentic AI' },
  { id: 'Generative AI & RAG Architect', label: 'Generative AI & RAG Architect', icon: '✨', primarySkill: 'Generative AI & RAG' },
  { id: 'Senior Distributed System Architect', label: 'Senior System Architect', icon: '📐', primarySkill: 'System Architecture' },
  { id: 'Robotics & Automation Engineer', label: 'Robotics & Automation Engineer', icon: '🤖', primarySkill: 'Robotics & Automation' },
  { id: 'Ethical Hacker & Security Lead', label: 'Ethical Hacker & Security Lead', icon: '🛡️', primarySkill: 'Ethical Hacking' },
  { id: 'Lead Data & ML Engineer', label: 'Lead Data & ML Engineer', icon: '📊', primarySkill: 'Data Science' },
  { id: 'AR/VR Spatial Computing Developer', label: 'AR/VR Spatial Developer', icon: '🥽', primarySkill: 'AR/VR & Spatial Computing' },
  { id: 'Lead Technical Product Manager', label: 'Lead Technical Product Manager', icon: '📋', primarySkill: 'Product Management' },
  { id: 'Build & Launch a Tech Startup', label: 'Build & Launch a Tech Startup', icon: '🚀', primarySkill: 'Entrepreneurship' },
  { id: 'Crack UPSC / Competitive Exams', label: 'Crack UPSC / Competitive Exams', icon: '📝', primarySkill: 'Competitive Exams' },
  { id: 'Financial Independence & Wealth', label: 'Financial Independence & Wealth', icon: '💰', primarySkill: 'Finance & Investing' },
  { id: 'Peak Fitness & Mindset Mastery', label: 'Peak Fitness & Mindset Mastery', icon: '🏋️', primarySkill: 'Fitness & Health' },
];

const JOB_ROLES = [
  {
    title: 'Generative AI & Prompt Engineer',
    salary: '$140,000 - $210,000 / yr',
    skills: ['Prompt Engineering', 'LLM & Agentic AI', 'Generative AI & RAG', 'AI & Machine Learning'],
    matchScore: 98,
    demand: '🔥 High Demand',
  },
  {
    title: 'Senior Full Stack Engineer',
    salary: '$130,000 - $185,000 / yr',
    skills: ['Full Stack Development', 'Frontend & React', 'Backend & Microservices', 'API Design & GraphQL'],
    matchScore: 96,
    demand: '💼 Massive Demand',
  },
  {
    title: 'Quantum Software & Algorithm Engineer',
    salary: '$160,000 - $240,000 / yr',
    skills: ['Quantum Computing', 'AI & Machine Learning', 'System Architecture'],
    matchScore: 95,
    demand: '⚛️ Emerging Tech',
  },
  {
    title: 'AI Systems & LLM Architect',
    salary: '$155,000 - $225,000 / yr',
    skills: ['LLM & Agentic AI', 'System Architecture', 'Prompt Engineering', 'NLP & Language Models'],
    matchScore: 97,
    demand: '🔥 Top Tier Career',
  },
  {
    title: 'Cyber Security Architect & Ethical Hacker',
    salary: '$135,000 - $195,000 / yr',
    skills: ['Cyber Security', 'Ethical Hacking', 'Backend & Microservices'],
    matchScore: 94,
    demand: '🛡️ Critical Demand',
  },
  {
    title: 'Tech Startup Founder / CTO',
    salary: '$150,000 - $300,000+ / yr',
    skills: ['Entrepreneurship', 'Full Stack Development', 'Product Management', 'Executive Leadership'],
    matchScore: 99,
    demand: '🚀 High Growth',
  },
  {
    title: 'Data & Machine Learning Engineer',
    salary: '$145,000 - $205,000 / yr',
    skills: ['Data Science', 'Data Engineering & ETL', 'Deep Learning & Vision', 'Database & SQL/NoSQL'],
    matchScore: 95,
    demand: '📊 High Demand',
  },
  {
    title: 'Robotics & Automation Engineer',
    salary: '$130,000 - $190,000 / yr',
    skills: ['Robotics & Automation', 'Embedded Systems & IoT', 'AI & Machine Learning'],
    matchScore: 93,
    demand: '🤖 Future Tech',
  },
];

const CONNECTIONS = {
  'Full Stack Development': {
    connectedGoals: ['Become a Full Stack Engineer', 'Build & Launch a Tech Startup', 'Senior Distributed System Architect'],
    synergy: 'Provides end-to-end software architecture across frontend, backend, databases, and API development.',
    icon: '💻',
  },
  'Prompt Engineering': {
    connectedGoals: ['Become a Prompt Engineer & AI Architect', 'LLM Agentic Systems Specialist', 'Generative AI & RAG Architect'],
    synergy: 'Drives generative AI, agentic workflows, LLM orchestration, and intelligent system design.',
    icon: '🤖',
  },
  'Quantum Computing': {
    connectedGoals: ['Quantum Computing Specialist', 'Become an AI Engineer'],
    synergy: 'Unlocks quantum algorithms, qubits, cryptography breakthroughs, and next-gen physics simulation.',
    icon: '⚛️',
  },
  'AI & Machine Learning': {
    connectedGoals: ['Become an AI Engineer', 'Become a Prompt Engineer & AI Architect', 'Generative AI & RAG Architect'],
    synergy: 'Powers deep learning, neural networks, computer vision, and autonomous AI models.',
    icon: '🧠',
  },
  'LLM & Agentic AI': {
    connectedGoals: ['LLM Agentic Systems Specialist', 'Become a Prompt Engineer & AI Architect', 'Generative AI & RAG Architect'],
    synergy: 'Builds multi-agent AI systems, autonomous code execution agents, and complex reasoning pipelines.',
    icon: '🤖',
  },
  'Generative AI & RAG': {
    connectedGoals: ['Generative AI & RAG Architect', 'Become a Prompt Engineer & AI Architect'],
    synergy: 'Connects vector databases, embeddings, enterprise knowledge bases, and retrieval-augmented generation.',
    icon: '✨',
  },
  'Frontend & React': {
    connectedGoals: ['Become a Full Stack Engineer', 'Lead UI/UX & Product Design'],
    synergy: 'Creates sleek, responsive, and high-performance interactive user interfaces.',
    icon: '⚛️',
  },
  'Backend & Microservices': {
    connectedGoals: ['Become a Full Stack Engineer', 'Senior Distributed System Architect'],
    synergy: 'Architects scalable cloud APIs, microservices, and distributed data systems.',
    icon: '⚙️',
  },
  'System Architecture': {
    connectedGoals: ['Senior Distributed System Architect', 'Become a Full Stack Engineer'],
    synergy: 'Designs high-availability, fault-tolerant infrastructure and enterprise software platforms.',
    icon: '📐',
  },
  'Robotics & Automation': {
    connectedGoals: ['Robotics & Automation Engineer', 'Quantum Computing Specialist'],
    synergy: 'Combines hardware actuators, sensors, and AI algorithms for physical automation.',
    icon: '🤖',
  },
  'Ethical Hacking': {
    connectedGoals: ['Ethical Hacker & Security Lead', 'Become a Cyber Security Specialist'],
    synergy: 'Secures networks, performs penetration testing, and fortifies cyber defense mechanisms.',
    icon: '🔓',
  },
  'AR/VR & Spatial Computing': {
    connectedGoals: ['AR/VR Spatial Computing Developer', 'Build & Launch a Tech Startup'],
    synergy: 'Crafts 3D spatial computing environments, headset applications, and immersive media.',
    icon: '🥽',
  },
  'Data Science': {
    connectedGoals: ['Lead Data & ML Engineer', 'Become an AI Engineer'],
    synergy: 'Enables statistical modeling, big data pipelines, and predictive intelligence.',
    icon: '📊',
  },
  'Cyber Security': {
    connectedGoals: ['Ethical Hacker & Security Lead', 'Become a Full Stack Engineer'],
    synergy: 'Protects application architecture, secure cloud infrastructure, and network protocols.',
    icon: '🛡️',
  },
  'Cloud & DevOps': {
    connectedGoals: ['Become a Full Stack Engineer', 'Senior Distributed System Architect'],
    synergy: 'Automates CI/CD deployment pipelines, microservices, and serverless infrastructure.',
    icon: '☁️',
  },
  'Mobile App Development': {
    connectedGoals: ['Become a Full Stack Engineer', 'Build & Launch a Tech Startup'],
    synergy: 'Builds responsive mobile user experiences for iOS and Android ecosystems.',
    icon: '📱',
  },
  'UI/UX Design': {
    connectedGoals: ['Lead UI/UX & Product Design', 'Become a Full Stack Engineer'],
    synergy: 'Crafts visually appealing, accessible, and high-converting product interfaces.',
    icon: '🎨',
  },
  'Blockchain': {
    connectedGoals: ['Build & Launch a Tech Startup', 'Become a Full Stack Engineer'],
    synergy: 'Powers decentralized smart contracts, Web3 protocols, and distributed ledgers.',
    icon: '⛓️',
  },
  'Competitive Exams': {
    connectedGoals: ['Crack UPSC / Competitive Exams'],
    synergy: 'Structures syllabus coverage, revision timetables, and mock test analytical practice.',
    icon: '📝',
  },
  'Fitness & Health': {
    connectedGoals: ['Peak Fitness & Mindset Mastery'],
    synergy: 'Sustains physical energy, mental clarity, and consistent executive focus.',
    icon: '🏋️',
  },
};

const TIME_SUGGESTIONS = [
  '30 Minutes',
  '45 Minutes',
  '1 Hour',
  '1.5 Hours',
  '2 Hours',
  '2.5 Hours',
  '3 Hours',
  '4 Hours',
  '5 Hours',
  '6+ Hours',
  '8 Hours (Full Time)',
];

const STEP_TITLES = { 1: 'ABOUT YOU', 2: 'WHAT MATTERS MOST TO YOU (36 SKILLS)', 3: 'WHAT FUTURE ARE YOU BUILDING (GOALS & JOBS)', 4: 'AVAILABLE TIME', 5: 'LIFE OS CREATION' };

export default function OnboardingPage({ onComplete }) {
  const { state, update, updateUser } = useApp();
  const [step, setStep] = useState(1);
  const [form1, setForm1] = useState({ name: state.user?.name || '', age: state.user?.age || '', profession: state.user?.profession || 'Student' });
  const [selectedAreas, setSelectedAreas] = useState(['Full Stack Development', 'Prompt Engineering', 'Quantum Computing', 'LLM & Agentic AI', 'Generative AI & RAG']);
  const [selectedGoal, setSelectedGoal] = useState('Become a Prompt Engineer & AI Architect');
  const [customGoal, setCustomGoal] = useState('');
  const [selectedTime, setSelectedTime] = useState('2 Hours');
  const [timeQuery, setTimeQuery] = useState('');
  const [selectedSlots, setSelectedSlots] = useState(['Morning', 'Evening']);
  const [buildDone, setBuildDone] = useState(false);

  // Step 5: simulate build progress
  useEffect(() => {
    if (step === 5) {
      const t = setTimeout(() => setBuildDone(true), 2500);
      return () => clearTimeout(t);
    }
  }, [step]);

  function toggleArea(areaId) {
    setSelectedAreas(prev => {
      if (prev.includes(areaId)) return prev.filter(a => a !== areaId);
      if (prev.length >= 5) return prev;
      return [...prev, areaId];
    });
  }

  function applyPreset(presetSkills) {
    setSelectedAreas(presetSkills);
  }

  function toggleSlot(slot) {
    setSelectedSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  }

  function handleStep1() {
    if (!form1.name || !form1.age) return;
    updateUser({ name: form1.name, age: form1.age, profession: form1.profession });
    setStep(2);
  }

  function handleStep2() {
    if (selectedAreas.length === 0) return;
    update({ selectedAreas });
    if (!selectedGoal) {
      const firstSkill = selectedAreas[0];
      const match = CONNECTIONS[firstSkill]?.connectedGoals[0];
      if (match) setSelectedGoal(match);
    }
    setStep(3);
  }

  function handleStep3() {
    const goal = customGoal || selectedGoal || 'Become a Prompt Engineer & AI Architect';
    update({ mainGoal: goal });
    updateUser({ mainGoal: goal });
    setStep(4);
  }

  function handleStep4() {
    if (!selectedTime || selectedSlots.length === 0) return;
    update({ selectedTime, timeslots: selectedSlots });
    setStep(5);
  }

  function handleFinalize() {
    update({ onboardingComplete: true });
    onComplete();
  }

  // Calculate connected goals for selected areas
  const connectedGoalIds = new Set();
  selectedAreas.forEach(area => {
    const conn = CONNECTIONS[area];
    if (conn) {
      conn.connectedGoals.forEach(g => connectedGoalIds.add(g));
    }
  });

  // Filter job roles connected to user's selected skills
  const unlockedJobs = JOB_ROLES.filter(job =>
    job.skills.some(skill => selectedAreas.includes(skill))
  );
  const displayJobs = unlockedJobs.length > 0 ? unlockedJobs : JOB_ROLES.slice(0, 4);

  return (
    <div className="onboarding-page">
      <div className="onboarding-shell">
        <header className="onboard-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="eyebrow">Step {step} / 5</span>
            {step > 1 && (
              <button type="button" className="back-btn" onClick={() => setStep(prev => prev - 1)}>
                ← Back
              </button>
            )}
          </div>
          <h2 style={{ margin: 0 }}>{STEP_TITLES[step]}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
            {step === 1 && 'Tell us the basics so LIFORA can personalize your Life OS.'}
            {step === 2 && 'Select up to 5 priority skills out of 36 high-demand domains.'}
            {step === 3 && 'Discover target goals and high-paying jobs unlocked by your selected skills.'}
            {step === 4 && 'How much time can you invest every day to build your skills & goals?'}
            {step === 5 && 'Connecting skills, goals & job paths to synthesize your personalized Life OS...'}
          </p>
        </header>

        {/* Step 1 */}
        {step === 1 && (
          <div className="onboard-card">
            <label>Name</label>
            <input className="onboard-input" type="text" placeholder="Asmitha" value={form1.name} onChange={e => setForm1(f => ({ ...f, name: e.target.value }))} />
            <label>Age</label>
            <input className="onboard-input" type="number" placeholder="21" min="14" max="100" value={form1.age} onChange={e => setForm1(f => ({ ...f, age: e.target.value }))} />
            <label>Profession</label>
            <select className="onboard-input" value={form1.profession} onChange={e => setForm1(f => ({ ...f, profession: e.target.value }))}>
              <option>Student</option>
              <option>Employee</option>
              <option>Entrepreneur</option>
              <option>Freelancer</option>
              <option>Job Seeker</option>
              <option>Other</option>
            </select>
            <button className="primary-btn full" onClick={handleStep1}>Continue to Skills →</button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="onboard-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>What matters most to you?</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.2rem 0 0', fontSize: '0.88rem' }}>
                  Select up to 5 priority skills (36 available tech & life domains).
                </p>
              </div>
              <span className="selection-note" style={{ fontWeight: 700, color: '#76f5ff', fontSize: '0.95rem' }}>
                {selectedAreas.length} / 5 Selected
              </span>
            </div>

            {/* Quick Presets */}
            <div className="quick-preset-row">
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Popular Skill Stacks:</span>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['Full Stack Development', 'Prompt Engineering', 'Quantum Computing', 'LLM & Agentic AI', 'Generative AI & RAG'])}>
                ⚡ Next-Gen AI & Tech Stack
              </button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['Full Stack Development', 'Frontend & React', 'Backend & Microservices', 'Cloud & DevOps', 'Database & SQL/NoSQL'])}>
                💻 Full Stack Engineering
              </button>
              <button type="button" className="preset-btn" onClick={() => applyPreset(['Cyber Security', 'Ethical Hacking', 'System Architecture', 'Cloud & DevOps', 'Backend & Microservices'])}>
                🛡️ Cyber Defense
              </button>
            </div>

            <div className="tag-grid" style={{ maxHeight: '420px', overflowY: 'auto', paddingRight: '0.2rem' }}>
              {SKILL_ITEMS.map(item => {
                const isActive = selectedAreas.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`tag-card${isActive ? ' active' : ''}`}
                    onClick={() => toggleArea(item.id)}
                  >
                    <div className="tag-card-content">
                      <span className="tag-icon">{item.icon}</span>
                      <span className="tag-label">{item.label}</span>
                      <span style={{ fontSize: '0.72rem', color: isActive ? '#76f5ff' : 'rgba(255,255,255,0.5)' }}>
                        {item.tag}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" className="back-btn" onClick={() => setStep(1)}>
                ← Back
              </button>
              <button className="primary-btn full" onClick={handleStep2} disabled={selectedAreas.length === 0}>
                Connect Skills to Goals & Jobs →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="onboard-card">
            <h3 style={{ margin: 0 }}>What future are you building?</h3>

            {/* Skill Connection Banner */}
            <div className="connection-banner">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>⚡</span>
                <strong style={{ color: '#eef3ff', fontSize: '0.95rem' }}>
                  Connected to your top selections from &ldquo;What matters most to you&rdquo;:
                </strong>
              </div>
              <div className="connection-skills-row">
                {selectedAreas.map(area => {
                  const conn = CONNECTIONS[area];
                  return (
                    <span key={area} className="connected-skill-chip">
                      <span>{conn?.icon || '⭐'}</span> {area}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Goal Selection Grid */}
            <h4 style={{ margin: '0.5rem 0 0', color: '#c3d1ff' }}>Target Future Goals:</h4>
            <div className="goal-grid">
              {GOAL_ITEMS.map(goal => {
                const isSelected = (customGoal ? customGoal === goal.id : selectedGoal === goal.id);
                const isConnected = connectedGoalIds.has(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    className={`tag-card${isSelected ? ' active' : ''}${isConnected ? ' goal-card-connected' : ''}`}
                    onClick={() => { setSelectedGoal(goal.id); setCustomGoal(''); }}
                  >
                    <div className="tag-card-content">
                      {isConnected && (
                        <span className="connected-badge">
                          ⚡ Skill Connected
                        </span>
                      )}
                      <span className="tag-icon">{goal.icon}</span>
                      <span className="tag-label">{goal.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Skills-to-Jobs Connection Feature */}
            <div className="jobs-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.25rem' }}>💼</span>
                  <strong style={{ fontSize: '1rem', color: '#76f5ff' }}>
                    Job Roles & Careers Unlocked by Your Selected Skills:
                  </strong>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
                  Market Demand & Compensation
                </span>
              </div>

              <div className="jobs-grid">
                {displayJobs.map(job => (
                  <div key={job.title} className="job-card">
                    <div>
                      <div className="job-card-head">
                        <h5 className="job-title">{job.title}</h5>
                        <span className="job-match">{job.matchScore}% Match</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#8da9ff', display: 'block', marginTop: '0.2rem' }}>
                        {job.demand}
                      </span>
                    </div>

                    <div className="job-salary">
                      💰 {job.salary}
                    </div>

                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.3rem' }}>
                        Matching Skills:
                      </span>
                      <div className="job-skills-list">
                        {job.skills.map(s => (
                          <span key={s} className="job-skill-badge" style={{ borderColor: selectedAreas.includes(s) ? '#76f5ff' : 'transparent', color: selectedAreas.includes(s) ? '#76f5ff' : '#b5c7ff' }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skill-to-Goal Synergy Connection Explanation Box */}
            {selectedGoal && (
              <div className="synergy-box">
                <div className="synergy-title">
                  <span>🔗 SKILLS TO GOAL CONNECTION SYNERGY</span>
                </div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                  Your top skills (<b>{selectedAreas.slice(0, 3).join(', ')}</b>) form a direct roadmap to achieve <b>&ldquo;{selectedGoal}&rdquo;</b>.
                </p>
                <div style={{ display: 'grid', gap: '0.4rem' }}>
                  {selectedAreas.slice(0, 3).map(area => {
                    const conn = CONNECTIONS[area];
                    return (
                      <div key={area} style={{ fontSize: '0.85rem', color: '#c3d1ff', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span>{conn?.icon || '⚡'}</span>
                        <span><b>{area}:</b> {conn?.synergy || 'Directly accelerates your goal roadmap.'}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <label style={{ marginTop: '0.5rem' }}>Or write your custom future goal</label>
            <input
              className="onboard-input"
              type="text"
              placeholder="e.g. Master Full Stack + Prompt Engineering & Quantum AI"
              value={customGoal}
              onChange={e => setCustomGoal(e.target.value)}
            />
            
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button type="button" className="back-btn" onClick={() => setStep(2)}>
                ← Back
              </button>
              <button className="primary-btn full" onClick={handleStep3}>
                Continue to Daily Schedule →
              </button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="onboard-card">
            <h3 style={{ margin: 0 }}>How much time can you invest every day?</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '0.2rem 0 0', fontSize: '0.88rem' }}>
              Search or type your daily available time commitment.
            </p>

            {/* Time Search Bar */}
            <div style={{ display: 'grid', gap: '0.4rem', marginTop: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#76f5ff', fontWeight: 600 }}>
                🔍 Search or Enter Daily Available Time:
              </label>
              <input
                className="onboard-input"
                type="search"
                placeholder="Type or search available time (e.g. 2 Hours, 45 Mins, 3.5 Hours)..."
                value={timeQuery || selectedTime}
                onChange={e => {
                  setTimeQuery(e.target.value);
                  setSelectedTime(e.target.value);
                }}
              />
            </div>

            {/* Dynamic Filtered Search Suggestions */}
            <div>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '0.4rem' }}>
                Search Suggestions / Quick Select:
              </span>
              <div className="availability-grid">
                {TIME_SUGGESTIONS.filter(t => t.toLowerCase().includes((timeQuery || '').toLowerCase())).map(t => (
                  <button
                    key={t}
                    type="button"
                    className={`pill-card${selectedTime === t ? ' active' : ''}`}
                    onClick={() => {
                      setSelectedTime(t);
                      setTimeQuery(t);
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <h4 style={{ margin: '0.75rem 0 0' }}>Preferred time slots</h4>
            <div className="availability-grid">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map(s => (
                <button key={s} type="button" className={`pill-card${selectedSlots.includes(s) ? ' active' : ''}`} onClick={() => toggleSlot(s)}>{s}</button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <button type="button" className="back-btn" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button className="primary-btn full" onClick={handleStep4} disabled={!selectedTime || selectedSlots.length === 0}>
                Synthesize Life OS →
              </button>
            </div>
          </div>
        )}

        {/* Step 5 */}
        {step === 5 && (
          <div className="onboard-card">
            <div className="building-shell">
              <div className="building-ring" />
              <div className="building-copy" style={{ textAlign: 'center' }}>
                <span className="eyebrow">Building your Life OS...</span>
                <h3 style={{ margin: '0.5rem 0' }}>Synthesizing 36 skills, goal connections & job career pathways.</h3>
                <div className="build-tasks">
                  <p>✓ Connected skills: {selectedAreas.join(', ')}</p>
                  <p>✓ Mapped connection to goal: {customGoal || selectedGoal}</p>
                  <p>✓ Unlocked career job pathways with target salaries...</p>
                  <p>✓ Activating LIFORA AI Coach...</p>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <button type="button" className="back-btn" onClick={() => setStep(4)}>
                ← Back
              </button>
              {buildDone && (
                <button className="primary-btn full" onClick={handleFinalize}>Enter My Life OS</button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
