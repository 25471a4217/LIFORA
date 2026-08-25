import { useState } from 'react';
import LogoSymbol from '../components/LogoSymbol';
import { useApp } from '../context/AppContext';

export default function LoginPage({ onGoRegister, onLoginSuccess }) {
  const { update, updateUser } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setFeedback('Enter a valid email and password to continue.');
      return;
    }
    setFeedback('Signing in...');
    setLoading(true);
    setTimeout(() => {
      updateUser({ email });
      update({ authenticated: true });
      setLoading(false);
      setFeedback('');
      onLoginSuccess();
    }, 900);
  }

  return (
    <div className="auth-page">
      <div className="auth-grid">
        {/* Branding panel */}
        <aside className="auth-branding">
          <div className="brand-top">
            <div className="brand-symbol">
              <LogoSymbol id="login" size={56} />
            </div>
            <div>
              <p className="eyebrow" style={{ margin: 0 }}>PERSONAL LIFE OS</p>
              <h2 style={{ margin: '0.3rem 0 0' }}>Your life. One intelligent system.</h2>
            </div>
          </div>
          <div className="auth-visual">
            <div className="visual-node" />
            <div className="visual-node small" />
            <div className="visual-line" />
            <div className="visual-line reverse" />
            <div className="visual-ring" />
          </div>
          <p className="auth-note">LIFORA blends goals, skills, habits, and AI insight into one premium dashboard.</p>
        </aside>

        {/* Form card */}
        <main className="auth-form-card">
          <div className="auth-form-head">
            <span className="eyebrow">Welcome back</span>
            <h2 style={{ margin: 0 }}>Sign in to continue</h2>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="loginEmail">Email</label>
            <input
              id="loginEmail"
              type="email"
              placeholder="you@lifora.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="loginPassword">Password</label>
            <div className="password-field">
              <input
                id="loginPassword"
                type={showPass ? 'text' : 'password'}
                placeholder="Enter password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingRight: '5rem' }}
              />
              <button type="button" onClick={() => setShowPass(v => !v)}>
                {showPass ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="form-row">
              <label className="checkbox-inline" style={{ margin: 0 }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                Remember me
              </label>
              <button type="button" className="text-button">Forgot Password?</button>
            </div>

            <button type="submit" className="primary-btn full" disabled={loading}>Login</button>

            <div className="form-divider"><span>OR</span></div>
            <div className="social-row">
              <button type="button" className="social-btn google">Google</button>
              <button type="button" className="social-btn microsoft">Microsoft</button>
              <button type="button" className="social-btn apple">Apple</button>
            </div>

            <p className="auth-footer">
              New to LIFORA?{' '}
              <button type="button" className="text-button" onClick={onGoRegister}>Create Account</button>
            </p>
            <div className="feedback" aria-live="polite">{feedback}</div>
          </form>
        </main>
      </div>
    </div>
  );
}
