'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { MessageSquare, X, Send, AlertCircle } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatBotProps {
  locale: Locale;
}

// Hexagon SVG icon for the bot
function HexIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      className="hex-icon"
      aria-hidden="true"
    >
      <polygon
        points="14,2 25,8 25,20 14,26 3,20 3,8"
        fill="none"
        stroke="#d4956a"
        strokeWidth="1.5"
      />
      <polygon
        points="14,6 22,10.5 22,17.5 14,22 6,17.5 6,10.5"
        fill="rgba(212,149,106,0.12)"
      />
      <circle cx="14" cy="14" r="3" fill="#d4956a" />
    </svg>
  );
}

export default function ChatBot({ locale }: ChatBotProps) {
  const t = useTranslations('chatbot');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Initialize with welcome message when opened
  useEffect(() => {
    if (open && !initialized) {
      setMessages([
        {
          role: 'assistant',
          content: t('welcomeMessage'),
        },
      ]);
      setInitialized(true);
    }
  }, [open, initialized, t]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    setError(null);
    const userMsg: Message = { role: 'user', content: text };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language: locale,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        throw new Error('API error');
      }

      const data = await res.json() as { response: string };
      setMessages([...history, { role: 'assistant', content: data.response }]);
    } catch {
      setError('The Concrete Analyst is currently offline. Please try again later.');
      setMessages(history);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, locale]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <>
      {/* Floating trigger — Moai mascot above chat button */}
      {!open && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '24px',
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          {/* Moai avatar with hover speech bubble */}
          <div
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            onMouseEnter={() => setShowBubble(true)}
            onMouseLeave={() => setShowBubble(false)}
          >
            {/* Speech bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: 6 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 10px)',
                    right: '0',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px 14px 4px 14px',
                    padding: '9px 14px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
                    pointerEvents: 'none',
                  }}
                >
                  <span style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.72rem',
                    color: 'var(--text-primary)',
                    letterSpacing: '0.01em',
                  }}>
                    Hi, I&apos;m Moai how may I help you?
                  </span>
                  {/* Bubble tail */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-6px',
                    right: '18px',
                    width: '10px',
                    height: '10px',
                    background: 'var(--bg-elevated)',
                    border: '1px solid var(--border)',
                    borderTop: 'none',
                    borderLeft: 'none',
                    transform: 'rotate(45deg)',
                  }} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Moai image */}
            <motion.div
              onClick={() => setOpen(true)}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '2.5px solid var(--border-bright)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.14)',
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/mascot/moai.jpg"
                alt="Moai assistant"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 12%',
                  display: 'block',
                }}
              />
            </motion.div>
          </div>

          {/* Chat button */}
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Open chat with The Concrete Analyst"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 18px rgba(212,149,106,0.45), 0 4px 20px rgba(0,0,0,0.18)',
              transition: 'box-shadow 0.3s ease',
              color: '#ffffff',
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 30px rgba(212,149,106,0.65), 0 4px 20px rgba(0,0,0,0.2)')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLButtonElement).style.boxShadow =
                '0 0 18px rgba(212,149,106,0.45), 0 4px 20px rgba(0,0,0,0.18)')
            }
          >
            <MessageSquare size={20} />
          </motion.button>
        </div>
      )}

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '28px',
              zIndex: 200,
              width: 'min(400px, calc(100vw - 32px))',
              height: 'min(560px, calc(100vh - 80px))',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.15), var(--glow-peach)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 18px',
                borderBottom: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                flexShrink: 0,
              }}
            >
              <HexIcon size={28} />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  The Concrete Analyst
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '2px',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--accent-primary)',
                      animation: 'hexPulse 2s ease-in-out infinite',
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.65rem',
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: 'var(--accent-primary)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    ONLINE — DOCS GROUNDED
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)')
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')
                }
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div
                    className={msg.role === 'user' ? 'chat-user-msg' : 'chat-bot-msg'}
                    style={{
                      maxWidth: '85%',
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
                      fontSize: '0.8rem',
                      fontFamily: "'IBM Plex Mono', monospace",
                      lineHeight: 1.7,
                      color: 'var(--text-primary)',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', justifyContent: 'flex-start' }}
                >
                  <div
                    className="chat-bot-msg"
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px 12px 12px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span className="typing-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                    <span className="typing-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                    <span className="typing-dot" style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    background: 'rgba(255,77,109,0.08)',
                    border: '1px solid rgba(255,77,109,0.2)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    color: 'var(--accent-red)',
                    fontSize: '0.75rem',
                    fontFamily: "'IBM Plex Mono', monospace",
                  }}
                >
                  <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--border)',
                background: 'var(--bg-elevated)',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-end',
                }}
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('placeholder')}
                  rows={1}
                  maxLength={500}
                  aria-label="Chat input"
                  style={{
                    flex: 1,
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    color: 'var(--text-primary)',
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.8rem',
                    resize: 'none',
                    outline: 'none',
                    minHeight: '40px',
                    maxHeight: '100px',
                    lineHeight: 1.5,
                    transition: 'border-color 0.2s ease',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')}
                />
                <motion.button
                  onClick={() => void sendMessage()}
                  whileHover={!loading && input.trim() ? { scale: 1.05 } : {}}
                  whileTap={!loading && input.trim() ? { scale: 0.95 } : {}}
                  disabled={loading || !input.trim()}
                  aria-label="Send message"
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: input.trim() && !loading ? 'var(--accent-primary)' : 'var(--border)',
                    border: 'none',
                    cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: input.trim() && !loading ? '#ffffff' : 'var(--text-muted)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <Send size={16} />
                </motion.button>
              </div>
              <div
                style={{
                  fontSize: '0.6rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  color: 'var(--text-muted)',
                  marginTop: '6px',
                  textAlign: 'center',
                }}
              >
                Grounded in official Concrete documentation · Never speculates
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
