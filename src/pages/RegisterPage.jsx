import { useState } from 'react';
import LogoSymbol from '../components/LogoSymbol';
import { useApp } from '../context/AppContext';

export default function RegisterPage({ onGoLogin, onRegisterSuccess }) {
  const { update, updateUser } = useApp();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [agree, setAgree] = useState(false);
  const [feedback, setFeedback] = useState('');

  function set(field) {
    return (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, confirm } = form;
    if (!name || !email || !password || !confirm || password !== confirm || !agree) {
      setFeedback('Complete all fields and ensure passwords match.');
      return;
    }
    setFeedback('Creating account...');
    setTimeout(() => {
      updateUser({ name, email });
      update({ authenticated: true });
      setFeedback('');
      onRegisterSuccess();
    }, 900);
  }

  return (
    <div className="auth-page">
      <div className="auth-grid">
        <aside className="auth-branding">
          <div className="brand-top">
            <div className="brand-symbol">
              <LogoSymbol id="register" size={56} />
            </div>
            <div>
              <p className="eyebrow" style={{ margin: 0 }}>JOIN LIFORA</p>
              <h2 style={{ margin: '0.3rem 0 0' }}>Create your AI Life OS</h2>
            </div>
          </div>
          <p className="auth-note">Begin with your future goal and watch LIFORA build your mission, learning path, and reward system.</p>
        </aside>

        <main className="auth-form-card">
          <div className="auth-form-head">
            <span className="eyebrow">Create account</span>
            <h2 style={{ margin: 0 }}>Join LIFORA today</h2>
          </div>
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="regName">Full Name</label>
            <input id="regName" type="text" placeholder="Asmitha Raj" required value={form.name} onChange={set('name')} />

            <label htmlFor="regEmail">Email</label>
            <input id="regEmail" type="email" placeholder="you@lifora.com" required value={form.email} onChange={set('email')} />

            <label htmlFor="regPassword">Password</label>
            <input id="regPassword" type="password" placeholder="Create password" required value={form.password} onChange={set('password')} />

            <label htmlFor="regConfirm">Confirm Password</label>
            <input id="regConfirm" type="password" placeholder="Confirm password" required value={form.confirm} onChange={set('confirm')} />

            <label className="checkbox-inline">
              <input type="checkbox" required checked={agree} onChange={(e) => setAgree(e.target.checked)} />
              I agree to <span className="link-text">Terms &amp; Privacy Policy</span>
            </label>

            <button type="submit" className="primary-btn full">Create My LIFORA</button>

            <p className="auth-footer">
              Already have an account?{' '}
              <button type="button" className="text-button" onClick={onGoLogin}>Login</button>
            </p>
            <div className="feedback" aria-live="polite">{feedback}</div>
          </form>
        </main>
      </div>
    </div>
  );
}
