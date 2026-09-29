import { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';

// Proof-of-Work Tasks configuration for each skill
const POW_QUESTS = {
  python: {
    question: "Fix the syntax error in this Python function by typing the missing character:",
    codeBefore: "def calculate_xp(sprints)",
    codeAfter: "  return sprints * 45",
    expectedInput: ":",
    hint: "Functions in Python require a colon (:) at the end of the definition.",
    quizQ: "Which keyword is used to define functions in Python?",
    quizOptions: ["function", "def", "func", "define"],
    quizAnswer: 1
  },
  java: {
    question: "Fix the compilation error in this Java statement by typing the missing symbol:",
    codeBefore: 'System.out.println("Skill Level Up")',
    codeAfter: "",
    expectedInput: ";",
    hint: "All statements in Java must end with a semicolon (;).",
    quizQ: "Which Java data type is best suited to store a single character?",
    quizOptions: ["String", "char", "boolean", "int"],
    quizAnswer: 1
  },
  html: {
    question: "Fix the malformed tag in this HTML snippet by typing the correct closing tag:",
    codeBefore: "<h1>🌌 Skill Galaxy",
    codeAfter: "",
    expectedInput: "</h1>",
    hint: "HTML tags must be closed properly with an angle bracket slash syntax.",
    quizQ: "Which HTML tag is used to create a hyperlink?",
    quizOptions: ["<link>", "<a>", "<href>", "<nav>"],
    quizAnswer: 1
  },
  communication: {
    question: "Type the active word that completes this essential pitch framework: 'Hook, Problem, _______, Call to Action'.",
    codeBefore: "Your pitch requires a clear: ",
    codeAfter: "",
    expectedInput: "solution",
    hint: "Every business or personal pitch presents a hook, defines a problem, outlines the 'solution', and prompts action.",
    quizQ: "Which behavior is crucial for effective collaboration & leadership?",
    quizOptions: ["Speaking constantly", "Active listening & empathy", "Interrupting others", "Avoiding eye contact"],
    quizAnswer: 1
  },
  ai: {
    question: "Complete the name of this standard machine learning model abbreviation: Neural ________ (type the missing word):",
    codeBefore: "Model Type: Artificial ",
    codeAfter: "",
    expectedInput: "network",
    hint: "Models inspired by human brain synapses are artificial neural networks (plural or singular).",
    quizQ: "What does 'RAG' stand for in Generative AI architectures?",
    quizOptions: ["Random Access Gradient", "Retrieval-Augmented Generation", "Reinforcement Action Gate", "Robotic Auto Guide"],
    quizAnswer: 1
  },
  business: {
    question: "Type the missing abbreviation for a basic startup prototype version that validates early ideas: Minimum Viable Product (____)",
    codeBefore: "Startup checkpoint: Build the ",
    codeAfter: "",
    expectedInput: "mvp",
    hint: "It stands for Minimum Viable Product - the smallest functional build.",
    quizQ: "What is the term for adapting a startup's strategy based on early market feedback?",
    quizOptions: ["Scaling", "Funding", "Pivot", "Sourcing"],
    quizAnswer: 2
  }
};

const CAREER_STARS = [
  { name: 'Senior AI Engineer', x: '15%', y: '15%', desc: 'Requires Python, AI & ML Level 4+' },
  { name: 'Full Stack Tech Founder', x: '82%', y: '12%', desc: 'Requires HTML/CSS, Business Level 4+' },
  { name: 'Lead System Architect', x: '18%', y: '82%', desc: 'Requires Java, Python Level 4+' },
  { name: 'Product Director', x: '85%', y: '85%', desc: 'Requires Business, Communication Level 4+' }
];

export default function SkillGalaxyPage() {
  const { state, update, updateUser } = useApp();
  const [selectedPlanet, setSelectedPlanet] = useState('python');
  
  // Interactive console states
  const [powMode, setPowMode] = useState('code'); // code | quiz
  const [powInput, setPowInput] = useState('');
  const [selectedQuizOption, setSelectedQuizOption] = useState(null);
  const [powFeedback, setPowFeedback] = useState(null);
  
  // Animation states
  const [launchingRocket, setLaunchingRocket] = useState(false);
  const [particles, setParticles] = useState([]);
  const [achievement, setAchievement] = useState(null);
  const [streakClicks, setStreakClicks] = useState(0);

  const mapRef = useRef(null);

  const skills = state.skillsData || [];
  const activeSkill = skills.find(s => s.id === selectedPlanet) || skills[0];
  const quest = POW_QUESTS[selectedPlanet];

  // Reset inputs when switching planets
  useEffect(() => {
    setPowInput('');
    setSelectedQuizOption(null);
    setPowFeedback(null);
  }, [selectedPlanet]);

  // Calculate average skill progress for the Growth Tree
  const totalLevels = skills.reduce((sum, s) => sum + s.level, 0);
  const maxPossibleLevels = skills.length * 5;
  const growthFactor = maxPossibleLevels > 0 ? (totalLevels / maxPossibleLevels) : 0.5;

  // Particle burst generator (Brain -> Knowledge & progress milestone particles)
  function createParticles(x, y, count = 12) {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 40 + Math.random() * 80;
      newParticles.push({
        id: Math.random(),
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        left: x,
        top: y
      });
    }
    setParticles(prev => [...prev, ...newParticles]);
    // Clear particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.includes(p)));
    }, 1500);
  }

  // Handle Proof-of-Work Code Submission
  function submitPOWCode() {
    if (!powInput) return;
    const cleanInput = powInput.trim().toLowerCase();
    const cleanExpected = quest.expectedInput.toLowerCase();

    if (cleanInput === cleanExpected) {
      setPowFeedback({ success: true, message: `✓ Proof-of-Work Confirmed! Correct code syntax verified.` });
      triggerReward();
    } else {
      setPowFeedback({ success: false, message: `❌ Error: Incorrect output. Hint: ${quest.hint}` });
    }
  }

  // Handle Proof-of-Work Quiz Option Selection
  function selectQuizOption(index) {
    setSelectedQuizOption(index);
    if (index === quest.quizAnswer) {
      setPowFeedback({ success: true, message: `✓ Correct Concept! Your understanding is validated.` });
      triggerReward();
    } else {
      setPowFeedback({ success: false, message: `❌ Incorrect. Review your skill material and try again.` });
    }
  }

  // Trigger XP award, Level Up, Star particles, and Achievements
  function triggerReward() {
    // Generate particle explosion near the selected planet's position
    const planetCoordinates = {
      python: { x: '22%', y: '25%' },
      java: { x: '78%', y: '30%' },
      html: { x: '28%', y: '72%' },
      communication: { x: '72%', y: '68%' },
      ai: { x: '50%', y: '20%' },
      business: { x: '50%', y: '78%' }
    };
    const coord = planetCoordinates[selectedPlanet] || { x: '50%', y: '50%' };
    createParticles(coord.x, coord.y, 16);

    // Update global state: award XP & update skill progression
    const xpAward = 45;
    updateUser({ xp: state.user.xp + xpAward });

    let leveledUp = false;
    const updatedSkills = skills.map(s => {
      if (s.id === selectedPlanet) {
        const nextXp = s.xp + 35;
        if (nextXp >= 100 && s.level < 5) {
          leveledUp = true;
          return { ...s, level: s.level + 1, xp: nextXp - 100 };
        }
        return { ...s, xp: Math.min(nextXp, 100) };
      }
      return s;
    });

    update({ skillsData: updatedSkills });

    // Achievement unlock popup if leveled up
    if (leveledUp) {
      const badgeTitles = {
        python: 'Python Orbit Master 🏆',
        java: 'Java Synapse Core 🏆',
        html: 'Web Design Nebula 🏆',
        communication: 'Communicator Beacon 🏆',
        ai: 'Cognitive Starflight 🏆',
        business: 'Startup Warp Speed 🏆'
      };
      setAchievement({
        title: `Planet Evolved!`,
        badgeName: badgeTitles[selectedPlanet] || 'Skill Explorer Badge 🏆',
        skillName: activeSkill.name
      });
      setTimeout(() => setAchievement(null), 3800);
    }
  }

  // Rocket launch trigger
  function launchRocket() {
    if (launchingRocket) return;
    setLaunchingRocket(true);
    updateUser({ xp: state.user.xp + 20 });
    setTimeout(() => {
      setLaunchingRocket(false);
    }, 2600);
  }

  // Streak calibration spark animation
  function clickStreak() {
    setStreakClicks(c => c + 1);
    createParticles('88%', '5%', 6);
  }

  // Planet placement definitions
  const PLANET_LAYOUTS = {
    python: { left: '22%', top: '25%', sizeMultiplier: 1.1 },
    java: { left: '78%', top: '30%', sizeMultiplier: 0.95 },
    html: { left: '28%', top: '72%', sizeMultiplier: 1.2 },
    communication: { left: '72%', top: '68%', sizeMultiplier: 1.05 },
    ai: { left: '50%', top: '20%', sizeMultiplier: 0.9 },
    business: { left: '50%', top: '78%', sizeMultiplier: 1.0 }
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="eyebrow">Interactive Space Academy</span>
          <h2 style={{ margin: 0 }}>🌌 Career Skill Galaxy</h2>
          <p style={{ color: 'var(--muted)', margin: '0.2rem 0 0', fontSize: '0.9rem' }}>
            Interactive Proof-of-Work quests. Complete challenges to level up planets and grow your Career tree.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
          {/* Flame streak widget */}
          <div className="streak-flame-container" onClick={clickStreak} style={{ cursor: 'pointer' }}>
            <span className="streak-flame">🔥</span>
            <strong style={{ color: '#ff6b6b' }}>{state.user.streak} Day Streak!</strong>
          </div>
          
          <button className="primary-btn" onClick={launchRocket} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🚀 Deploy Daily Mission
          </button>
        </div>
      </div>

      {/* Main Galaxy Arena Layout */}
      <div className="galaxy-container">
        {/* Stellar Map Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="galaxy-map" ref={mapRef}>
            <div className="galaxy-stars" />
            
            {/* Knowledge Central Core */}
            <div className="galaxy-center">
              <span style={{ fontSize: '1.2rem' }}>🧠</span>
              <span>LIFORA</span>
              <span style={{ fontSize: '0.65rem', color: '#76f5ff' }}>CORE</span>
            </div>

            {/* Orbit paths visual lines */}
            <div className="orbit-path" style={{ width: '190px', height: '190px' }} />
            <div className="orbit-path" style={{ width: '310px', height: '310px' }} />
            <div className="orbit-path" style={{ width: '420px', height: '420px' }} />

            {/* Constellation Linkage map mapping long term goals */}
            <svg className="galaxy-constellation">
              {/* Python to Senior AI Engineer */}
              <line x1="22%" y1="25%" x2="15%" y2="15%" stroke="rgba(118, 245, 255, 0.15)" strokeWidth="1.5" />
              {/* AI & ML to Senior AI Engineer */}
              <line x1="50%" y1="20%" x2="15%" y2="15%" stroke="rgba(118, 245, 255, 0.15)" strokeWidth="1.5" />
              {/* HTML/CSS to Full Stack Founder */}
              <line x1="28%" y1="72%" x2="82%" y2="12%" stroke="rgba(118, 245, 255, 0.15)" strokeWidth="1.5" />
              {/* Business to Full Stack Founder */}
              <line x1="50%" y1="78%" x2="82%" y2="12%" stroke="rgba(118, 245, 255, 0.15)" strokeWidth="1.5" />
            </svg>

            {/* Career Goals Stars nodes */}
            {CAREER_STARS.map(star => (
              <div 
                key={star.name} 
                className="career-node" 
                style={{ left: star.x, top: star.y }}
                title={star.desc}
              >
                <div className="career-star-label">🌌 {star.name}</div>
              </div>
            ))}

            {/* Skills topics rendering (replacing planets) */}
            {skills.map(item => {
              const layout = PLANET_LAYOUTS[item.id] || { left: '50%', top: '50%', sizeMultiplier: 1.0 };
              const isActive = selectedPlanet === item.id;
              
              // Check if the user selected this topic in onboarding / focus areas
              const isSelectedTopic = state.selectedAreas?.includes(item.name) || 
                                      state.selectedAreas?.includes(item.id) || 
                                      (item.id === 'ai' && state.selectedAreas?.includes('AI & ML')) ||
                                      (item.id === 'ai' && state.selectedAreas?.includes('AI & Machine Learning')) ||
                                      (item.id === 'business' && state.selectedAreas?.includes('Entrepreneurship')) ||
                                      (item.id === 'html' && state.selectedAreas?.includes('HTML & CSS'));

              return (
                <div 
                  key={item.id}
                  className={`topic-wrapper${isActive ? ' active' : ''}${isSelectedTopic ? ' user-selected-topic' : ''}`}
                  style={{ left: layout.left, top: layout.top }}
                  onClick={() => setSelectedPlanet(item.id)}
                >
                  <div 
                    className="topic-visual-card"
                    style={{
                      border: isActive ? '2px solid #76f5ff' : isSelectedTopic ? '2px dashed #a78bfa' : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: isActive ? '0 0 25px rgba(118,245,255,0.4)' : isSelectedTopic ? '0 0 15px rgba(167,139,250,0.2)' : 'none'
                    }}
                  >
                    {/* Unique Animated Picture / Visual related to the topic */}
                    <div className={`topic-anim-picture topic-${item.id}`}>
                      {item.id === 'python' && (
                        <div className="python-anim">
                          <span className="python-snake">🐍</span>
                          <div className="code-dots"><span/><span/><span/></div>
                        </div>
                      )}
                      {item.id === 'java' && (
                        <div className="java-anim">
                          <span className="steam-particle s1">~</span>
                          <span className="steam-particle s2">~</span>
                          <span className="coffee-cup">☕</span>
                        </div>
                      )}
                      {item.id === 'html' && (
                        <div className="html-anim">
                          <span className="palette">🎨</span>
                          <span className="sparkle star1">✦</span>
                          <span className="sparkle star2">✦</span>
                        </div>
                      )}
                      {item.id === 'communication' && (
                        <div className="comm-anim">
                          <div className="wave wave1" />
                          <div className="wave wave2" />
                          <span className="chat-bubble">🗣️</span>
                        </div>
                      )}
                      {item.id === 'ai' && (
                        <div className="ai-anim">
                          <span className="brain-core">🧠</span>
                          <div className="synapse-node n1" />
                          <div className="synapse-node n2" />
                          <div className="synapse-node n3" />
                        </div>
                      )}
                      {item.id === 'business' && (
                        <div className="business-anim">
                          <span className="rocket-icon">🚀</span>
                          <span className="flame-trail">🔥</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="topic-name-label">
                    {item.name} {isSelectedTopic && '⭐'}
                  </span>
                </div>
              );
            })}

            {/* Particle Effects Layer */}
            {particles.map(p => (
              <span
                key={p.id}
                className="particle"
                style={{
                  left: p.left,
                  top: p.top,
                  '--x': `${p.x}px`,
                  '--y': `${p.y}px`,
                  color: '#fffb00'
                }}
              >
                ✦
              </span>
            ))}
          </div>
        </div>

        {/* Quest Console & Growth Tree Panel Side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {/* 🌱 Growth Tree widget */}
          <div className="growth-tree-container">
            <span className="eyebrow" style={{ color: '#5dffb5', letterSpacing: '0.05em' }}>🌱 Growth Tree Progress</span>
            <svg viewBox="0 0 100 100" style={{ width: '130px', height: '130px', overflow: 'visible' }}>
              {/* Dynamic growing tree SVG layout */}
              {/* Trunk */}
              <line x1="50" y1="95" x2="50" y2={95 - (growthFactor * 45)} stroke="#8b5a2b" strokeWidth="5" strokeLinecap="round" />
              {/* Left Branch */}
              {growthFactor >= 0.3 && (
                <path 
                  d={`M 50 ${95 - (growthFactor * 25)} Q 35 ${85 - (growthFactor * 30)} 30 ${75 - (growthFactor * 30)}`} 
                  fill="none" 
                  stroke="#8b5a2b" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  className="tree-branch"
                />
              )}
              {/* Right Branch */}
              {growthFactor >= 0.5 && (
                <path 
                  d={`M 50 ${95 - (growthFactor * 35)} Q 65 ${80 - (growthFactor * 40)} 70 ${68 - (growthFactor * 40)}`} 
                  fill="none" 
                  stroke="#8b5a2b" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  className="tree-branch"
                />
              )}
              
              {/* Tree leaves scales dynamically with growthFactor */}
              {/* Left leaf */}
              {growthFactor >= 0.4 && (
                <path 
                  d="M 30 75 Q 18 68 30 62 Q 42 68 30 75 Z" 
                  fill="#4ade80" 
                  className="tree-leaf"
                  style={{ transform: `scale(${0.5 + growthFactor * 0.6}) translate(${-15 + (1 - growthFactor) * 10}px, ${-10 + (1 - growthFactor) * 8}px)` }} 
                />
              )}
              {/* Right leaf */}
              {growthFactor >= 0.6 && (
                <path 
                  d="M 70 68 Q 82 60 70 54 Q 58 60 70 68 Z" 
                  fill="#22c55e" 
                  className="tree-leaf"
                  style={{ transform: `scale(${0.4 + growthFactor * 0.7}) translate(${-20 + (1 - growthFactor) * 12}px, ${-5 + (1 - growthFactor) * 6}px)` }}
                />
              )}
              {/* Top main canopy */}
              <circle 
                cx="50" 
                cy={95 - (growthFactor * 45)} 
                r={12 + growthFactor * 16} 
                fill="url(#canopyGrad)" 
                style={{ transition: 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
              />

              <defs>
                <radialGradient id="canopyGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="60%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </radialGradient>
              </defs>
            </svg>
            <span style={{ fontSize: '0.85rem', color: '#c3d1ff', fontWeight: 600 }}>
              Career Canopy: {Math.round(growthFactor * 100)}% Grown
            </span>
          </div>

          {/* Quest Console */}
          <div className="onboard-card" style={{ padding: '1.25rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div>
                <span className="eyebrow" style={{ color: '#76f5ff' }}>PROOF-OF-WORK QUEST</span>
                <h3 style={{ margin: '0.1rem 0 0', fontSize: '1.15rem' }}>{activeSkill.name} Console</h3>
              </div>
              <span className="chip" style={{ background: activeSkill.theme }}>
                Level {activeSkill.level}
              </span>
            </div>

            {/* Level Experience Indicator Bar */}
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>
                <span>Level Progress</span>
                <span>{activeSkill.xp}%</span>
              </div>
              <div className="course-progress-bar" style={{ height: '8px' }}>
                <div style={{ width: `${activeSkill.xp}%`, background: activeSkill.theme }} />
              </div>
            </div>

            {/* Proof-of-Work Toggle Selection */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <button 
                type="button" 
                className={`preset-btn${powMode === 'code' ? ' active' : ''}`}
                onClick={() => setPowMode('code')}
                style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%', borderColor: powMode === 'code' ? '#76f5ff' : 'var(--border)', color: powMode === 'code' ? '#fff' : 'var(--muted)' }}
              >
                💻 Code Debugger
              </button>
              <button 
                type="button" 
                className={`preset-btn${powMode === 'quiz' ? ' active' : ''}`}
                onClick={() => setPowMode('quiz')}
                style={{ padding: '0.4rem', fontSize: '0.8rem', width: '100%', borderColor: powMode === 'quiz' ? '#76f5ff' : 'var(--border)', color: powMode === 'quiz' ? '#fff' : 'var(--muted)' }}
              >
                🧠 Concept Check
              </button>
            </div>

            {/* Code Debugger Mode */}
            {powMode === 'code' && (
              <div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text)', margin: '0 0 0.5rem' }}>{quest.question}</p>
                <div className="pow-editor">
                  <span style={{ color: 'rgba(0, 0, 0, 0.4)', display: 'block', fontSize: '0.75rem', marginBottom: '0.3rem' }}>// CODE EDITOR</span>
                  <div>
                    {quest.codeBefore}
                    <input 
                      type="text" 
                      className="pow-input" 
                      style={{ width: '60px', margin: '0 0.3rem' }} 
                      value={powInput}
                      onChange={e => setPowInput(e.target.value)}
                      placeholder="?" 
                    />
                    {quest.codeAfter}
                  </div>
                </div>
                <button className="primary-btn full" onClick={submitPOWCode} style={{ marginTop: '0.5rem' }}>
                  Submit Proof-of-Work Code
                </button>
              </div>
            )}

            {/* Concept Check Quiz Mode */}
            {powMode === 'quiz' && (
              <div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text)', margin: '0 0 0.5rem' }}>{quest.quizQ}</p>
                <div style={{ display: 'grid', gap: '0.45rem', marginTop: '0.5rem' }}>
                  {quest.quizOptions.map((opt, idx) => {
                    const isSelected = selectedQuizOption === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`quiz-option${isSelected ? ' selected' : ''}`}
                        style={{ padding: '0.6rem 0.8rem', textAlign: 'left', fontSize: '0.85rem' }}
                        onClick={() => selectQuizOption(idx)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Feedback box */}
            {powFeedback && (
              <div 
                style={{ 
                  marginTop: '0.8rem', 
                  padding: '0.6rem 0.8rem', 
                  borderRadius: '10px', 
                  fontSize: '0.85rem',
                  background: powFeedback.success ? 'rgba(93,255,181,0.1)' : 'rgba(255,93,93,0.1)',
                  border: powFeedback.success ? '1px solid rgba(93,255,181,0.2)' : '1px solid rgba(255,93,93,0.2)',
                  color: powFeedback.success ? '#5dffb5' : '#ff6b6b'
                }}
              >
                {powFeedback.message}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Global Rocket Launch Animation Overlay */}
      <div className={`rocket-container${launchingRocket ? ' launch' : ''}`}>
        🚀
      </div>

      {/* Slide-in Gold Badge Achievement Unlock Banner */}
      <div className={`achievement-banner${achievement ? ' show' : ''}`}>
        <span className="achievement-badge">🏆</span>
        <div>
          <strong style={{ color: '#ffd700', fontSize: '0.9rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {achievement?.title}
          </strong>
          <span style={{ fontSize: '0.82rem', color: '#fff' }}>
            Unlocked: <strong>{achievement?.badgeName}</strong> for {achievement?.skillName}!
          </span>
        </div>
      </div>
    </div>
  );
}
