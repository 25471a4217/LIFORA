export default function TermsPage({ onAccept, onDecline }) {
  const features = [
    { title: 'Required data only', desc: 'We collect only essential profile and preference data for your experience.' },
    { title: 'Optional camera permissions', desc: 'Future verification capabilities are optional and always disclosed.' },
    { title: 'Private activity data', desc: 'Your habits and progress are stored securely in the app.' },
    { title: 'No unauthorized sharing', desc: 'We do not share your personal insights without your consent.' },
    { title: 'Encrypted data concept', desc: 'Your Life OS is designed with privacy-first principles.' },
    { title: 'Permission controls', desc: 'You can change preferences at any time from settings.' },
    { title: 'Delete account anytime', desc: 'If you want to start fresh, your data can be cleared.' },
    { title: 'AI suggestions are guidance only', desc: 'LIFORA helps you decide, but you stay in charge of your plan.' },
  ];

  return (
    <div className="terms-page">
      <div className="terms-shell">
        <div className="terms-card">
          <div>
            <span className="eyebrow">Your privacy comes first.</span>
            <h2 style={{ margin: '0.5rem 0' }}>Trustworthy by design</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              LIFORA only uses the data needed to create your personal Life OS. You stay in control.
            </p>
          </div>

          <div className="terms-grid">
            {features.map((f) => (
              <article key={f.title} className="feature-card">
                <span style={{ color: '#5d8bff', fontSize: '1.1rem' }}>✓</span>
                <h3>{f.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0, fontSize: '0.9rem' }}>{f.desc}</p>
              </article>
            ))}
          </div>

          <div className="future-grid">
            <div>
              <h3 style={{ margin: '0 0 0.3rem' }}>Future verification methods</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', margin: 0 }}>Camera, GPS, Motion, Voice, Wearables</p>
            </div>
            <div className="coming-soon">Coming Soon</div>
          </div>

          <div className="terms-actions">
            <button className="secondary-btn" onClick={onDecline}>Decline</button>
            <button className="primary-btn" onClick={onAccept}>Accept &amp; Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
