import { useState } from 'react';
import Modal from '../../components/Modal';

const COURSE_DETAILS = {
  python: {
    title: 'Python Mastery',
    progress: 68,
    materials: [
      { name: 'Python Cheat Sheet (PDF)', url: 'https://perso.limsi.fr/pointal/_media/python:cours:mementopython3-english.pdf', type: 'PDF' },
      { name: 'Official Python Documentation', url: 'https://docs.python.org/3/', type: 'Documentation' },
      { name: 'W3Schools Python Tutorial', url: 'https://www.w3schools.com/python/', type: 'Tutorial' }
    ],
    videos: [
      { title: 'Python Basics & Variables', youtubeId: 'rfscVS0vtbw', duration: '25m', status: 'complete' },
      { title: 'Functions & Modules', youtubeId: 'rfscVS0vtbw', duration: '35m', status: 'complete' },
      { title: 'Object-Oriented Programming (OOP)', youtubeId: 'rfscVS0vtbw', duration: '40m', status: 'complete' },
      { title: 'Data Structures & Algorithms', youtubeId: '8hly31xKLI0', duration: '50m', status: 'current' },
      { title: 'Machine Learning Fundamentals', youtubeId: 'aircAruvnKk', duration: '1h 10m', status: 'locked' },
    ]
  },
  ai: {
    title: 'AI Foundations',
    progress: 42,
    materials: [
      { name: 'Machine Learning Cheat Sheet', url: 'https://github.com/soulmachine/machine-learning-cheat-sheet', type: 'Cheat Sheet' },
      { name: 'Kaggle Intro to ML Course', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', type: 'Practice' },
      { name: 'Hugging Face NLP Course', url: 'https://huggingface.co/learn/nlp-course', type: 'Course' }
    ],
    videos: [
      { title: 'Intro to Neural Networks', youtubeId: 'aircAruvnKk', duration: '30m', status: 'complete' },
      { title: 'Deep Learning & Backpropagation', youtubeId: 'aircAruvnKk', duration: '45m', status: 'current' },
      { title: 'Model Deployment (FastAPI & Docker)', youtubeId: 'rfscVS0vtbw', duration: '1h 05m', status: 'locked' }
    ]
  },
  flutter: {
    title: 'Flutter Developer',
    progress: 24,
    materials: [
      { name: 'Flutter Codelabs', url: 'https://docs.flutter.dev/get-started/codelabs', type: 'Codelabs' },
      { name: 'Dart Language Tour', url: 'https://dart.dev/guides/language/language-tour', type: 'Documentation' },
      { name: 'Flutter State Management Guide', url: 'https://docs.flutter.dev/development/data-and-backend/state-mgmt/options', type: 'Guide' }
    ],
    videos: [
      { title: 'Setup Flutter & Dart Environment', youtubeId: 'VPvVD8t02U8', duration: '30m', status: 'complete' },
      { title: 'Stateless vs Stateful Widgets', youtubeId: 'VPvVD8t02U8', duration: '45m', status: 'current' },
      { title: 'Provider & Riverpod State Management', youtubeId: 'VPvVD8t02U8', duration: '50m', status: 'locked' }
    ]
  },
  business: {
    title: 'Business Strategy',
    progress: 14,
    materials: [
      { name: 'Startup Playbook by Sam Altman', url: 'https://playbook.samaltman.com/', type: 'Playbook' },
      { name: 'Y Combinator Startup School', url: 'https://www.startupschool.org/', type: 'Library' },
      { name: 'Lean Startup Methodology Guide', url: 'https://theleanstartup.com/', type: 'Guide' }
    ],
    videos: [
      { title: 'Idea Validation & Market Fit', youtubeId: 'CBYhX5cTL5A', duration: '40m', status: 'complete' },
      { title: 'Building the MVP (Minimum Viable Product)', youtubeId: 'CBYhX5cTL5A', duration: '35m', status: 'current' },
      { title: 'Product Launch & User Retention', youtubeId: 'CBYhX5cTL5A', duration: '55m', status: 'locked' }
    ]
  }
};

export default function CoursePage({ courseId = 'python', onBack }) {
  const [activeVideo, setActiveVideo] = useState(null);

  // Fallback if course details not defined
  const course = COURSE_DETAILS[courseId] || COURSE_DETAILS.python;

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Interactive Course & Video Lessons</span>
          <h2 style={{ margin: 0 }}>{course.title}</h2>
        </div>
        <button className="ghost-btn" onClick={onBack}>← Back to Learning</button>
      </div>

      <div className="course-progress" style={{ marginBottom: '1.5rem' }}>
        <div className="course-progress-bar">
          <div style={{ width: `${course.progress}%` }} />
        </div>
        <span>{course.progress}% complete</span>
      </div>

      {/* Course Materials List */}
      <div className="materials-section" style={{
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border)',
        borderRadius: '24px',
        padding: '1.4rem',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: '0 0 1rem', fontSize: '1.15rem', color: '#eef3ff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📚</span> Course Materials & Resources
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
          {course.materials.map((m, idx) => (
            <a
              key={idx}
              href={m.url}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.8rem 1.1rem',
                background: 'rgba(0, 0, 0, 0.02)',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                borderRadius: '14px',
                textDecoration: 'none',
                color: '#76f5ff',
                transition: 'all 0.2s ease',
              }}
              className="hover-brighten"
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#ffffff' }}>{m.name}</span>
                <span style={{ fontSize: '0.72rem', color: 'rgba(0, 0, 0, 0.4)', marginTop: '0.15rem' }}>{m.type}</span>
              </div>
              <span style={{ fontSize: '0.95rem' }}>↗</span>
            </a>
          ))}
        </div>
      </div>

      <div className="section-title" style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#eef3ff' }}>Video Modules & Lessons</h3>
      </div>

      <div className="module-list" style={{ display: 'grid', gap: '1rem' }}>
        {course.videos.map(m => (
          <article 
            key={m.title} 
            className={`module-card${m.status === 'current' ? ' active' : ''}`}
            style={{
              padding: '1.2rem',
              borderRadius: '18px',
              background: m.status === 'current' ? 'linear-gradient(135deg, rgba(51,93,209,0.25), rgba(141,92,247,0.2))' : 'rgba(255,255,255,0.03)',
              border: m.status === 'current' ? '1px solid #86b7ff' : '1px solid var(--border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '1.05rem', color: '#f1f5f9' }}>{m.title}</h4>
              <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.88rem' }}>
                ⏱ {m.duration} • {m.status === 'complete' ? '✓ Completed' : m.status === 'current' ? '▶ In progress' : '🔒 Locked'}
              </p>
            </div>
            <button 
              className={m.status === 'current' ? 'primary-btn' : 'ghost-btn'}
              disabled={m.status === 'locked'}
              onClick={() => setActiveVideo(m)}
              style={{ padding: '0.5rem 1.2rem', borderRadius: '999px' }}
            >
              {m.status === 'locked' ? 'Locked 🔒' : '▶ Watch Lesson'}
            </button>
          </article>
        ))}
      </div>

      {/* Video Modal */}
      {activeVideo && (
        <Modal 
          title={`▶ Video Lesson: ${activeVideo.title}`}
          onClose={() => setActiveVideo(null)}
          footer={<button className="primary-btn" onClick={() => setActiveVideo(null)}>Complete Lesson</button>}
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
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', margin: 0 }}>
              Duration: <strong>{activeVideo.duration}</strong>. Follow along with code examples and complete quiz exercises to earn XP.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
