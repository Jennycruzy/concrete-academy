'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { CheckCircle2, XCircle, ChevronRight, Trophy, RotateCcw } from 'lucide-react';
import RankMascot, { getRank } from './RankMascot';
import MasterTeaser from './MasterTeaser';
import type { Locale } from '@/lib/i18n';

interface Option {
  [locale: string]: string[];
}
interface QuestionText {
  [locale: string]: string;
}
interface Question {
  id: string;
  topic: string;
  text: QuestionText;
  options: Option;
  correct: string;
  explanation: QuestionText;
}
interface QuizData {
  level: number;
  title: QuestionText;
  questions: Question[];
}

interface QuizEngineProps {
  data: QuizData;
  locale: Locale;
}

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E'];

function shuffleQuestion(question: Question): Question {
  const baseOpts = question.options['en'] || [];
  const count = baseOpts.length;

  // Fisher-Yates shuffle of indices
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Apply same shuffle order to every locale, stripping the embedded letter prefix
  const newOptions: Option = {};
  for (const loc of Object.keys(question.options)) {
    const localOpts = question.options[loc];
    newOptions[loc] = indices.map(i => localOpts[i].replace(/^[A-Ea-e]\)\s*/, ''));
  }

  // Remap correct letter to new position
  const oldCorrectIndex = OPTION_LETTERS.indexOf(question.correct.toUpperCase());
  const newCorrectIndex = indices.indexOf(oldCorrectIndex);

  return {
    ...question,
    options: newOptions,
    correct: OPTION_LETTERS[newCorrectIndex],
  };
}

export default function QuizEngine({ data, locale }: QuizEngineProps) {
  const t = useTranslations('quizEngine');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [username, setUsername] = useState('');
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [questions, setQuestions] = useState<Question[]>(() =>
    [...data.questions].sort(() => Math.random() - 0.5).slice(0, 10).map(shuffleQuestion)
  );
  const current = questions[currentIndex];
  const progress = (currentIndex / 10) * 100;
  const isLast = currentIndex === 9;

  const getText = (obj: QuestionText) => obj[locale] || obj['en'] || '';
  const getOptions = (q: Question) => {
    const opts = q.options[locale] || q.options['en'] || [];
    return opts;
  };

  const handleSelect = useCallback((letter: string) => {
    if (submitted) return;
    setSelected(letter);
  }, [submitted]);

  const handleSubmit = useCallback(() => {
    if (!selected || submitted) return;
    setSubmitted(true);
    const isCorrect = selected === current.correct;
    setAnswers(prev => [...prev, isCorrect]);
  }, [selected, submitted, current]);

  const handleNext = useCallback(() => {
    if (isLast) {
      setShowResult(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelected(null);
      setSubmitted(false);
    }
  }, [isLast]);

  const score = Math.round((answers.filter(Boolean).length / 10) * 100);
  const rank = getRank(score);

  const handleSubmitScore = async () => {
    if (!username.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          level: data.level,
          score,
          language: locale,
        }),
      });
      setScoreSubmitted(true);
    } catch {
      // Silently fail — leaderboard is non-critical
    } finally {
      setSubmitting(false);
    }
  };

  const handleRetake = () => {
    setQuestions([...data.questions].sort(() => Math.random() - 0.5).slice(0, 10).map(shuffleQuestion));
    setCurrentIndex(0);
    setSelected(null);
    setSubmitted(false);
    setAnswers([]);
    setShowResult(false);
    setUsername('');
    setScoreSubmitted(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ maxWidth: '560px', margin: '0 auto', padding: '0 24px' }}
      >
        {/* Score card */}
        <div
          className="glass-card"
          style={{
            borderRadius: '20px',
            padding: '40px 32px',
            textAlign: 'center',
            marginBottom: '24px',
          }}
        >
          <RankMascot score={score} animate />

          <div style={{ margin: '28px 0 20px' }}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {t('yourScore')}
            </div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: '4rem',
                lineHeight: 1,
              }}
              className="gradient-text"
            >
              {score}%
            </div>
            <div
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.8rem',
                fontFamily: "'IBM Plex Mono', monospace",
                marginTop: '8px',
              }}
            >
              {answers.filter(Boolean).length} / 10 {t('correct')}
            </div>
          </div>

          {/* Submit to leaderboard */}
          {!scoreSubmitted ? (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '16px',
                }}
              >
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value.slice(0, 20))}
                  placeholder={t('username')}
                  maxLength={20}
                  style={{
                    flex: 1,
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: 'var(--text-primary)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8rem',
                    outline: 'none',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                  onKeyDown={e => { if (e.key === 'Enter') handleSubmitScore(); }}
                />
                <button
                  onClick={handleSubmitScore}
                  disabled={!username.trim() || submitting}
                  className="glow-btn-primary"
                  style={{
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    border: 'none',
                    cursor: username.trim() ? 'pointer' : 'not-allowed',
                    opacity: username.trim() ? 1 : 0.5,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {submitting ? t('submitting') : (
                    <><Trophy size={14} /> {t('submitScore')}</>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: 'rgba(0,212,170,0.08)',
                border: '1px solid rgba(0,212,170,0.2)',
                borderRadius: '8px',
                padding: '12px',
                color: 'var(--accent-primary)',
                fontSize: '0.8rem',
                fontFamily: "'IBM Plex Mono', monospace',",
                marginBottom: '16px',
              }}
            >
              ✓ {t('submitted')}
            </div>
          )}

          <button
            onClick={handleRetake}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '10px 20px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontFamily: "'IBM Plex Mono', monospace",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-bright)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            }}
          >
            <RotateCcw size={14} /> {t('retake')}
          </button>
        </div>

        {/* Master teaser */}
        {rank === 'master' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <MasterTeaser />
          </motion.div>
        )}
      </motion.div>
    );
  }

  const options = getOptions(current);

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px' }}>
      {/* Progress */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontFamily: "'IBM Plex Mono', monospace",
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            {t('question')} {currentIndex + 1} {t('of')} 10
          </span>
          <span
            className="tag"
            style={{
              background: 'rgba(0,212,170,0.08)',
              border: '1px solid rgba(0,212,170,0.15)',
              color: 'var(--accent-primary)',
            }}
          >
            {current.topic.replace(/-/g, ' ')}
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="glass-card"
            style={{ borderRadius: '16px', padding: '28px', marginBottom: '16px' }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                lineHeight: 1.5,
                color: 'var(--text-primary)',
                marginBottom: '24px',
              }}
            >
              {getText(current.text)}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {options.map((option, i) => {
                const letter = OPTION_LETTERS[i];
                const isSelected = selected === letter;
                const isCorrect = letter === current.correct;
                const showCorrect = submitted && isCorrect;
                const showWrong = submitted && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={letter}
                    onClick={() => handleSelect(letter)}
                    whileHover={!submitted ? { scale: 1.01 } : {}}
                    whileTap={!submitted ? { scale: 0.99 } : {}}
                    className={`quiz-option ${showCorrect ? 'correct' : ''} ${showWrong ? 'selected-wrong' : ''} ${submitted ? 'locked' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '14px 16px',
                      borderRadius: '10px',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    aria-pressed={isSelected}
                  >
                    {/* Letter badge */}
                    <span
                      style={{
                        flexShrink: 0,
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        background: showCorrect
                          ? 'var(--accent-primary)'
                          : showWrong
                          ? 'var(--accent-red)'
                          : isSelected
                          ? 'rgba(0,212,170,0.2)'
                          : 'var(--border)',
                        color: showCorrect || showWrong ? '#0a0c0f' : 'var(--text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {showCorrect ? <CheckCircle2 size={14} /> : showWrong ? <XCircle size={14} /> : letter}
                    </span>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        color: showCorrect
                          ? 'var(--accent-primary)'
                          : showWrong
                          ? 'var(--accent-red)'
                          : 'var(--text-primary)',
                      }}
                    >
                      {option}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Action button */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              {!submitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selected}
                  className="glow-btn-primary"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    border: 'none',
                    cursor: selected ? 'pointer' : 'not-allowed',
                    opacity: selected ? 1 : 0.5,
                  }}
                >
                  {t('submit')}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="glow-btn-primary"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '10px',
                    fontSize: '0.8rem',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {isLast ? t('viewResults') : t('next')} <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Explanation panel */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  style={{
                    background: 'var(--bg-elevated)',
                    border: `1px solid ${selected === current.correct ? 'rgba(0,212,170,0.3)' : 'rgba(255,77,109,0.3)'}`,
                    borderRadius: '12px',
                    padding: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '10px',
                    }}
                  >
                    {selected === current.correct ? (
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)' }} />
                    ) : (
                      <XCircle size={16} style={{ color: 'var(--accent-red)' }} />
                    )}
                    <span
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        color: selected === current.correct ? 'var(--accent-primary)' : 'var(--accent-red)',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {selected === current.correct ? t('correct') : t('incorrect')} — {t('explanation')}
                    </span>
                  </div>
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      lineHeight: 1.7,
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {getText(current.explanation)}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
