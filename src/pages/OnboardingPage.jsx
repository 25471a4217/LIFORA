import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { getQuestionsForUserTopics } from '../data/quizQuestions';

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
    connectedGoals: ['Become a Full Stack Engineer', 'AR/VR Spatial Computing Developer'],
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
    connectedGoals: ['Ethical Hacker & Security Lead', 'Quantum Computing Specialist'],
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
  'Finance & Investing': {
    connectedGoals: ['Financial Independence & Wealth'],
    synergy: 'Enables strategic budget control, smart compound savings, and asset allocation.',
    icon: '💰',
  },
  'Entrepreneurship': {
    connectedGoals: ['Build & Launch a Tech Startup'],
    synergy: 'Empowers product validation, pitch architectures, venture backing, and corporate growth.',
    icon: '🚀',
  },
  'Personal Growth': {
    connectedGoals: ['Peak Fitness & Mindset Mastery'],
    synergy: 'Cultivates high focus habits, daily meditation, journaling, and proactive self-learning.',
    icon: '🌱',
  },
  'Communication': {
    connectedGoals: ['Build & Launch a Tech Startup', 'Lead Technical Product Manager'],
    synergy: 'Polishes executive presentation, strategic pitching, active team collaboration, and alignment.',
    icon: '🗣️',
  },
  'Database & SQL/NoSQL': {
    connectedGoals: ['Become a Full Stack Engineer', 'Senior Distributed System Architect', 'Lead Data & ML Engineer'],
    synergy: 'Enables high-performance index setups, schema layouts, and persistent data access layers.',
    icon: '🗄️',
  },
  'API Design & GraphQL': {
    connectedGoals: ['Become a Full Stack Engineer', 'LLM Agentic Systems Specialist'],
    synergy: 'Facilitates clean REST endpoints, GraphQL microservices, and client-server communication.',
    icon: '🔌',
  },
  'Data Engineering & ETL': {
    connectedGoals: ['Lead Data & ML Engineer'],
    synergy: 'Orchestrates large-scale pipelines, ETL structures, and vector database architectures.',
    icon: '🔀',
  },
  'Embedded Systems & IoT': {
    connectedGoals: ['Robotics & Automation Engineer'],
    synergy: 'Blends physical microcontroller circuits, custom firmware, and local communication modules.',
    icon: '🔌',
  },
  'Game Development': {
    connectedGoals: ['AR/VR Spatial Computing Developer', 'Become a Full Stack Engineer'],
    synergy: 'Enables real-time 3D colliders, physics simulation, spatial mathematics, and gameplay logic.',
    icon: '🎮',
  },
  'Deep Learning & Vision': {
    connectedGoals: ['Become an AI Engineer', 'Lead Data & ML Engineer'],
    synergy: 'Builds convolutional networks, object detection systems, and spatial segmentation models.',
    icon: '👁️',
  },
  'NLP & Language Models': {
    connectedGoals: ['Become an AI Engineer', 'LLM Agentic Systems Specialist'],
    synergy: 'Orchestrates tokenizers, transformers, sentiment models, and text embedding modules.',
    icon: '💬',
  },
  'Product Management': {
    connectedGoals: ['Lead Technical Product Manager'],
    synergy: 'Defines product requirement docs, coordinates sprints, and aligns release schedules.',
    icon: '📋',
  },
  'Digital Marketing & Growth': {
    connectedGoals: ['Build & Launch a Tech Startup', 'Lead Technical Product Manager'],
    synergy: 'Accelerates search optimization, customer funnels, retention loops, and analytics dashboard growth.',
    icon: '📈',
  },
  'Public Speaking': {
    connectedGoals: ['Lead Technical Product Manager', 'Build & Launch a Tech Startup'],
    synergy: 'Improves keynotes, body language command, vocal structure, and large audience engagement.',
    icon: '🎙️',
  },
  'Time Management': {
    connectedGoals: ['Peak Fitness & Mindset Mastery'],
    synergy: 'Optimizes daily scheduling, time boxing, habit triggers, and goal tracking intervals.',
    icon: '⏳',
  },
  'Executive Leadership': {
    connectedGoals: ['Build & Launch a Tech Startup', 'Lead Technical Product Manager'],
    synergy: 'Supports team delegation, milestone planning, performance metrics, and organizational values.',
    icon: '👑',
  }
};

export const COURSE_MAPPING = {
  'Full Stack Development': { id: 'fullstack', title: 'Full Stack Web Engineering', icon: '💻', current: 'HTML, CSS & React Foundations', next: 'Node.js & Express REST APIs' },
  'Prompt Engineering': { id: 'prompt', title: 'LLM & Prompt Architecture', icon: '🤖', current: 'Zero-Shot & Few-Shot Prompts', next: 'Autonomous Agent Orchestration' },
  'Quantum Computing': { id: 'quantum', title: 'Quantum Algorithms & Qubits', icon: '⚛️', current: 'Superposition & Qubit States', next: 'Quantum Entanglement Simulation' },
  'AI & Machine Learning': { id: 'ai_ml', title: 'AI Foundations & ML Engineering', icon: '🧠', current: 'Supervised vs Unsupervised ML', next: 'Neural Network Architectures' },
  'Data Science': { id: 'datascience', title: 'Data Science & Analytics', icon: '📊', current: 'Data Cleansing & Pandas Dataframes', next: 'Statistical Models & Regression' },
  'Cyber Security': { id: 'security', title: 'Cyber Security Operations', icon: '🛡️', current: 'Network Encryption Basics', next: 'Penetration Testing Frameworks' },
  'Cloud & DevOps': { id: 'cloud', title: 'Cloud DevOps & Systems', icon: '☁️', current: 'CI/CD Pipeline Automation', next: 'Serverless Kubernetes Clusters' },
  'Mobile App Development': { id: 'mobile', title: 'Mobile App Development', icon: '📱', current: 'Dart & Flutter Widgets', next: 'State Management with Provider' },
  'UI/UX Design': { id: 'uiux', title: 'UI/UX Design & Product Strategy', icon: '🎨', current: 'Wireframing & Typography Principles', next: 'Advanced Interactive Prototyping' },
  'Blockchain': { id: 'blockchain', title: 'Blockchain & Web3 Developer', icon: '⛓️', current: 'Smart Contracts & Solidity', next: 'Decentralized Apps (dApps) Deployment' },
  'Competitive Exams': { id: 'dsa_exams', title: 'Competitive Exams Prep & DSA', icon: '📝', current: 'Time Complexities & Sorting Algorithms', next: 'Graph Algorithms & Shortest Path' },
  'Fitness & Health': { id: 'fitness', title: 'Fitness & Wellness Blueprint', icon: '🏋️', current: 'Nutrition & Daily Hydration Goals', next: 'High-Intensity Interval Training' },
  'Finance & Investing': { id: 'finance', title: 'Finance & Wealth Management', icon: '💰', current: 'Compound Interest & Saving Rules', next: 'Stock Market Indices & Crypto Assets' },
  'Entrepreneurship': { id: 'startup', title: 'Business Strategy & Startups', icon: '🚀', current: 'Building MVPs & Validating Ideas', next: 'Scaling Pitch Decks & Venture Capital' },
  'Personal Growth': { id: 'growth', title: 'Leadership & Personal Mastery', icon: '🌱', current: 'Growth Mindset & Bullet Journaling', next: 'Emotional Intelligence & Stress Control' },
  'Communication': { id: 'communication_course', title: 'Advanced Pitching & Communication', icon: '🗣️', current: 'Active Listening & Public Presentation', next: 'Negotiation Skills & Persuasion' },
  'LLM & Agentic AI': { id: 'agentic', title: 'LLM & Agentic AI Orchestration', icon: '🤖', current: 'Multi-Agent Frameworks (CrewAI)', next: 'Agentic Tool-Use & Autopilot Coding' },
  'Generative AI & RAG': { id: 'rag', title: 'Generative AI & RAG Architectures', icon: '✨', current: 'Vector Embeddings & Pinecone Setup', next: 'Hybrid Search & Retrieval Optimization' },
  'Frontend & React': { id: 'frontend', title: 'Frontend React Development', icon: '⚛️', current: 'JSX Syntax & State Hooks', next: 'Custom Hooks & Context API Integration' },
  'Backend & Microservices': { id: 'backend', title: 'Backend & Microservices', icon: '⚙️', current: 'REST API Design with Express.js', next: 'Message Queues (RabbitMQ) & Auth' },
  'System Architecture': { id: 'sys_arch', title: 'System Architecture & Distribution', icon: '📐', current: 'Load Balancing & Database Sharding', next: 'Microservice Design Patterns' },
  'Database & SQL/NoSQL': { id: 'database', title: 'Database Engineering', icon: '🗄️', current: 'SQL Queries & Index Optimization', next: 'NoSQL Schemas with MongoDB' },
  'API Design & GraphQL': { id: 'api_design', title: 'API Design & GraphQL Masterclass', icon: '🔌', current: 'GraphQL Schemas & Resolvers', next: 'Apollo Client & Server Configuration' },
  'Data Engineering & ETL': { id: 'data_eng', title: 'Data Engineering & ETL Pipelines', icon: '🔀', current: 'Apache Spark Dataframes', next: 'ETL Pipelines with Apache Airflow' },
  'Embedded Systems & IoT': { id: 'iot', title: 'Embedded Systems & IoT Engineering', icon: '🔌', current: 'Microcontrollers & Sensor Inputs', next: 'Wireless Protocols (MQTT) Setup' },
  'Robotics & Automation': { id: 'robotics', title: 'Robotics & Process Automation', icon: '🤖', current: 'ROS2 (Robot Operating System) Setup', next: 'Kinematics & Path Planning' },
  'AR/VR & Spatial Computing': { id: 'arvr', title: 'AR/VR & Spatial Design', icon: '🥽', current: '3D Mesh Optimization in Unity', next: 'Spatial Audio & Haptic Feedback' },
  'Game Development': { id: 'game', title: 'Game Development (Unity/Unreal)', icon: '🎮', current: 'C# Physics & Colliders in Unity', next: 'AI Pathfinding & Navigation Meshes' },
  'Ethical Hacking': { id: 'hacking', title: 'Ethical Hacking & Penetration Testing', icon: '🔓', current: 'OWASP Top 10 Vulnerabilities', next: 'Wireshark Network Traffic Analysis' },
  'Deep Learning & Vision': { id: 'deep_learning', title: 'Deep Learning & Computer Vision', icon: '👁️', current: 'Convolutional Neural Networks (CNNs)', next: 'Object Detection with YOLOv8' },
  'NLP & Language Models': { id: 'nlp', title: 'Natural Language Processing', icon: '💬', current: 'Word Embeddings & Tokenization', next: 'Transformer Networks (Attention Mechanism)' },
  'Product Management': { id: 'product', title: 'Technical Product Management', icon: '📋', current: 'PRD (Product Requirement Doc) Writing', next: 'Agile Sprints & Product Roadmap Metrics' },
  'Digital Marketing & Growth': { id: 'marketing', title: 'Digital Growth Marketing', icon: '📈', current: 'SEO Strategy & Core Web Vitals', next: 'A/B Testing & Conversion Funnels' },
  'Public Speaking': { id: 'public_speaking', title: 'Public Speaking & Keynotes', icon: '🎙️', current: 'Vocal Projection & Body Language', next: 'TED Talk Structure & Storytelling' },
  'Time Management': { id: 'time_management', title: 'High Productivity & Habits', icon: '⏳', current: 'Eisenhower Matrix & Time Boxing', next: 'Atomic Habits & Habit Stacking Systems' },
  'Executive Leadership': { id: 'leadership', title: 'Executive Leadership & Strategy', icon: '👑', current: 'OKRs (Objectives & Key Results) Setup', next: 'Conflict Resolution & Team Building' }
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

export default function OnboardingPage({ onComplete, onBack }) {
  const { state, update, updateUser } = useApp();
  const [step, setStep] = useState(1);
  const [form1, setForm1] = useState({ name: state.user?.name || '', age: state.user?.age || '', profession: state.user?.profession || 'Student' });
  const [selectedAreas, setSelectedAreas] = useState(['Full Stack Development', 'Prompt Engineering', 'Quantum Computing', 'LLM & Agentic AI', 'Generative AI & RAG']);
  const [selectedGoal, setSelectedGoal] = useState('Become a Prompt Engineer & AI Architect');
  const [customGoal, setCustomGoal] = useState('');
  const [selectedTime, setSelectedTime] = useState('2 Hours');
  const [timeQuery, setTimeQuery] = useState('');
  const [selectedSlots, setSelectedSlots] = useState(['Morning', 'Afternoon', 'Evening', 'Night']);
  const [buildDone, setBuildDone] = useState(false);

  // Gemini Predictive States
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [predictedGoal, setPredictedGoal] = useState('');
  const [predictedJobs, setPredictedJobs] = useState([]);

  const runGeminiPrediction = useCallback(async () => {
    setIsPredicting(true);
    setPredictionError(null);

    const skillsString = selectedAreas.join(', ');
    const promptText = `Analyze these 5 priority tech/career skills selected by a student: [${skillsString}].
Predict:
1. One primary target career goal that fits these skills (e.g., 'Become a Full Stack Engineer', 'Become an AI Engineer', etc. Select or closely align with one of these goals: 'Become a Full Stack Engineer', 'Become a Prompt Engineer & AI Architect', 'Quantum Computing Specialist', 'Become an AI Engineer', 'LLM Agentic Systems Specialist', 'Generative AI & RAG Architect', 'Senior Distributed System Architect', 'Robotics & Automation Engineer', 'Ethical Hacker & Security Lead', 'Lead Data & ML Engineer', 'AR/VR Spatial Computing Developer', 'Lead Technical Product Manager', 'Build & Launch a Tech Startup', 'Crack UPSC / Competitive Exams', 'Financial Independence & Wealth', 'Peak Fitness & Mindset Mastery').
2. Up to 4 job roles they qualify for, including job title, expected salary (e.g. '$130,000 - $160,000'), match percentage score (e.g. 92), demand level (e.g. 'EXTREME', 'VERY HIGH'), and matching skills they selected.

Return ONLY a valid JSON object matching this structure exactly (do not include any markdown format blocks or text, just the raw JSON):
{
  "predictedGoal": "string matching one of the target goals",
  "jobs": [
    {
      "title": "string",
      "salary": "string",
      "matchScore": number,
      "demand": "string",
      "skills": ["string"]
    }
  ]
}`;

    const key = apiKey || localStorage.getItem('gemini_api_key');
    if (key) {
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: promptText
              }]
            }],
            generationConfig: {
              responseMimeType: "application/json"
            }
          })
        });

        if (!response.ok) {
          throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (responseText) {
          const parsed = JSON.parse(responseText.trim());
          if (parsed.predictedGoal) {
            setSelectedGoal(parsed.predictedGoal);
            setPredictedGoal(parsed.predictedGoal);
          }
          if (parsed.jobs && Array.isArray(parsed.jobs)) {
            setPredictedJobs(parsed.jobs);
          }
          setIsPredicting(false);
          return;
        }
      } catch (err) {
        console.error("Gemini API call failed, falling back to local model:", err);
        setPredictionError("Could not connect to Gemini API. Falling back to local predictive emulation.");
      }
    }

    // FALLBACK: Local Predictive Emulation
    const firstSkill = selectedAreas[0];
    const match = CONNECTIONS[firstSkill]?.connectedGoals[0] || 'Become a Prompt Engineer & AI Architect';
    setSelectedGoal(match);
    setPredictedGoal(match);

    const matchedJobs = JOB_ROLES.filter(job =>
      job.skills.some(skill => selectedAreas.includes(skill))
    );
    setPredictedJobs(matchedJobs.length > 0 ? matchedJobs : JOB_ROLES.slice(0, 4));

    setIsPredicting(false);
  }, [selectedAreas, apiKey, setSelectedGoal]);

  useEffect(() => {
    if (step === 3) {
      runGeminiPrediction();
    }
  }, [step, runGeminiPrediction]);

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

  const handleStep2 = useCallback(() => {
    if (selectedAreas.length === 0) return;
    update({ selectedAreas });
    updateUser({ focusAreas: selectedAreas });

    const connectedGoalIds = new Set();
    selectedAreas.forEach(area => {
      const conn = CONNECTIONS[area];
      if (conn) {
        conn.connectedGoals.forEach(g => connectedGoalIds.add(g));
      }
    });

    if (!connectedGoalIds.has(selectedGoal)) {
      const firstSkill = selectedAreas[0];
      const match = CONNECTIONS[firstSkill]?.connectedGoals[0];
      if (match) {
        setSelectedGoal(match);
      }
    }
    setStep(3);
  }, [selectedAreas, selectedGoal, update, updateUser]);

  function handleStep3() {
    const goal = customGoal || selectedGoal || 'Become a Prompt Engineer & AI Architect';
    update({ mainGoal: goal });
    updateUser({ mainGoal: goal });
    setStep(4);
  }

  function handleStep4() {
    if (!selectedTime) return;
    update({ selectedTime, timeslots: selectedSlots });
    setStep(5);
  }

  const handleFinalize = useCallback(() => {
    const finalGoal = customGoal || selectedGoal || 'Become a Prompt Engineer & AI Architect';
    
    // Map selected skills to unlocked courses
    const unlocked = selectedAreas.map((area, idx) => {
      const match = COURSE_MAPPING[area];
      if (match) {
        return {
          id: match.id,
          title: match.title,
          progress: idx === 0 ? 12 : 0, // 12% progress on first core course
          current: match.current,
          next: match.next,
          locked: false
        };
      }
      return null;
    }).filter(Boolean);

    // Fallbacks or default courses to keep list full (locked status)
    const defaultLocked = [
      { id: 'python', title: 'Python Mastery', progress: 68, current: 'Data Structures', next: 'Machine Learning', locked: false },
      { id: 'ai', title: 'AI Foundations', progress: 42, current: 'Neural Networks', next: 'Model Deployment', locked: false },
      { id: 'flutter', title: 'Flutter Developer', progress: 24, current: 'Widgets', next: 'State Management', locked: false },
      { id: 'business', title: 'Business Strategy', progress: 14, current: 'Market Study', next: 'Product Roadmap', locked: true }
    ];

    const finalCourses = [...unlocked];
    defaultLocked.forEach(def => {
      if (!finalCourses.some(c => c.id === def.id)) {
        finalCourses.push(def);
      }
    });

    update({ 
      onboardingComplete: true, 
      selectedAreas, 
      mainGoal: finalGoal,
      courses: finalCourses,
      quiz: {
        activeTopic: 'all',
        questions: getQuestionsForUserTopics(selectedAreas, 5),
        current: 0,
        score: 0,
      }
    });
    updateUser({ 
      focusAreas: selectedAreas, 
      mainGoal: finalGoal 
    });
    onComplete();
  }, [selectedAreas, selectedGoal, customGoal, update, updateUser, onComplete]);

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
            {(step > 1 || onBack) && (
              <button type="button" className="back-btn" onClick={() => {
                if (step > 1) {
                  setStep(prev => prev - 1);
                } else if (onBack) {
                  onBack();
                }
              }}>
                ← Back
              </button>
            )}
          </div>
          <h2 style={{ margin: 0 }}>{STEP_TITLES[step]}</h2>
          <p style={{ color: 'var(--muted)', margin: 0 }}>
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
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              {onBack && (
                <button type="button" className="back-btn" onClick={onBack}>
                  ← Back
                </button>
              )}
              <button className="primary-btn full" onClick={handleStep1}>Continue to Skills →</button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="onboard-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h3 style={{ margin: 0 }}>What matters most to you?</h3>
                <p style={{ color: 'var(--muted)', margin: '0.2rem 0 0', fontSize: '0.88rem' }}>
                  Select up to 5 priority skills (36 available tech & life domains).
                </p>
              </div>
              <span className="selection-note" style={{ fontWeight: 700, color: '#76f5ff', fontSize: '0.95rem' }}>
                {selectedAreas.length} / 5 Selected
              </span>
            </div>

            {/* Quick Presets */}
            <div className="quick-preset-row">
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>Popular Skill Stacks:</span>
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
                      <span style={{ fontSize: '0.72rem', color: isActive ? '#76f5ff' : 'rgba(0, 0, 0, 0.5)' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
              <h3 style={{ margin: 0 }}>What future are you building?</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="online" style={{ background: apiKey ? '#22c55e' : '#f59e0b' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
                  {apiKey ? 'Gemini 2.5 Active' : 'Local Emulation'}
                </span>
                <button 
                  type="button" 
                  className="text-button" 
                  style={{ fontSize: '0.8rem', color: 'var(--blue)', marginLeft: '0.5rem', border: 'none', background: 'none', cursor: 'pointer' }} 
                  onClick={() => setShowApiKeyInput(s => !s)}
                >
                  {apiKey ? '🔑 Change Key' : '🔑 Connect Key'}
                </button>
              </div>
            </div>

            {showApiKeyInput && (
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <input 
                  type="password" 
                  placeholder="Paste Gemini API Key from Google AI Studio..." 
                  className="onboard-input" 
                  style={{ flex: 1, margin: 0, padding: '0.5rem 0.8rem', fontSize: '0.85rem', height: '36px' }}
                  value={apiKey}
                  onChange={(e) => {
                    setApiKey(e.target.value);
                    localStorage.setItem('gemini_api_key', e.target.value);
                  }}
                />
                <button 
                  type="button" 
                  className="primary-btn" 
                  style={{ padding: '0 1rem', fontSize: '0.85rem', height: '36px' }}
                  onClick={() => {
                    setShowApiKeyInput(false);
                    runGeminiPrediction();
                  }}
                >
                  Predict
                </button>
              </div>
            )}

            {isPredicting ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', background: 'rgba(59, 130, 246, 0.03)', borderRadius: '24px', border: '1px dashed rgba(59, 130, 246, 0.3)', margin: '1rem 0' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(0,0,0,0.06)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <strong style={{ marginTop: '1.2rem', color: 'var(--blue)', fontSize: '1rem' }}>🤖 Gemini Predicting Goals & Jobs...</strong>
                <p style={{ margin: '0.5rem 0 0', color: 'var(--muted)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Synthesizing your {selectedAreas.length} selected focus areas and scanning target industry compensation...
                </p>
              </div>
            ) : (
              <>
                {/* Skill Connection Banner */}
                <div className="connection-banner" style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1.2rem' }}>⚡</span>
                    <strong style={{ color: 'var(--text)', fontSize: '0.95rem' }}>
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
                <h4 style={{ margin: '0.5rem 0 0.8rem', color: '#c3d1ff' }}>Target Future Goals:</h4>
                <div className="goal-grid">
                  {/* Gemini Recommended Custom Card */}
                  {predictedGoal && !GOAL_ITEMS.some(g => g.id === predictedGoal) && (
                    <button
                      type="button"
                      className={`tag-card active goal-card-connected`}
                      onClick={() => { setSelectedGoal(predictedGoal); setCustomGoal(''); }}
                      style={{ border: '2px solid var(--blue)' }}
                    >
                      <div className="tag-card-content">
                        <span className="connected-badge" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--blue)' }}>
                          ✨ Gemini Recommended
                        </span>
                        <span className="tag-icon">🚀</span>
                        <span className="tag-label">{predictedGoal}</span>
                      </div>
                    </button>
                  )}
                  {GOAL_ITEMS.map(goal => {
                    const isSelected = (customGoal ? customGoal === goal.id : selectedGoal === goal.id);
                    const isConnected = connectedGoalIds.has(goal.id) || predictedGoal === goal.id;
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
                              {predictedGoal === goal.id ? '✨ Gemini Suggested' : '⚡ Skill Connected'}
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
                <div className="jobs-section" style={{ marginTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.25rem' }}>💼</span>
                      <strong style={{ fontSize: '1rem', color: '#76f5ff' }}>
                        Job Roles & Careers Unlocked by Your Selected Skills:
                      </strong>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>
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
                          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', display: 'block', marginBottom: '0.3rem' }}>
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

                {/* Structured Learning Courses Unlocked */}
                <div className="jobs-section" style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                    <span style={{ fontSize: '1.25rem' }}>📚</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--blue)' }}>
                      Personalized Courses Unlocked by Your Selected Skills:
                    </strong>
                  </div>
                  <div className="jobs-grid">
                    {selectedAreas.map(area => {
                      const match = COURSE_MAPPING[area];
                      if (!match) return null;
                      return (
                        <div key={area} className="job-card" style={{ gap: '0.5rem' }}>
                          <div className="job-card-head" style={{ marginBottom: 0 }}>
                            <h5 className="job-title" style={{ fontSize: '0.95rem' }}>{match.icon} {match.title}</h5>
                            <span className="job-match" style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--blue)' }}>Core</span>
                          </div>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>
                            <strong>Current Unit:</strong> {match.current}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)' }}>
                            <strong>Next Unit:</strong> {match.next}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Skill-to-Goal Synergy Connection Explanation Box */}
                {selectedGoal && (
                  <div className="synergy-box" style={{ marginTop: '1rem' }}>
                    <div className="synergy-title">
                      <span>🔗 SKILLS TO GOAL CONNECTION SYNERGY</span>
                    </div>
                    <p style={{ margin: 0, color: 'var(--text)', fontSize: '0.92rem', lineHeight: '1.5' }}>
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

                <label style={{ marginTop: '1.25rem' }}>Or write your custom future goal</label>
                <input
                  className="onboard-input"
                  type="text"
                  placeholder="e.g. Master Full Stack + Prompt Engineering & Quantum AI"
                  value={customGoal}
                  onChange={e => setCustomGoal(e.target.value)}
                />
                
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                  <button type="button" className="back-btn" onClick={() => setStep(2)}>
                    ← Back
                  </button>
                  <button className="primary-btn full" onClick={handleStep3}>
                    Continue to Daily Schedule →
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="onboard-card">
            <h3 style={{ margin: 0 }}>How much time can you invest every day?</h3>
            <p style={{ color: 'var(--muted)', margin: '0.2rem 0 0', fontSize: '0.88rem' }}>
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
              <span style={{ fontSize: '0.8rem', color: 'var(--muted)', display: 'block', marginBottom: '0.4rem' }}>
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

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button type="button" className="back-btn" onClick={() => setStep(3)}>
                ← Back
              </button>
              <button className="primary-btn full" onClick={handleStep4} disabled={!selectedTime}>
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
