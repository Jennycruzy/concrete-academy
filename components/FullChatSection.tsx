'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Trash2, Bot, User } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FullChatSectionProps {
  locale: Locale;
  welcomeMessage: string;
  inputPlaceholder: string;
  clearLabel: string;
  thinkingLabel: string;
  suggestedTitle: string;
  poweredBy: string;
}

const SUGGESTED: Record<string, string[]> = {
  en: [
    'What is Concrete DeFi?',
    'How do Concrete vaults work?',
    'What is the points campaign?',
    'Is Concrete protocol audited?',
    'What blockchains does Concrete support?',
    'What was Blueprint Finance?',
  ],
  zh: [
    '什么是Concrete DeFi？',
    'Concrete金库如何工作？',
    '什么是积分活动？',
    'Concrete协议经过审计了吗？',
    'Concrete支持哪些区块链？',
  ],
  vi: [
    'Concrete DeFi là gì?',
    'Vault của Concrete hoạt động như thế nào?',
    'Chiến dịch điểm là gì?',
    'Concrete có được kiểm toán không?',
    'Concrete hỗ trợ những blockchain nào?',
  ],
  id: [
    'Apa itu Concrete DeFi?',
    'Bagaimana vault Concrete bekerja?',
    'Apa itu kampanye poin?',
    'Apakah Concrete telah diaudit?',
    'Blockchain apa yang didukung Concrete?',
  ],
  tr: [
    'Concrete DeFi nedir?',
    'Concrete vault\'ları nasıl çalışır?',
    'Puan kampanyası nedir?',
    'Concrete protokolü denetlendi mi?',
    'Concrete hangi blokzincirlerini destekler?',
  ],
  pcm: [
    'Wetin be Concrete DeFi?',
    'How Concrete vault dey work?',
    'Wetin be the points campaign?',
    'Dem don audit Concrete?',
    'Which blockchain Concrete dey support?',
  ],
};

function HexIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 28 28" aria-hidden="true">
      <polygon points="14,2 25,8 25,20 14,26 3,20 3,8" fill="none" stroke="#00d4aa" strokeWidth="1.5" />
      <polygon points="14,6 22,10.5 22,17.5 14,22 6,17.5 6,10.5" fill="rgba(0,212,170,0.12)" />
      <circle cx="14" cy="14" r="3" fill="#00d4aa" />
    </svg>
  );
}

export default function FullChatSection({
  locale,
  welcomeMessage,
  inputPlaceholder,
  clearLabel,
  thinkingLabel,
  suggestedTitle,
  poweredBy,
}: FullChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: welcomeMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggested, setShowSuggested] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const suggested = SUGGESTED[locale] ?? SUGGESTED['en'];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggested(false);
    setInput('');
    const userMsg: Message = { role: 'user', content: text.trim() };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          language: locale,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json() as { response?: string; error?: string };
      setMessages([
        ...history,
        { role: 'assistant', content: data.response ?? 'Unable to get a response. Please try again.' },
      ]);
    } catch {
      setMessages([
        ...history,
        { role: 'assistant', content: 'Connection error. Please check your internet and try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, locale]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
    setShowSuggested(true);
    setInput('');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
      {/* Chat container */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border)',
          borderRadius: '24px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: 'min(680px, calc(100vh - 280px))',
        }}
      >
        {/* Chat header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HexIcon />
            <div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                The Concrete Analyst
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)', display: 'inline-block', animation: 'hexPulse 2s ease-in-out infinite' }} />
                <span style={{ fontSize: '0.6rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--accent-primary)', letterSpacing: '0.06em' }}>
                  ONLINE · DOCS GROUNDED
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            title={clearLabel}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '6px 12px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              fontFamily: "'IBM Plex Mono', monospace",
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent-red)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-red)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
          >
            <Trash2 size={12} />
            {clearLabel}
          </button>
        </div>

        {/* Messages area */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
            >
              {msg.role === 'assistant' && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={15} style={{ color: 'var(--accent-primary)' }} />
                </div>
              )}

              <div
                className={msg.role === 'user' ? 'chat-user-msg' : 'chat-bot-msg'}
                style={{
                  maxWidth: '78%',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  fontSize: '0.83rem',
                  fontFamily: "'IBM Plex Mono', monospace",
                  lineHeight: 1.75,
                  color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(0,153,204,0.1)', border: '1px solid rgba(0,153,204,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <User size={15} style={{ color: 'var(--accent-secondary)' }} />
                </div>
              )}
            </motion.div>
          ))}

          {/* Typing indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}
              >
                <div style={{
                  width: '32px', height: '32px', borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={15} style={{ color: 'var(--accent-primary)' }} />
                </div>
                <div
                  className="chat-bot-msg"
                  style={{ padding: '14px 18px', borderRadius: '16px 16px 16px 4px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span className="typing-dot" style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                  <span className="typing-dot" style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                  <span className="typing-dot" style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '0.72rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--text-muted)', marginLeft: '6px' }}>
                    {thinkingLabel}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested questions — shown before first user message */}
        <AnimatePresence>
          {showSuggested && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ padding: '0 20px 12px', flexShrink: 0, overflow: 'hidden' }}
            >
              <div style={{ fontSize: '0.65rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
                {suggestedTitle}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {suggested.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => void send(q)}
                    disabled={loading}
                    style={{
                      background: 'rgba(0,212,170,0.05)',
                      border: '1px solid rgba(0,212,170,0.18)',
                      borderRadius: '20px',
                      padding: '6px 14px',
                      color: 'var(--text-secondary)',
                      fontSize: '0.72rem',
                      fontFamily: "'IBM Plex Mono', monospace",
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,212,170,0.1)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent-primary)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,212,170,0.4)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,212,170,0.05)';
                      (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
                      (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(0,212,170,0.18)';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input area */}
        <div
          style={{
            padding: '14px 20px',
            borderTop: '1px solid var(--border)',
            background: 'var(--bg-elevated)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={inputPlaceholder}
              rows={1}
              maxLength={500}
              disabled={loading}
              style={{
                flex: 1,
                background: 'var(--bg-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '12px 14px',
                color: 'var(--text-primary)',
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.82rem',
                resize: 'none',
                outline: 'none',
                minHeight: '44px',
                maxHeight: '120px',
                lineHeight: 1.5,
                transition: 'border-color 0.2s ease',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--accent-primary)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
            <motion.button
              onClick={() => void send(input)}
              whileHover={!loading && input.trim() ? { scale: 1.05 } : {}}
              whileTap={!loading && input.trim() ? { scale: 0.95 } : {}}
              disabled={loading || !input.trim()}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: input.trim() && !loading ? 'var(--accent-primary)' : 'var(--border)',
                border: 'none',
                cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: input.trim() && !loading ? '#0a0c0f' : 'var(--text-muted)',
                transition: 'all 0.2s ease',
                flexShrink: 0,
              }}
            >
              <Send size={17} />
            </motion.button>
          </div>
          <div style={{ fontSize: '0.6rem', fontFamily: "'IBM Plex Mono', monospace", color: 'var(--text-muted)', marginTop: '8px', textAlign: 'center' }}>
            {poweredBy}
          </div>
        </div>
      </div>
    </div>
  );
}
