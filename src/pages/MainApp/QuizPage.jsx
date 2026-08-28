import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';

export default function QuizPage({ onBack }) {
  const { state, updateQuiz, updateUser } = useApp();
  const [selected, setSelected] = useState(null);
  const [resultModal, setResultModal] = useState(null);

  const quiz = state.quiz;
  const currentQ = quiz.questions[quiz.current];

  function submitAnswer() {
    if (selected === null) return;
    const correct = selected === currentQ.answer;
    const newScore = quiz.score + (correct ? 1 : 0);
    const newCurrent = quiz.current + 1;

    if (correct) updateUser({ xp: state.user.xp + 20 });

    if (newCurrent >= quiz.questions.length) {
      const accuracy = Math.round((newScore / quiz.questions.length) * 100);
      setResultModal({ score: newScore, total: quiz.questions.length, accuracy, xp: newScore * 20 });
      updateQuiz({ current: 0, score: 0 });
    } else {
      updateQuiz({ current: newCurrent, score: newScore });
      setSelected(null);
    }
  }

  if (resultModal) {
    return (
      <div className="page-content">
        <Modal title="Quiz Complete 🎉" onClose={onBack} footer={<button className="primary-btn" onClick={onBack}>Continue</button>}>
          <p>Score: <strong>{resultModal.score} / {resultModal.total}</strong></p>
          <p>Accuracy: <strong>{resultModal.accuracy}%</strong></p>
          <p>XP earned: <strong>{resultModal.xp}</strong></p>
          <p style={{ color: 'var(--muted)' }}>Weak areas: DSA, Advanced Algorithms</p>
          <p style={{ color: 'var(--muted)' }}>Recommended: Machine Learning fundamentals</p>
        </Modal>
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Quiz</span>
          <h2 style={{ margin: 0 }}>Data Structures Challenge</h2>
        </div>
        <span style={{ color: '#8da9ff' }}>Question {quiz.current + 1} / {quiz.questions.length}</span>
      </div>

      <div className="quiz-card">
        <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{currentQ.text}</p>
        <div className="quiz-options">
          {currentQ.options.map((opt, i) => (
            <button
              key={i}
              className={`quiz-option${selected === i ? ' selected' : ''}`}
              onClick={() => setSelected(i)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-actions">
        <button className="secondary-btn" onClick={onBack}>Skip</button>
        <button className="primary-btn" onClick={submitAnswer} disabled={selected === null}>Submit</button>
      </div>
    </div>
  );
}
