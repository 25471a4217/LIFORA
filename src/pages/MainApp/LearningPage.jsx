import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';

const ALL_VIDEO_LESSONS = [
  {
    id: 'v1',
    topic: 'Full Stack Development',
    category: 'Web Development',
    title: 'Full Stack Web Development - HTML, CSS, React & Node.js',
    channel: 'freeCodeCamp.org',
    duration: '2h 15m',
    level: 'Beginner to Advanced',
    youtubeId: 'nu_pCVPKzTk',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    description: 'Complete hands-on masterclass building full-stack web applications with modern APIs and React architecture.'
  },
  {
    id: 'v2',
    topic: 'Prompt Engineering',
    category: 'AI',
    title: 'Mastering Prompt Engineering & LLM System Architecture',
    channel: 'AI Tech Insights',
    duration: '45m',
    level: 'Intermediate',
    youtubeId: 'jC4v5AS4RIM',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    description: 'Learn chain-of-thought prompting, zero-shot/few-shot tuning, and building autonomous LLM agents.'
  },
  {
    id: 'v3',
    topic: 'Quantum Computing',
    category: 'AI',
    title: 'Quantum Computing & Qubit Mechanics for Developers',
    channel: 'Microsoft Research',
    duration: '1h 10m',
    level: 'Advanced',
    youtubeId: 'F_Riqjdh2oM',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
    description: 'Deep dive into quantum entanglement, Qiskit circuits, superposition, and quantum algorithm speedups.'
  },
  {
    id: 'v4',
    topic: 'AI & ML',
    category: 'AI',
    title: 'Neural Networks & Deep Learning Intuition',
    channel: '3Blue1Brown',
    duration: '1h 30m',
    level: 'Intermediate',
    youtubeId: 'aircAruvnKk',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
    description: 'Visual mathematical breakdown of backpropagation, activation functions, and gradient descent.'
  },
  {
    id: 'v5',
    topic: 'Python',
    category: 'Python',
    title: 'Python Programming Masterclass - Zero to Hero',
    channel: 'Programming with Mosh',
    duration: '1h 00m',
    level: 'Beginner',
    youtubeId: 'rfscVS0vtbw',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    description: 'Master core syntax, data structures, object-oriented concepts, and automated scripting.'
  },
  {
    id: 'v6',
    topic: 'Flutter',
    category: 'Flutter',
    title: 'Flutter & Dart Mobile App Development Blueprint',
    channel: 'Academind',
    duration: '1h 45m',
    level: 'Beginner',
    youtubeId: 'VPvVD8t02U8',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
    description: 'Create cross-platform iOS and Android apps using stateful widgets, Provider, and REST backend.'
  },
  {
    id: 'v7',
    topic: 'Entrepreneurship',
    category: 'Business',
    title: 'Building Scalable Startups & Product-Market Fit',
    channel: 'Y Combinator',
    duration: '50m',
    level: 'All Levels',
    youtubeId: 'CBYhX5cTL5A',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80',
    description: 'Proven founder framework for validating startup ideas, building MVPs, and scaling user traction.'
  },
  {
    id: 'v8',
    topic: 'Java',
    category: 'Java',
    title: 'Java Data Structures & Algorithms Deep Dive',
    channel: 'Bro Code',
    duration: '2h 00m',
    level: 'Intermediate',
    youtubeId: 'xk4_1vDrzzo',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    description: 'Master binary trees, hash maps, graph algorithms, and competitive programming patterns.'
  },
  {
    id: 'v9',
    topic: 'Web Development',
    category: 'Web Development',
    title: 'Modern CSS Grid, Flexbox & UI Glassmorphism',
    channel: 'Kevin Powell',
    duration: '35m',
    level: 'Beginner',
    youtubeId: 'rg7Fvvl3taU',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    description: 'Step-by-step masterclass on creating stunning, responsive layouts with modern CSS utilities.'
  }
];

const CATEGORIES = ['All Topics', 'My Selected Topics', 'AI', 'Python', 'Full Stack', 'Prompt Engineering', 'Quantum Computing', 'Flutter', 'Java', 'Web Development', 'Business'];

const COURSE_MATERIALS = {
  python: [
    { name: 'Python Cheat Sheet (PDF)', url: 'https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf' },
    { name: 'Official Documentation', url: 'https://docs.python.org/3/' }
  ],
  ai: [
    { name: 'Machine Learning Cheat Sheet', url: 'https://github.com/soulmachine/machine-learning-cheat-sheet' },
    { name: 'Kaggle Intro Course', url: 'https://www.kaggle.com/learn/intro-to-machine-learning' }
  ],
  flutter: [
    { name: 'Flutter Codelabs', url: 'https://docs.flutter.dev/get-started/codelabs' },
    { name: 'Dart Language Tour', url: 'https://dart.dev/guides/language/language-tour' }
  ],
  business: [
    { name: 'Y Combinator Startup School', url: 'https://www.startupschool.org/' },
    { name: 'Paul Graham Essays', url: 'http://www.paulgraham.com/articles.html' }
  ]
};

export default function LearningPage({ onOpenCourse }) {
  const { state } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('My Selected Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const userFocus = state.user.focusAreas || state.selectedAreas || [];

  // Filter video lessons based on selected category and search query
  const filteredVideos = ALL_VIDEO_LESSONS.filter(video => {
    const matchesSearch = (
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.channel.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (!matchesSearch) return false;

    if (selectedCategory === 'All Topics') return true;

    if (selectedCategory === 'My Selected Topics') {
      return userFocus.some(f => 
        video.topic.toLowerCase().includes(f.toLowerCase()) ||
        f.toLowerCase().includes(video.topic.toLowerCase()) ||
        video.category.toLowerCase().includes(f.toLowerCase())
      );
    }

    return (
      video.category.toLowerCase() === selectedCategory.toLowerCase() ||
      video.topic.toLowerCase().includes(selectedCategory.toLowerCase())
    );
  });

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <span className="eyebrow">Learning Hub & Video Academy</span>
          <h2 style={{ margin: 0 }}>Explore Knowledge & Video Tutorials</h2>
          <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0', fontSize: '0.9rem' }}>
            Video lessons curated specifically for your selected topics: <strong>{userFocus.slice(0, 4).join(', ')}</strong>
          </p>
        </div>
        <input 
          className="onboard-input learning-search" 
          type="search" 
          placeholder="Search topics, tutorials, videos..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ maxWidth: 380, marginTop: 0 }} 
        />
      </div>

      {/* Category Pills */}
      <div className="category-row" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        {CATEGORIES.map(cat => (
          <button 
            key={cat} 
            className={`pill-card ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem 1.2rem',
              borderRadius: '999px',
              border: selectedCategory === cat ? '1px solid #86b7ff' : '1px solid var(--border)',
              background: selectedCategory === cat ? 'linear-gradient(135deg, rgba(51,93,209,0.4), rgba(141,92,247,0.3))' : 'rgba(0, 0, 0, 0.04)',
              color: selectedCategory === cat ? '#ffffff' : 'var(--text)',
              fontWeight: selectedCategory === cat ? '600' : '400',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat === 'My Selected Topics' ? '⭐ My Selected Topics' : cat}
          </button>
        ))}
      </div>

      {/* Recommended Interactive Courses */}
      <div className="section-title" style={{ margin: '1rem 0 0.8rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#eef3ff' }}>Structured Learning Modules</h3>
      </div>
      <div className="course-grid">
        {state.courses.map(course => (
          <article key={course.id} className={`course-card${course.locked ? ' locked' : ''}`}>
            <span className="eyebrow">{course.title}</span>
            <h3>{course.progress}% complete</h3>
            <p style={{ color: 'var(--muted)', margin: '0 0 0.4rem' }}>Current: {course.current}</p>
            <p style={{ color: 'var(--muted)', margin: '0 0 1.2rem' }}>
              {course.locked ? 'Locked until core skills improve' : `Next: ${course.next}`}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.2rem', padding: '0.8rem', borderRadius: '12px', background: 'rgba(0, 0, 0, 0.02)', border: '1px solid rgba(0, 0, 0, 0.06)' }}>
              <span style={{ fontSize: '0.78rem', color: 'rgba(0, 0, 0, 0.4)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>📚 Course Materials</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {(COURSE_MATERIALS[course.id] || [
                  { name: `${course.title} Documentation Guide (PDF)`, url: 'https://github.com' },
                  { name: 'Core Concept Reference Manual', url: 'https://google.com' }
                ]).map((m, idx) => (
                  <a 
                    key={idx} 
                    href={m.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ fontSize: '0.8rem', color: 'var(--blue)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>🔗</span> <span className="hover-underline">{m.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <button className="ghost-btn" onClick={() => !course.locked && onOpenCourse(course.id)} disabled={course.locked}>
              {course.locked ? 'Locked 🔒' : 'Open Course →'}
            </button>
          </article>
        ))}
      </div>

      {/* Video Lessons Section */}
      <div className="video-section">
        <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <span className="eyebrow" style={{ color: '#86b7ff' }}>CURATED VIDEO TUTORIALS</span>
            <h3 style={{ margin: '0.2rem 0 0', fontSize: '1.3rem' }}>
              Videos for "{selectedCategory}" ({filteredVideos.length})
            </h3>
          </div>
          {selectedCategory === 'My Selected Topics' && (
            <span className="chip" style={{ fontSize: '0.8rem' }}>
              🎯 Personal OS Recommendation
            </span>
          )}
        </div>

        {filteredVideos.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', background: 'rgba(0, 0, 0, 0.02)', borderRadius: '20px', marginTop: '1rem' }}>
            <p style={{ color: 'var(--muted)' }}>No video tutorials found for this selection. Try choosing "All Topics" or searching another keyword.</p>
          </div>
        ) : (
          <div className="video-grid">
            {filteredVideos.map(video => (
              <article 
                key={video.id} 
                className="video-card"
                onClick={() => setActiveVideo(video)}
              >
                <div className="video-thumb-wrapper">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="video-thumb-img" 
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="video-play-overlay">
                    <div className="play-icon-badge">▶</div>
                  </div>
                  <span className="video-duration-badge">⏱ {video.duration}</span>
                </div>
                <div className="video-card-body">
                  <div>
                    <span className="video-topic-tag">🏷️ {video.topic}</span>
                    <h4 className="video-title">{video.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '0.82rem', margin: '0 0 0.8rem' }}>
                      {video.description}
                    </p>
                  </div>
                  <div className="video-meta">
                    <span>📺 {video.channel}</span>
                    <span style={{ background: 'var(--border)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem' }}>
                      {video.level}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <Modal 
          title={`▶ ${activeVideo.title}`}
          onClose={() => setActiveVideo(null)}
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                Channel: <strong>{activeVideo.channel}</strong> • Level: <strong>{activeVideo.level}</strong>
              </span>
              <button className="primary-btn" onClick={() => setActiveVideo(null)}>Done Watching</button>
            </div>
          }
        >
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="video-player-container">
              <iframe
                className="video-iframe"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.5rem 0' }}>
                <span className="chip">Topic: {activeVideo.topic}</span>
                <span className="chip" style={{ background: 'rgba(0, 0, 0, 0.06)', color: '#fff' }}>Duration: {activeVideo.duration}</span>
              </div>
              <p style={{ color: 'var(--text)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                {activeVideo.description}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
