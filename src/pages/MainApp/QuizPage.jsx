import { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';
import { 
  getQuestionsForTopic, 
  getQuestionsForUserTopics, 
  getQuizTitle, 
  getTopicInfo 
} from '../../data/quizQuestions';

export default function QuizPage({ onBack }) {
  const { state, updateQuiz, updateUser } = useApp();

  // Retrieve user selected topics from state
  const userTopics = useMemo(() => {
    const areas = state.user?.focusAreas?.length > 0 
      ? state.user.focusAreas 
      : (state.selectedAreas || []);
    return areas.length > 0 ? areas : ['Full Stack Development', 'Prompt Engineering', 'AI & Machine Learning'];
  }, [state.user?.focusAreas, state.selectedAreas]);

  // Active topic filter: 'all' or specific topic name
  const [activeTopic, setActiveTopic] = useState('all');
  const [selected, setSelected] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [missedQuestions, setMissedQuestions] = useState([]);
  const [resultModal, setResultModal] = useState(null);

  // Load questions tailored to active topic & user topics
  const questions = useMemo(() => {
    if (activeTopic === 'all') {
      return getQuestionsForUserTopics(userTopics, 5);
    }
    return getQuestionsForTopic(activeTopic, 5);
  }, [activeTopic, userTopics]);

  // Reset quiz state whenever topic changes
  const switchTopic = (topic) => {
    setActiveTopic(topic);
    setCurrentIndex(0);
    setScore(0);
    setSelected(null);
    setIsAnswered(false);
    setMissedQuestions([]);
    setResultModal(null);
    updateQuiz({ activeTopic: topic, current: 0, score: 0 });
  };

  const currentQ = questions[currentIndex] || questions[0];
  const topicMeta = getTopicInfo(currentQ?.topic || activeTopic);
  const quizTitle = getQuizTitle(activeTopic);

  function handleSubmitAnswer() {
    if (selected === null || isAnswered) return;
    
    setIsAnswered(true);
    const correct = selected === currentQ.answer;
    const newScore = score + (correct ? 1 : 0);
    
    if (correct) {
      setScore(newScore);
      updateUser({ xp: (state.user?.xp || 0) + 20 });
    } else {
      setMissedQuestions(prev => [...prev, currentQ]);
    }
  }

  function handleNextQuestion() {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= questions.length) {
      const finalScore = score + (selected === currentQ.answer ? 0 : 0); // score was already updated
      const accuracy = Math.round((finalScore / questions.length) * 100);
      const earnedXp = finalScore * 20;

      setResultModal({
        score: finalScore,
        total: questions.length,
        accuracy,
        xp: earnedXp,
        topic: activeTopic === 'all' ? 'Your Selected Missions' : activeTopic
      });
      updateQuiz({ current: 0, score: 0 });
    } else {
      setCurrentIndex(nextIdx);
      setSelected(null);
      setIsAnswered(false);
    }
  }

  function handleSkip() {
    if (currentIndex + 1 >= questions.length) {
      const accuracy = Math.round((score / questions.length) * 100);
      setResultModal({
        score,
        total: questions.length,
        accuracy,
        xp: score * 20,
        topic: activeTopic === 'all' ? 'Your Selected Missions' : activeTopic
      });
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelected(null);
      setIsAnswered(false);
    }
  }

  function handleNextTopic() {
    setResultModal(null);
    if (activeTopic === 'all') {
      switchTopic(userTopics[0]);
    } else {
      const nextIdx = (userTopics.indexOf(activeTopic) + 1) % userTopics.length;
      switchTopic(userTopics[nextIdx]);
    }
  }

  if (resultModal) {
    const weakTopicsList = Array.from(new Set(missedQuestions.map(q => q.topic))).filter(Boolean);
    const weakText = weakTopicsList.length > 0 
      ? weakTopicsList.join(', ') 
      : 'None! Mastered all tested concepts 🎯';

    const nextTopicRecommendation = userTopics.find(t => t !== activeTopic) || 'Advanced AI Systems';

    return (
      <div className="page-content">
        <Modal 
          title="Quiz Complete 🎉" 
          onClose={() => { setResultModal(null); switchTopic('all'); }} 
          footer={
            <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
              <button className="secondary-btn" onClick={() => switchTopic(activeTopic)}>Retry Quiz</button>
              {userTopics.length > 1 && (
                <button className="secondary-btn" onClick={handleNextTopic}>Practice Next Topic →</button>
              )}
              <button className="primary-btn" onClick={onBack}>Back to Learning</button>
            </div>
          }
        >
          <div className="quiz-result-summary">
            <div className="quiz-score-badge">
              <span className="score-number">{resultModal.score} / {resultModal.total}</span>
              <span className="score-label">Correct Answers</span>
            </div>
            <div className="quiz-stat-row">
              <p>🎯 Accuracy: <strong>{resultModal.accuracy}%</strong></p>
              <p>⚡ XP Earned: <strong style={{ color: '#76f5ff' }}>+{resultModal.xp} XP</strong></p>
            </div>
            <hr style={{ borderColor: 'var(--border)', margin: '1rem 0' }} />
            <div className="quiz-insights">
              <p><strong>Topic Tested:</strong> {resultModal.topic}</p>
              <p style={{ color: missedQuestions.length > 0 ? '#ff758c' : '#5dffb5' }}>
                <strong>Focus / Review:</strong> {weakText}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
                💡 <strong>Next Recommended Step:</strong> Practice modules for <em>{nextTopicRecommendation}</em>.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="page-content">
      {/* Top Topic Filter Pills based on User Selected Topics */}
      <div className="quiz-topics-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="eyebrow" style={{ color: '#76f5ff' }}>🎯 Quizzes Tailored to Your Selected Topics</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{userTopics.length} Focus Topics Active</span>
        </div>

        <div className="quiz-topic-tabs">
          <button
            className={`quiz-topic-pill${activeTopic === 'all' ? ' active' : ''}`}
            onClick={() => switchTopic('all')}
          >
            🌟 All My Topics (Mixed)
          </button>
          {userTopics.map(topic => {
            const info = getTopicInfo(topic);
            const isActive = activeTopic === topic;
            return (
              <button
                key={topic}
                className={`quiz-topic-pill${isActive ? ' active' : ''}`}
                onClick={() => switchTopic(topic)}
              >
                <span>{info.icon}</span> {topic}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Quiz Header */}
      <div className="page-header" style={{ marginTop: '0.5rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span className="quiz-badge" style={{ borderColor: topicMeta.color || 'var(--blue)', color: topicMeta.color || 'var(--blue)' }}>
              {topicMeta.icon} {currentQ?.topic || activeTopic}
            </span>
            {currentQ?.difficulty && (
              <span className="quiz-difficulty-tag">
                {currentQ.difficulty}
              </span>
            )}
          </div>
          <h2 style={{ margin: 0 }}>{quizTitle}</h2>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ color: '#8da9ff', fontWeight: 600 }}>
            Question {currentIndex + 1} / {questions.length}
          </span>
          <div className="quiz-progress-track">
            <div 
              className="quiz-progress-fill" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Quiz Card */}
      <div className="quiz-card">
        <p style={{ fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.45, margin: '0 0 1.25rem' }}>
          {currentQ.text}
        </p>

        <div className="quiz-options">
          {currentQ.options.map((opt, i) => {
            let optionClass = 'quiz-option';
            if (selected === i) optionClass += ' selected';
            if (isAnswered) {
              if (i === currentQ.answer) {
                optionClass += ' correct';
              } else if (selected === i && selected !== currentQ.answer) {
                optionClass += ' incorrect';
              }
            }

            return (
              <button
                key={i}
                className={optionClass}
                disabled={isAnswered}
                onClick={() => setSelected(i)}
              >
                <span className="option-indicator">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="option-text">{opt}</span>
                {isAnswered && i === currentQ.answer && (
                  <span className="option-status-icon">✓</span>
                )}
                {isAnswered && selected === i && selected !== currentQ.answer && (
                  <span className="option-status-icon" style={{ color: '#ff6b81' }}>✗</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Explanation Box */}
        {isAnswered && (
          <div className={`quiz-feedback-box ${selected === currentQ.answer ? 'success' : 'warning'}`}>
            <div className="feedback-header" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              {selected === currentQ.answer ? '🎉 Correct!' : '💡 Key Concept Explanation:'}
            </div>
            <p className="explanation-text" style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.45, color: '#000000', fontWeight: 500 }}>
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="quiz-actions">
        <button className="secondary-btn" onClick={handleSkip}>
          Skip
        </button>
        {!isAnswered ? (
          <button 
            className="primary-btn" 
            onClick={handleSubmitAnswer} 
            disabled={selected === null}
          >
            Submit Answer
          </button>
        ) : (
          <button 
            className="primary-btn" 
            onClick={handleNextQuestion}
          >
            {currentIndex + 1 >= questions.length ? 'See Results 🎉' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  );
}
