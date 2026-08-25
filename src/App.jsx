import { useState, useCallback } from 'react';
import { useApp } from './context/AppContext';

import SplashScreen from './pages/SplashScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TermsPage from './pages/TermsPage';
import OnboardingPage from './pages/OnboardingPage';
import MainApp from './pages/MainApp/index';

export default function App() {
  const { state, update } = useApp();

  // Derive initial view from saved state
  const getInitialView = () => {
    if (state.authenticated && state.onboardingComplete) return 'app';
    return 'splash';
  };

  const [view, setView] = useState(getInitialView);

  const goTo = useCallback((v) => setView(v), []);

  function handleSplashDone() {
    if (state.authenticated && state.onboardingComplete) {
      setView('app');
    } else {
      setView('login');
    }
  }

  function handleLoginSuccess() {
    if (state.onboardingComplete) {
      setView('app');
    } else {
      setView('terms');
    }
  }

  function handleLogout() {
    update({ authenticated: false, onboardingComplete: false });
    setView('login');
  }

  switch (view) {
    case 'splash':
      return <SplashScreen onDone={handleSplashDone} />;
    case 'login':
      return <LoginPage onGoRegister={() => goTo('register')} onLoginSuccess={handleLoginSuccess} />;
    case 'register':
      return <RegisterPage onGoLogin={() => goTo('login')} onRegisterSuccess={() => goTo('terms')} />;
    case 'terms':
      return <TermsPage onAccept={() => goTo('onboarding')} onDecline={() => alert('You can review the policy and continue when ready.')} />;
    case 'onboarding':
      return <OnboardingPage onComplete={() => goTo('app')} />;
    case 'app':
      return <MainApp onLogout={handleLogout} />;
    default:
      return <SplashScreen onDone={handleSplashDone} />;
  }
}
