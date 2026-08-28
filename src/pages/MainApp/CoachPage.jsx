import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';

// Emotional Intelligence Sentiment & Mood Decoder with Future Connections & Natural Bridges
function analyzeEmotion(text) {
  const lower = text.toLowerCase();

  if (/overwhelm|stressed|freak|pressure|deadline|too much|panic|can't keep up/i.test(lower)) {
    return {
      mood: 'Overwhelmed 🤯',
      tone: 'deeply empathetic & grounding',
      activity: 'breathing',
      response: `I hear you, and it is completely valid to feel overwhelmed right now. When everything comes at you at once, your nervous system naturally triggers high alert.

The goal is not to solve your entire workload in this exact minute. The goal is to make your future workload easier through **one tiny action now**.

👉 **Future Connection**:
If you commit just **10 minutes** to your highest priority task now, by 2:00 PM you will be in a much calmer, controlled position with zero backlog pressure.

👉 **Immediate Action Plan**:
1. Take 3 deep breaths with our **Zen Box Breathing Orb** below.
2. Pick **only the easiest 5-minute piece** of your current task.
3. Ignore everything else for now—you are doing much better than you think.`
    };
  }

  if (/burnout|tired|exhausted|no energy|drained|give up|giving up|bored|sleepy/i.test(lower)) {
    return {
      mood: 'Burned Out 🔋',
      tone: 'nurturing & protective',
      activity: 'dopamine',
      response: `Your energy is low, and your mind is signaling that it needs a gentle micro-reset. Pushing through severe fatigue only creates unnecessary frustration.

👉 **Future Connection**:
Taking a zero-guilt 5-minute break now will protect your energy so you can accomplish your evening goals without crashing.

👉 **Recommended Micro-Reset**:
1. Try the **Dopamine Micro-Break Routine** below (drink water & stretch).
2. Complete 1 simple task checkpoint today—consistency matters far more than intensity.`
    };
  }

  if (/distracted|can't focus|scrolling|procrastinat|wandering|bored/i.test(lower)) {
    return {
      mood: 'Distracted 🌀',
      tone: 'gamified & refocusing',
      activity: 'puzzle',
      response: `Focus isn't something you force; it's something you calibrate. Your brain is searching for quick stimulation. Let's give it a short 1-minute mini-game to snap back into high gear!

👉 **Future Connection**:
If you switch from passive scrolling to a 10-minute task sprint now, you'll clear your schedule early and have guilt-free leisure time later tonight.

👉 **Focus Calibration Step**:
1. Play **any of our Continuous Infinite Game Categories** below. Every next question is fresh!
2. Let's use that exact momentum for just 10 minutes on your mission.`
    };
  }

  if (/stuck|error|bug|broken|don't understand|confused|failing|hard|difficult/i.test(lower)) {
    return {
      mood: 'Frustrated / Stuck 🧩',
      tone: 'analytical & encouraging',
      activity: 'reframe',
      response: `Getting stuck is the exact moment where true learning happens! Every error log or confusion is just an unpolished step toward mastery.

👉 **Future Connection**:
Isolating this bug now prevents hours of confusion tomorrow and makes your future code structure 10x cleaner.

👉 **Reframing & Diagnostic Step**:
1. Flip a card in the **Cognitive Reframing Deck** below.
2. Explain the problem out loud in 2 simple sentences as if teaching a beginner.
3. Break the code into the absolute smallest possible 2-minute step.`
    };
  }

  if (/ready|pumped|excited|let's go|win|build|motivated|high energy|goal/i.test(lower)) {
    return {
      mood: 'Motivated & Energized 🚀',
      tone: 'inspiring & high-momentum',
      activity: 'roadmap',
      response: `Love this high-energy momentum! You're in peak flow state right now. Let's capitalize on this drive and build something extraordinary today.

👉 **Future Connection**:
Executing 45 minutes of focused development right now directly accelerates your goal of becoming an AI Architect by several weeks!

👉 **High-Momentum Playbook**:
1. Tackle your highest XP / Boss Level task first while your energy is peaked.
2. Launch a 10-Minute Mission Sprint on your task dashboard.`
    };
  }

  return null;
}

// Career Support Response Generator
function generateAIReply(prompt, selectedSkills = [], mainGoal = '') {
  const detected = analyzeEmotion(prompt);
  if (detected) {
    return { emotion: detected, text: detected.response };
  }

  const lower = prompt.toLowerCase();

  // Check if requesting custom roadmap or study plan
  if (lower.includes('roadmap') || lower.includes('study plan') || lower.includes('guide')) {
    const goalTitle = mainGoal || 'your target career';
    const skillsList = selectedSkills.length > 0 ? selectedSkills : ['Python Development', 'Data Science', 'Machine Learning'];
    
    return {
      emotion: { mood: 'Goal Focused 🎯', activity: null },
      text: `### 🚀 Custom Roadmap: ${goalTitle}

#### Current Action → Near-Future Progress → Meaningful Result
If you build 1 small hands-on task today in **${skillsList[0]}** (**Current Action**), you will compile a solid practical portfolio prototype (**Near-Future Progress**), accelerating your journey towards achieving your goal: **${goalTitle}** (**Meaningful Result**).

#### 1. Key Skill Focus Areas
Based on your onboarding selections, your roadmap is designed around these priority skills:
${skillsList.map((skill, index) => `- **${skill}**: Directly integrates with your career roadmap and supports learning progression.`).join('\n')}

#### 2. Specialized Roadmap & Study Milestones
- **Beginner Phase (Weeks 1–3)**: Core concepts of **${skillsList[0] || 'your core skills'}** and **${skillsList[1] || 'your supportive skills'}**. Work on basic configurations and setup. *(Est. 15 hrs)*
- **Intermediate Phase (Weeks 4–8)**: Integration of **${skillsList[2] || 'secondary focus'}** and building small full-stack components, APIs or scripts using standard frameworks. *(Est. 30 hrs)*
- **Advanced Phase (Weeks 9–12)**: Mastering advanced systems orchestration, architecture pipelines, deployment, optimization, and capstone project delivery. *(Est. 40 hrs)*

#### 3. Action Check-in
Nice! Brain warm-up complete 😄. Now let me ask: what is the easiest 5-minute action you can take on this roadmap right now?`
    };
  }

  if (lower.includes('prompt engineer') || lower.includes('ai architect')) {
    return {
      emotion: { mood: 'Goal Focused 🎯', activity: null },
      text: `### 🚀 Comprehensive Career Support System: Prompt Engineer & AI Architect

#### Current Action → Near-Future Progress → Meaningful Result
If you build 1 small RAG script today (**Current Action**), you will have a working portfolio prototype by Friday (**Near-Future Progress**), opening up high-paying AI Engineer interview calls (**Meaningful Result**).

#### 1. Topic Overview
- **Simple Explanation**: Prompt Engineering & AI Architecture is the discipline of designing, optimizing, and orchestrating Large Language Models (LLMs) and Autonomous AI Agents.
- **Career Importance**: High-demand specialty ($120k–$200k+) in modern tech stacks.

#### 2. Learning Roadmap
- **Beginner (Weeks 1–3)**: Zero-shot/Few-shot prompting, System Prompts, Temperature & Top-P tuning, Output formatting (JSON mode). *(Est. 15 hrs)*
- **Intermediate (Weeks 4–8)**: Chain-of-Thought (CoT), ReAct framework, RAG architecture, Vector Databases (Chroma/Pinecone), LangChain / LlamaIndex. *(Est. 30 hrs)*
- **Advanced (Weeks 9–12)**: Autonomous Multi-Agent Orchestration (CrewAI/AutoGen), Model Fine-tuning (LoRA/QLoRA), Guardrails, Latency & Token Cost Optimization. *(Est. 40 hrs)*

#### 3. Natural Transition to Action
Nice! Brain warm-up complete 😄. Now let me ask: what is the easiest 5-minute action you can take on this roadmap right now?`
    };
  }

  if (lower.includes('full stack') || lower.includes('web development')) {
    return {
      emotion: { mood: 'Full Stack Focus 💻', activity: null },
      text: `### 💻 Full Stack Web Development Mastery Guide

#### Current Action → Near-Future Progress → Meaningful Result
Adding 1 clean API route today (**Current Action**) completes your backend integration (**Near-Future Progress**), leaving your weekend completely free for relaxing (**Meaningful Result**).

#### 1. Core Roadmap
- **Frontend**: HTML5, CSS Grid/Flexbox, JavaScript ES6+, React 18, State Management.
- **Backend**: Node.js, Express REST APIs, PostgreSQL / MongoDB, Prisma ORM.

#### 2. Natural Transition
Okay, ready for momentum 😄! Let me ask: what is the single easiest endpoint or UI component you can build in the next 10 minutes?`
    };
  }

  return {
    emotion: { mood: 'Curious & Mindful 💡', activity: null },
    text: `I am your **Emotionally Intelligent AI Coach & Mood Assistant**. 

Feel free to share how you're feeling or play our Continuous Infinite Game Categories below! Every next question is fresh and non-repeating.`
  };
}

// ----------------------------------------------------
// DYNAMIC INFINITE QUESTION GENERATORS ENGINE
// ----------------------------------------------------

const TECH_TERMS = [
  { word: "REACT", hint: "Popular UI library by Meta" },
  { word: "PYTHON", hint: "World's #1 AI programming language" },
  { word: "JAVASCRIPT", hint: "The language powering web browsers" },
  { word: "TYPESCRIPT", hint: "Typed superset of JavaScript" },
  { word: "DOCKER", hint: "Containerization platform" },
  { word: "KUBERNETES", hint: "Container orchestration engine" },
  { word: "POSTGRESQL", hint: "Advanced open-source relational database" },
  { word: "PRISMA", hint: "Next-generation ORM for Node.js" },
  { word: "EXPRESS", hint: "Minimalist web framework for Node.js" },
  { word: "MONGODB", hint: "NoSQL document database" },
  { word: "TAILWIND", hint: "Utility-first CSS framework" },
  { word: "GRAPHQL", hint: "Query language for APIs" },
  { word: "COMPILER", hint: "Translates high-level code to machine code" },
  { word: "ALGORITHM", hint: "Step-by-step problem solving procedure" },
  { word: "REDUX", hint: "Predictable state container for JS apps" },
  { word: "WEBSOCKET", hint: "Full-duplex real-time communication" },
  { word: "FIREBASE", hint: "Backend-as-a-Service by Google" },
  { word: "SUPABASE", hint: "Open-source Firebase alternative" },
  { word: "FASTAPI", hint: "High performance Python API framework" },
  { word: "FLUTTER", hint: "Cross-platform UI framework by Google" },
  { word: "LANGCHAIN", hint: "Framework for building LLM applications" },
  { word: "PINECONE", hint: "Vector database for AI embeddings" },
  { word: "RECURSION", hint: "Function calling itself until base case" },
  { word: "VARIABLE", hint: "Named storage container for data" },
];

const DETECTIVE_POOL = [
  { q: "Inspector Dev found a function returning 'undefined'. Line 4 calls an async API without 'await'. What was the bug?", options: ["Missing await keyword", "HTML syntax error", "Low brightness"], ans: 0, bridge: "Nice detective work 😄! Spotting details makes your code bug-free." },
  { q: "React state isn't updating on user click. Code did 'state.count = 5' instead of 'setCount(5)'. What failed?", options: ["Direct state mutation bypasses re-render", "Server crashed", "Offline mode"], ans: 0, bridge: "Spot on 😄! Immutable state updates guarantee predictable React renders." },
  { q: "A component re-fetches data endlessly. useEffect was called without '[]' dependencies. Why?", options: ["Without [] dependencies, useEffect runs on every render", "CPU overheating", "Fast internet"], ans: 0, bridge: "Excellently spotted 😄! Now let's loop that focus into a 10-minute task sprint!" },
  { q: "Clicking '/dashboard' leads to a 404 page. The router defined path='/dash'. Why?", options: ["Mismatched route path string", "Monitor unplugged", "Database crash"], ans: 0, bridge: "Great deduction 😄! Route matching is essential for full stack apps." },
  { q: "An API request returned HTTP Status 401. What does 401 mean?", options: ["Unauthorized / Invalid token", "Not Found", "Internal Server Error"], ans: 0, bridge: "Correct 😄! Authentication tokens protect secure endpoints." },
  { q: "JSON.parse('{bad_json}') threw a SyntaxError. Why did it crash?", options: ["Invalid JSON format / missing quotes", "Memory leak", "Missing CSS"], ans: 0, bridge: "Awesome debugging 😄! Valid JSON formatting prevents runtime crashes." },
];

const EMOJI_POOL = [
  { q: "Guess the career: 🚀 + 🤖 + 💻 = ?", ans: "AI Engineer / Architect", clue: "Building intelligent autonomous systems!" },
  { q: "Guess the tech: 🐍 + 💻 = ?", ans: "Python Programming", clue: "Language favored by AI researchers!" },
  { q: "Guess the movie: 🚢 + 🧊 + 🌊 = ?", ans: "Titanic", clue: "Directed by James Cameron!" },
  { q: "Guess the concept: ⚡ + 📦 = ?", ans: "Vite Bundler", clue: "The ultra-fast frontend build tool!" },
  { q: "Guess the concept: 🔑 + 🔒 = ?", ans: "Password Encryption", clue: "Securing auth tokens!" },
  { q: "Guess the concept: ☕ + 💻 = ?", ans: "Developer Flow State", clue: "Fueling deep work sessions!" },
];

const LOGIC_POOL = [
  { q: "If all Coders write Code, and all Code requires Logic, does every Coder use Logic?", options: ["Yes, by transitive logic!", "No, code is magic", "Only on weekends"], ans: 0 },
  { q: "What rule binds this prime set: 3, 5, 7, 11, 13?", options: ["All are Prime Numbers", "All are Even Numbers", "All are Multiples of 5"], ans: 0 },
  { q: "If A > B and B > C, is A > C?", options: ["Yes, transitive inequality", "No", "Cannot determine"], ans: 0 },
  { q: "Which item is the intruder: Python, Java, HTML, C++?", options: ["HTML (Markup language, not programming language)", "Python", "Java"], ans: 0 },
];

// Algorithmic Question Generator per Category
function generateQuestionForCategory(catId, roundCount) {
  const seed = roundCount;

  switch (catId) {
    case 1: {
      // Number Patterns (Dynamic math sequences)
      const base = (seed % 5) + 2;
      const multiplier = (seed % 3) + 2;
      const seq = [base, base * multiplier, base * multiplier * multiplier, base * multiplier * multiplier * multiplier];
      const ans = String(base * Math.pow(multiplier, 4));
      return {
        id: `num_${seed}`,
        type: "input",
        question: `Find the next number in sequence: ${seq.join(', ')}, ?`,
        answer: ans,
        clue: `Rule: Multiply each number by ${multiplier}!`,
        bridge: `Nice math pattern 😄! You solved Round ${seed + 1}. What's your next task step?`
      };
    }
    case 2: {
      // Logic Puzzles
      const item = LOGIC_POOL[seed % LOGIC_POOL.length];
      return {
        id: `logic_${seed}`,
        type: "choice",
        question: item.q,
        options: item.options,
        answer: item.ans,
        bridge: "Logical deduction complete 😄! Next challenge loaded automatically!"
      };
    }
    case 3: {
      // Word Scrambles (Dynamic from Tech Terms)
      const t = TECH_TERMS[seed % TECH_TERMS.length];
      const scrambled = t.word.split('').sort(() => Math.random() - 0.5).join(' ');
      return {
        id: `scramble_${seed}`,
        type: "input",
        question: `Unscramble the Tech Word: ${scrambled}`,
        answer: t.word,
        clue: `Hint: ${t.hint}`,
        bridge: `Word unscrambled 😄! Round ${seed + 1} complete. Let's keep this momentum going!`
      };
    }
    case 4: {
      // Missing Letter Games (Dynamic from Tech Terms)
      const t = TECH_TERMS[seed % TECH_TERMS.length];
      const arr = t.word.split('');
      const blankIdx = Math.floor(arr.length / 2);
      const missingChar = arr[blankIdx];
      arr[blankIdx] = '_';
      return {
        id: `missing_${seed}`,
        type: "input",
        question: `Find the missing letter: ${arr.join(' ')}`,
        answer: missingChar,
        clue: `Hint: ${t.hint}`,
        bridge: `Letter found 😄! Round ${seed + 1} solved. Ready for the next fresh challenge?`
      };
    }
    case 5: {
      // Quick Math (Dynamic math generator)
      const a = (seed * 7 + 12) % 20 + 5;
      const b = (seed * 3 + 4) % 12 + 2;
      const c = (seed * 2 + 1) % 10 + 1;
      const mathAns = String(a * b - c);
      return {
        id: `math_${seed}`,
        type: "input",
        question: `Quick Math Round ${seed + 1}: ${a} × ${b} - ${c} = ?`,
        answer: mathAns,
        clue: `${a} × ${b} = ${a * b}, then subtract ${c}!`,
        bridge: `Math precision checked 😄! Your brain is sharp. What task are we tackling next?`
      };
    }
    case 6: {
      // Mini Detective Mysteries
      const det = DETECTIVE_POOL[seed % DETECTIVE_POOL.length];
      return {
        id: `det_${seed}`,
        type: "choice",
        question: `Detective Case #${seed + 1}: ${det.q}`,
        options: det.options,
        answer: det.ans,
        bridge: det.bridge
      };
    }
    case 7: {
      // Emoji Guessing
      const em = EMOJI_POOL[seed % EMOJI_POOL.length];
      return {
        id: `emoji_${seed}`,
        type: "reveal",
        question: `Emoji Story Round #${seed + 1}: ${em.q}`,
        answer: em.ans,
        clue: em.clue,
        bridge: "Decoded perfectly 😄! Next fresh emoji puzzle loaded automatically!"
      };
    }
    case 8: {
      // Code-Breaking Ciphers (Caesar Cipher dynamic)
      const t = TECH_TERMS[seed % TECH_TERMS.length];
      const shift = 1;
      const ciphered = t.word.split('').map(char => String.fromCharCode(char.charCodeAt(0) + shift)).join('');
      return {
        id: `cipher_${seed}`,
        type: "input",
        question: `Decrypt Caesar Cipher (+1 shift): ${ciphered}`,
        answer: t.word,
        clue: `Shift each letter back by 1 (e.g. B ➔ A)! Hint: ${t.hint}`,
        bridge: `Cipher cracked 😄! Round ${seed + 1} victory. Let's tackle your current task!`
      };
    }
    default: {
      const a = seed + 5;
      const b = seed * 2;
      return {
        id: `gen_${seed}`,
        type: "input",
        question: `Continuous Question Round #${seed + 1}: ${a} + ${b} = ?`,
        answer: String(a + b),
        clue: `Add ${a} and ${b}!`,
        bridge: "Fresh question solved 😄! Momentum is building naturally."
      };
    }
  }
}

const INFINITE_CATEGORIES = [
  { id: 1, name: "🔢 Number Patterns (Infinite)", icon: "🔢" },
  { id: 2, name: "🧩 Logic Puzzles (Infinite)", icon: "🧩" },
  { id: 3, name: "🔤 Word Scrambles (Infinite)", icon: "🔤" },
  { id: 4, name: "❓ Missing Letter Games (Infinite)", icon: "❓" },
  { id: 5, name: "🧮 Quick Math (Infinite)", icon: "🧮" },
  { id: 6, name: "🕵️ Mini Detective Mysteries (Infinite)", icon: "🕵️" },
  { id: 7, name: "🎭 Emoji Guessing (Infinite)", icon: "🎭" },
  { id: 8, name: "🔑 Code Ciphers (Infinite)", icon: "🔑" },
];

// Interactive Continuous Game Component
function ContinuousGameCategoryCard({ category, onSolveReward }) {
  const [round, setRound] = useState(0);
  const [streak, setStreak] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [clueVisible, setClueVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  // Generate question dynamically based on category ID & round count
  const questionData = generateQuestionForCategory(category.id, round);

  const resetForNextQuestion = useCallback(() => {
    setUserInput('');
    setSelectedOpt(null);
    setFeedback('');
    setClueVisible(false);
    setRevealed(false);
    setIsSolved(false);
    setRound(r => r + 1);
  }, []);

  function handleCorrectAnswer(xpBonus) {
    setIsSolved(true);
    setStreak(s => s + 1);
    onSolveReward(xpBonus);

    if (autoAdvance) {
      setTimeout(() => {
        resetForNextQuestion();
      }, 2000);
    }
  }

  function handleInputSubmit() {
    if (userInput.trim().toUpperCase() === questionData.answer.toUpperCase()) {
      setFeedback(`🎉 Correct! (+20 XP) • Streak: 🔥 ${streak + 1}\n\n${questionData.bridge}`);
      handleCorrectAnswer(20);
    } else {
      setFeedback(`Not quite! Check the clue and try again!`);
    }
  }

  function handleChoice(idx) {
    setSelectedOpt(idx);
    if (idx === questionData.answer) {
      setFeedback(`🎉 Correct! (+20 XP) • Streak: 🔥 ${streak + 1}\n\n${questionData.bridge}`);
      handleCorrectAnswer(20);
    } else {
      setFeedback(`Almost! Try another option!`);
    }
  }

  function handleReveal() {
    setRevealed(true);
    setFeedback(`🎉 Solution: ${questionData.answer} (+15 XP)\n\n${questionData.bridge}`);
    handleCorrectAnswer(15);
  }

  return (
    <article className="insight-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: isSolved ? '1px solid rgba(70,236,180,0.5)' : '1px solid var(--border)', position: 'relative' }}>
      <div>
        {/* Header Badges */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <span className="eyebrow" style={{ color: '#76f5ff', margin: 0 }}>ROUND #{round + 1}</span>
            {streak > 0 && (
              <span style={{ fontSize: '0.78rem', color: '#ffd166', background: 'rgba(255,209,102,0.15)', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 700 }}>
                Streak: 🔥 {streak}
              </span>
            )}
          </div>
          {isSolved && (
            <span style={{ color: '#46ecb4', fontWeight: 700, fontSize: '0.8rem', background: 'rgba(70,236,180,0.15)', padding: '0.2rem 0.6rem', borderRadius: '6px' }}>
              ✓ Solved
            </span>
          )}
        </div>

        <h4 style={{ margin: '0 0 0.8rem', fontSize: '1.2rem', color: '#f1f5f9' }}>{category.name}</h4>

        {/* Dynamic Question Prompt */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '1rem' }}>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', fontWeight: 600, color: '#f1f5f9' }}>
            {questionData.question}
          </p>
        </div>

        {/* INPUT TYPE */}
        {questionData.type === 'input' && (
          <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0.8rem' }}>
            <input
              className="onboard-input"
              type="text"
              placeholder="Type answer..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              style={{ margin: 0, padding: '0.6rem 0.9rem', fontSize: '0.9rem' }}
              disabled={isSolved}
            />
            <button className="primary-btn" onClick={handleInputSubmit} disabled={isSolved}>Submit</button>
          </div>
        )}

        {/* CHOICE TYPE */}
        {questionData.type === 'choice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '0.8rem' }}>
            {questionData.options.map((opt, idx) => (
              <button
                key={idx}
                className="secondary-btn"
                onClick={() => handleChoice(idx)}
                style={{
                  textAlign: 'left',
                  fontSize: '0.88rem',
                  padding: '0.7rem 1rem',
                  background: selectedOpt === idx ? (idx === questionData.answer ? 'rgba(70,236,180,0.2)' : 'rgba(255,118,118,0.2)') : 'rgba(0, 0, 0, 0.04)',
                  borderColor: selectedOpt === idx ? (idx === questionData.answer ? '#46ecb4' : '#ff7676') : 'var(--border)',
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        )}

        {/* REVEAL TYPE */}
        {questionData.type === 'reveal' && (
          <div style={{ marginBottom: '0.8rem' }}>
            {!revealed ? (
              <button className="primary-btn" onClick={handleReveal}>Reveal Solution</button>
            ) : (
              <div style={{ color: '#46ecb4', fontWeight: 700, fontSize: '0.95rem' }}>
                🎉 Answer: {questionData.answer}
              </div>
            )}
          </div>
        )}

        {/* Clue Section */}
        {questionData.clue && (
          <div style={{ marginTop: '0.5rem' }}>
            {!clueVisible ? (
              <button className="ghost-btn" onClick={() => setClueVisible(true)} style={{ fontSize: '0.8rem', color: '#8da9ff', padding: 0 }}>
                💡 Show Clue
              </button>
            ) : (
              <p style={{ fontSize: '0.82rem', color: '#8da9ff', margin: '0.3rem 0 0' }}>
                💡 Clue: {questionData.clue}
              </p>
            )}
          </div>
        )}

        {/* Feedback & Natural Task Bridge Display */}
        {feedback && (
          <div style={{ marginTop: '1rem', padding: '0.9rem', background: 'rgba(118,245,255,0.1)', borderRadius: '10px', border: '1px solid rgba(118,245,255,0.3)', color: '#76f5ff', fontSize: '0.88rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
            {feedback}
          </div>
        )}
      </div>

      {/* Footer Controls: Continuous Auto-Play & Next Question */}
      <div style={{ marginTop: '1.2rem', paddingTop: '0.8rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.8rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--muted)', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={autoAdvance}
            onChange={() => setAutoAdvance(!autoAdvance)}
            style={{ accentColor: '#76f5ff' }}
          />
          ⚡ Continuous Auto-Advance
        </label>

        <button className="primary-btn" onClick={resetForNextQuestion} style={{ background: 'linear-gradient(135deg, #5d8bff, #8d5cf7)', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
          ▶ Next Question (Level Up!) →
        </button>
      </div>
    </article>
  );
}

const REFRAMING_CARDS = [
  { negative: "❌ I'm so far behind everyone else.", positive: "🔄 My learning journey is unique. Small consistent steps build undeniable mastery over time." },
  { negative: "❌ This bug means I'm not smart enough.", positive: "🔄 Bugs are simply diagnostic logs guiding my next skill upgrade." },
  { negative: "❌ I have way too much to do.", positive: "🔄 Doing 1 focused micro-task right now is a complete victory today." },
  { negative: "❌ I can't concentrate today.", positive: "🔄 A 2-minute breath and micro-break will restore my focus." },
];

export default function CoachPage() {
  const { state, update, updateUser } = useApp();
  const [input, setInput] = useState('');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'reset'
  const [detectedMood, setDetectedMood] = useState('Focused 🎯');
  const [totalSolved, setTotalSolved] = useState(0);
  const [planModal, setPlanModal] = useState(false);
  const chatEndRef = useRef(null);

  // Breathing Orb State
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathCycles, setBreathCycles] = useState(0);

  // Reframing Deck State
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatHistory]);

  // Breathing Timer
  useEffect(() => {
    if (!breathing) return;
    const phases = [
      { name: 'Inhale (4s)', duration: 4000 },
      { name: 'Hold (4s)', duration: 4000 },
      { name: 'Exhale (4s)', duration: 4000 },
      { name: 'Hold (4s)', duration: 4000 },
    ];

    let current = 0;
    setBreathPhase(phases[0].name);

    const interval = setInterval(() => {
      current = (current + 1) % phases.length;
      setBreathPhase(phases[current].name);

      if (current === 3) {
        setBreathCycles(c => {
          const next = c + 1;
          if (next % 3 === 0) {
            updateUser({ xp: (state.user.xp || 0) + 15 });
          }
          return next;
        });
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [breathing, state.user.xp, updateUser]);

  function sendMessage(text) {
    const msg = text || input.trim();
    if (!msg) return;

    const newHistory = [...state.chatHistory, { sender: 'user', text: msg }];
    update({ chatHistory: newHistory });
    setInput('');

    setTimeout(() => {
      const reply = generateAIReply(msg, state.user?.focusAreas || state.selectedAreas || [], state.user?.mainGoal || state.mainGoal);
      if (reply.emotion?.mood) {
        setDetectedMood(reply.emotion.mood);
      }
      update({
        chatHistory: [...newHistory, { sender: 'ai', text: reply.text }],
      });
    }, 600);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  function handleSolveReward(xpBonus) {
    setTotalSolved(s => s + 1);
    updateUser({ xp: (state.user.xp || 0) + xpBonus });
  }

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="eyebrow">EMOTIONALLY INTELLIGENT AI ASSISTANT</span>
          <h2 style={{ margin: 0 }}>AI Coach & Continuous Infinite Game Arcade</h2>
          <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0', maxWidth: '640px' }}>
            Understands your mood and study goals. One solved question automatically leads to another fresh, non-repeating question for continuous momentum!
          </p>
        </div>

        {/* Emotion Indicator Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'var(--surface-strong)', padding: '0.6rem 1.2rem', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Detected Mood:</span>
          <strong style={{ color: '#76f5ff', fontSize: '0.95rem' }}>{detectedMood}</strong>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', gap: '0.8rem', marginBottom: '1.5rem' }}>
        <button
          className={`primary-btn ${activeTab === 'chat' ? '' : 'secondary-btn'}`}
          onClick={() => setActiveTab('chat')}
          style={{ background: activeTab === 'chat' ? 'linear-gradient(135deg, #5d8bff, #8d5cf7)' : 'rgba(0, 0, 0, 0.06)' }}
        >
          💬 AI Coach Chat
        </button>
        <button
          className={`primary-btn ${activeTab === 'reset' ? '' : 'secondary-btn'}`}
          onClick={() => setActiveTab('reset')}
          style={{ background: activeTab === 'reset' ? 'linear-gradient(135deg, #5d8bff, #8d5cf7)' : 'rgba(0, 0, 0, 0.06)' }}
        >
          🎮 Continuous Infinite Game Arcade ({totalSolved} Solved)
        </button>
      </div>

      {activeTab === 'chat' ? (
        <div className="coach-grid">
          {/* Quick Emotion Check-ins & Prompt Pills */}
          <article className="coach-panel">
            <div className="status-pill"><span className="online" />AI Mindset & Emotion Engine Online</div>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0.8rem 0 0.5rem' }}>Express Your Current State:</p>
            <div className="prompt-grid">
              <button className="prompt-pill" onClick={() => sendMessage("I'm feeling really overwhelmed by my workload and deadlines")}>
                🤯 Overwhelmed & Stressed
              </button>
              <button className="prompt-pill" onClick={() => sendMessage("I feel exhausted and burned out today, no motivation")}>
                🔋 Burned Out / Low Energy
              </button>
              <button className="prompt-pill" onClick={() => sendMessage("I keep getting distracted and can't focus on studying")}>
                🌀 Distracted / Loss of Focus
              </button>
              <button className="prompt-pill" onClick={() => sendMessage("I'm stuck on a really frustrating bug in my code")}>
                🧩 Stuck & Frustrated
              </button>
              <button className="prompt-pill" onClick={() => sendMessage(`🎯 Roadmap for ${state.user?.mainGoal || state.mainGoal || 'Become an AI Architect'}`)}>
                🎯 My Goal Roadmap
              </button>
              <button className="prompt-pill" onClick={() => sendMessage(`📚 Study Plan for ${state.user?.focusAreas?.[0] || state.selectedAreas?.[0] || 'Python'}`)}>
                📚 My Core Skill Plan
              </button>
            </div>
          </article>

          {/* Chat Interface */}
          <article className="coach-chat">
            <div className="chat-list" style={{ gap: '1rem' }}>
              {state.chatHistory.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender}`} style={{ maxWidth: msg.sender === 'user' ? '80%' : '92%' }}>
                  <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{msg.text}</div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form className="chat-form" onSubmit={handleSubmit}>
              <input
                className="chat-input"
                type="text"
                placeholder="Talk about your mood, stress, or ask for study plans..."
                value={input}
                onChange={e => setInput(e.target.value)}
              />
              <button type="submit" className="primary-btn">Send to Coach</button>
            </form>
          </article>
        </div>
      ) : (
        /* DYNAMIC CONTINUOUS INFINITE GAME ARCADE */
        <div>
          {/* Arcade Scoreboard Header */}
          <div className="insight-card" style={{ marginBottom: '1.5rem', background: 'linear-gradient(135deg, rgba(14,25,55,0.95), rgba(29,45,82,0.9))', border: '1px solid rgba(118,245,255,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="eyebrow" style={{ color: '#76f5ff' }}>DYNAMIC CONTINUOUS GAMEPLAY ENGINE</span>
                <h3 style={{ margin: '0.2rem 0' }}>Infinite Question Supply • Never-Ending Arcade</h3>
                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)' }}>
                  Solving a question automatically generates a fresh, unique question in that category. Keep playing as long as you like!
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.8rem 1.4rem', borderRadius: '12px' }}>
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>TOTAL SOLVED</span>
                  <strong style={{ fontSize: '1.4rem', color: '#76f5ff' }}>{totalSolved}</strong>
                </div>
                <div style={{ width: '1px', height: '30px', background: 'var(--border)' }} />
                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block' }}>SESSION XP</span>
                  <strong style={{ fontSize: '1.4rem', color: '#46ecb4' }}>+{totalSolved * 20} XP</strong>
                </div>
              </div>
            </div>
          </div>

          {/* INFINITE CATEGORY CARDS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {INFINITE_CATEGORIES.map(cat => (
              <ContinuousGameCategoryCard key={cat.id} category={cat} onSolveReward={handleSolveReward} />
            ))}
          </div>
        </div>
      )}

      {/* Career Plan Modal */}
      {planModal && (
        <Modal title="AI Wellness & Performance Plan" onClose={() => setPlanModal(false)} footer={<button className="primary-btn" onClick={() => setPlanModal(false)}>Got it</button>}>
          <p style={{ lineHeight: '1.6', color: 'var(--text)' }}>
            LIFORA recommends keeping a healthy balance: 50% deep work sprints, 30% active skill building, and 20% dedicated mood resets and physical recovery.
          </p>
        </Modal>
      )}
    </div>
  );
}
