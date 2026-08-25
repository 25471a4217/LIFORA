import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const INITIAL_STATE = {
  currentView: 'splash',       // splash | login | register | terms | onboarding | app
  authenticated: false,
  onboardingComplete: false,
  user: {
    name: 'Asmitha',
    email: 'asmitha@lifora.com',
    mainGoal: 'Become a Prompt Engineer & AI Architect',
    level: 12,
    xp: 2450,
    streak: 14,
    growthScore: 76,
    focusAreas: ['Full Stack Development', 'Prompt Engineering', 'Quantum Computing', 'AI & ML', 'Entrepreneurship'],
    tasksCompleted: 8,
    dailyCompletion: 65,
    age: '',
    profession: 'Student',
  },
  selectedAreas: ['Full Stack Development', 'Prompt Engineering', 'Quantum Computing', 'AI & Machine Learning', 'Entrepreneurship'],
  mainGoal: 'Become a Prompt Engineer & AI Architect',
  selectedTime: '2 Hours',
  timeslots: ['Morning', 'Evening'],
  taskFilter: 'today',
  tasks: [
    { id: 't1', title: 'Full Stack React & Node API Integration', status: 'today', priority: 'High', time: '11:00', goal: 'Full Stack Development', duration: '60 min', xp: 45, completed: false },
    { id: 't2', title: 'Prompt Engineering & System Prompts Practice', status: 'today', priority: 'High', time: '14:00', goal: 'Prompt Engineering', duration: '45 min', xp: 35, completed: false },
    { id: 't3', title: 'Quantum Qubit Simulation & Circuit Design', status: 'upcoming', priority: 'Medium', time: '16:30', goal: 'Quantum Computing', duration: '50 min', xp: 40, completed: false },
    { id: 't4', title: 'Workout & Energy Reset', status: 'today', priority: 'Wellness', time: '18:00', goal: 'Health', duration: '30 min', xp: 20, completed: false },
    { id: 't5', title: 'LLM Agentic Workflow Architecture', status: 'upcoming', priority: 'High', time: '20:00', goal: 'Prompt Engineering', duration: '40 min', xp: 38, completed: false },
  ],
  courses: [
    { id: 'python', title: 'Python Mastery', progress: 68, current: 'Data Structures', next: 'Machine Learning', locked: false },
    { id: 'ai', title: 'AI Foundations', progress: 42, current: 'Neural Networks', next: 'Model Deployment', locked: false },
    { id: 'flutter', title: 'Flutter Developer', progress: 24, current: 'Widgets', next: 'State Management', locked: false },
    { id: 'business', title: 'Business Strategy', progress: 14, current: 'Market Study', next: 'Product Roadmap', locked: true },
  ],
  modules: [
    { title: 'Python Basics', status: 'complete' },
    { title: 'Functions', status: 'complete' },
    { title: 'OOP', status: 'complete' },
    { title: 'Data Structures', status: 'current' },
    { title: 'Machine Learning', status: 'locked' },
  ],
  quiz: {
    questions: [
      { text: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], answer: 1 },
      { text: 'What programming language powers most AI libraries?', options: ['Ruby', 'JavaScript', 'Python', 'C++'], answer: 2 },
      { text: 'Which algorithm is common for shortest path?', options: ['BFS', 'Quicksort', 'DFS', 'Merge Sort'], answer: 0 },
      { text: 'What does DSA stand for?', options: ['Data System Access', 'Data Structures & Algorithms', 'Development Skills Assessment', 'Dynamic Statistical Analysis'], answer: 1 },
      { text: 'Which structure is best for LIFO?', options: ['Queue', 'Stack', 'Heap', 'Graph'], answer: 1 },
    ],
    current: 0,
    score: 0,
  },
  chatHistory: [
    { sender: 'ai', text: 'I am your personal Life OS coach. What are we working on today?' },
  ],
  notifications: [
    { id: 'n1', text: 'Your streak is at risk', type: 'alert' },
    { id: 'n2', text: 'Your DSA goal is due today', type: 'reminder' },
    { id: 'n3', text: 'AI created a recovery plan', type: 'info' },
  ],
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem('liforaState');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Restore functions that can't be serialized
        return { ...INITIAL_STATE, ...parsed };
      }
    } catch (_) {}
    return INITIAL_STATE;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('liforaState', JSON.stringify(state));
    } catch (_) {}
  }, [state]);

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }));
  }, []);

  const updateUser = useCallback((patch) => {
    setState(prev => ({ ...prev, user: { ...prev.user, ...patch } }));
  }, []);

  const updateQuiz = useCallback((patch) => {
    setState(prev => ({ ...prev, quiz: { ...prev.quiz, ...patch } }));
  }, []);

  return (
    <AppContext.Provider value={{ state, update, updateUser, updateQuiz }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
