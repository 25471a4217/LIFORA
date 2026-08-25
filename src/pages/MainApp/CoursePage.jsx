import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';

const COURSE_VIDEOS = [
  { title: 'Python Basics & Variables', youtubeId: 'rfscVS0vtbw', duration: '25m', status: 'complete' },
  { title: 'Functions & Modules', youtubeId: 'rfscVS0vtbw', duration: '35m', status: 'complete' },
  { title: 'Object-Oriented Programming (OOP)', youtubeId: 'rfscVS0vtbw', duration: '40m', status: 'complete' },
  { title: 'Data Structures & Algorithms', youtubeId: '8hly31xKLI0', duration: '50m', status: 'current' },
  { title: 'Machine Learning Fundamentals', youtubeId: 'aircAruvnKk', duration: '1h 10m', status: 'locked' },
];

export default function CoursePage({ onBack }) {
  const { state } = useApp();
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Interactive Course & Video Lessons</span>
          <h2 style={{ margin: 0 }}>Python Mastery</h2>
        </div>
        <button className="ghost-btn" onClick={onBack}>← Back to Learning</button>
      </div>

      <div className="course-progress" style={{ marginBottom: '1.5rem' }}>
        <div className="course-progress-bar">
          <div style={{ width: '68%' }} />
        </div>
        <span>68% complete</span>
      </div>

      <div className="section-title" style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#eef3ff' }}>Video Modules & Lessons</h3>
      </div>

      <div className="module-list" style={{ display: 'grid', gap: '1rem' }}>
        {COURSE_VIDEOS.map(m => (
          <article 
            key={m.title} 
            className={`module-card${m.status === 'current' ? ' active' : ''}`}
            style={{
              padding: '1.2rem',
              borderRadius: '18px',
              background: m.status === 'current' ? 'linear-gradient(135deg, rgba(51,93,209,0.25), rgba(141,92,247,0.2))' : 'rgba(255,255,255,0.03)',
              border: m.status === 'current' ? '1px solid #86b7ff' : '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <div>
              <h4 style={{ margin: '0 0 0.3rem', fontSize: '1.05rem', color: '#f1f5f9' }}>{m.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.88rem' }}>
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
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', margin: 0 }}>
              Duration: <strong>{activeVideo.duration}</strong>. Follow along with code examples and complete quiz exercises to earn XP.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}
