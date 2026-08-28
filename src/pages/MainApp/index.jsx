import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import LogoSymbol from '../../components/LogoSymbol';
import CommandCenter from '../../components/CommandCenter';
import Modal from '../../components/Modal';

// Pages
import HomePage from './HomePage';
import TasksPage from './TasksPage';
import LearningPage from './LearningPage';
import CoursePage from './CoursePage';
import QuizPage from './QuizPage';
import CoachPage from './CoachPage';
import FuturePage from './FuturePage';
import SkillGalaxyPage from './SkillGalaxyPage';
import AnalyticsPage from './AnalyticsPage';
import HabitsPage from './HabitsPage';
import RewardsPage from './RewardsPage';
import CommunityPage from './CommunityPage';
import ProfilePage from './ProfilePage';

const NAV_ITEMS = [
  { key: 'home', label: 'Dashboard' },
  { key: 'tasks', label: 'My Tasks' },
  { key: 'galaxy', label: '🌌 Skill Galaxy' },
  { key: 'learning', label: 'Learning & Videos' },
  { key: 'quiz', label: 'Quiz & Practice' },
  { key: 'coach', label: 'AI Study Assistant' },
  { key: 'future', label: 'Future Planner' },
  { key: 'analytics', label: 'Growth Analytics' },
  { key: 'habits', label: 'Study Habits' },
  { key: 'rewards', label: 'Student Rewards' },
  { key: 'community', label: 'Student Community' },
  { key: 'profile', label: 'Student Profile' },
];

const MOBILE_NAV = [
  { key: 'home', label: 'Dashboard' },
  { key: 'tasks', label: 'Tasks' },
  { key: 'learning', label: 'Learn' },
  { key: 'quiz', label: 'Quiz' },
  { key: 'profile', label: 'Profile' },
];

export default function MainApp({ onLogout }) {
  const { state, update, updateUser } = useApp();
  const [page, setPage] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [activeCourseId, setActiveCourseId] = useState('python');
  const [showCommand, setShowCommand] = useState(false);
  const [notifModal, setNotifModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);

  // Keyboard shortcut: Ctrl+K
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommand(v => !v);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const navigate = useCallback((p) => {
    setPage(p);
    setHistory(prev => {
      if (prev[prev.length - 1] === p) return prev;
      return [...prev, p];
    });
  }, []);

  const goBack = useCallback(() => {
    setHistory(prev => {
      if (prev.length <= 1) return prev;
      const newHistory = prev.slice(0, -1);
      setPage(newHistory[newHistory.length - 1]);
      return newHistory;
    });
  }, []);

  function renderPage() {
    switch (page) {
      case 'home':     return <HomePage onNavigate={navigate} />;
      case 'tasks':    return <TasksPage />;
      case 'galaxy':   return <SkillGalaxyPage />;
      case 'learning': return <LearningPage onOpenCourse={(id) => { setActiveCourseId(id); navigate('course'); }} />;
      case 'course':   return <CoursePage courseId={activeCourseId} onBack={() => navigate('learning')} />;
      case 'quiz':     return <QuizPage onBack={() => navigate('learning')} />;
      case 'coach':    return <CoachPage />;
      case 'future':   return <FuturePage />;
      case 'analytics':return <AnalyticsPage />;
      case 'habits':   return <HabitsPage />;
      case 'rewards':  return <RewardsPage />;
      case 'community':return <CommunityPage />;
      case 'profile':  return <ProfilePage />;
      default:         return <HomePage onNavigate={navigate} />;
    }
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="app-frame">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand-panel">
          <div className="brand-icon">
            <LogoSymbol id="nav" size={36} />
          </div>
          <div>
            <p className="brand-name">LIFORA</p>
            <p className="brand-tag">Student OS</p>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              className={`nav-link${page === item.key ? ' active' : ''}`}
              onClick={() => navigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="text-button" onClick={() => setSettingsModal(true)}>Settings</button>
          <button className="text-button" onClick={() => setHelpModal(true)}>Help</button>
          <button className="text-button" onClick={onLogout}>Logout</button>
        </div>
      </aside>

      {/* Main */}
      <div className="main-area">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-block">
            {history.length > 1 && (
              <button 
                className="back-btn" 
                onClick={goBack} 
                title="Go back"
                style={{ padding: '0.5rem 0.8rem', marginRight: '0.2rem' }}
              >
                ← Back
              </button>
            )}
            <button className="icon-btn" id="openCommand" aria-label="Open command center" onClick={() => setShowCommand(true)}>⌘</button>
            <input type="search" placeholder="Search tasks, courses, skills..." />
          </div>
          <div className="topbar-actions">
            <div className="top-pill">{dateStr}</div>
            <button className="icon-btn" aria-label="Notifications" onClick={() => setNotifModal(true)}>
              🔔
              {state.notifications?.length > 0 && (
                <span className="badge">{state.notifications.length}</span>
              )}
            </button>
            <div className="xp-pill">
              <span>XP</span>
              <strong>{state.user.xp?.toLocaleString()}</strong>
            </div>
            <button className="avatar-btn" aria-label="Profile" onClick={() => navigate('profile')}>
              <span>{(state.user.name || 'L').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        {renderPage()}
      </div>

      {/* Mobile bottom nav */}
      <div className="bottom-nav">
        {MOBILE_NAV.map(item => (
          <button
            key={item.key}
            className={page === item.key ? 'active' : ''}
            onClick={() => navigate(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Command Center */}
      {showCommand && (
        <CommandCenter
          onClose={() => setShowCommand(false)}
          onNavigate={(p) => { navigate(p); setShowCommand(false); }}
        />
      )}

      {/* Notifications modal */}
      {notifModal && (
        <Modal title="Notifications" onClose={() => setNotifModal(false)} footer={<button className="primary-btn" onClick={() => setNotifModal(false)}>Close</button>}>
          <div className="notification-list">
            {(state.notifications || []).map(n => (
              <div key={n.id} className="chat-message">
                <strong style={{ color: '#8da9ff', fontSize: '0.8rem', textTransform: 'uppercase' }}>{n.type}</strong>
                <p style={{ margin: '0.3rem 0 0' }}>{n.text}</p>
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Settings modal */}
      {settingsModal && (
        <Modal title="Settings" onClose={() => setSettingsModal(false)} footer={<button className="primary-btn" onClick={() => setSettingsModal(false)}>Close</button>}>
          <p style={{ color: 'var(--text)' }}>Theme, account, notifications, and privacy controls are in development for your Life OS.</p>
        </Modal>
      )}

      {/* Help modal */}
      {helpModal && (
        <Modal title="Help" onClose={() => setHelpModal(false)} footer={<button className="primary-btn" onClick={() => setHelpModal(false)}>Close</button>}>
          <p style={{ color: 'var(--text)' }}>Explore the dashboard, complete tasks, and use AI Coach to guide your next move. Press <strong>Ctrl+K</strong> to open the command center.</p>
        </Modal>
      )}
    </div>
  );
}
