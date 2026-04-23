-- Concrete Academy — Database Schema
-- Run: psql -U concrete_edu -d concrete_edu -f scripts/setup-db.sql

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(50) UNIQUE NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER REFERENCES users(id) ON DELETE CASCADE,
  level        INTEGER NOT NULL CHECK (level IN (1, 2)),
  language     VARCHAR(10) NOT NULL,
  score        INTEGER NOT NULL CHECK (score >= 0 AND score <= 100),
  completed_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leaderboard (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(50) NOT NULL,
  level       INTEGER NOT NULL CHECK (level IN (1, 2)),
  best_score  INTEGER NOT NULL CHECK (best_score >= 0 AND best_score <= 100),
  language    VARCHAR(10),
  updated_at  TIMESTAMP DEFAULT NOW(),
  UNIQUE(username, level)
);

CREATE TABLE IF NOT EXISTS level3_waitlist (
  id           SERIAL PRIMARY KEY,
  email        VARCHAR(255) UNIQUE NOT NULL,
  username     VARCHAR(50),
  signed_up_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_level_score
  ON leaderboard(level, best_score DESC);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user
  ON quiz_attempts(user_id);

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_level
  ON quiz_attempts(level, completed_at DESC);

-- Sample data for testing (optional — comment out in production)
-- INSERT INTO users (username) VALUES ('SatoshiAnalyst') ON CONFLICT DO NOTHING;
-- INSERT INTO leaderboard (username, level, best_score, language)
--   VALUES ('SatoshiAnalyst', 1, 100, 'en') ON CONFLICT DO NOTHING;

\echo 'Database schema created successfully.'
