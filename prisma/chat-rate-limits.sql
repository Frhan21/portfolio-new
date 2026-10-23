CREATE TABLE IF NOT EXISTS chat_rate_limits (
  id BIGSERIAL PRIMARY KEY,
  client_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS chat_rate_limits_client_created_idx
  ON chat_rate_limits (client_hash, created_at);

CREATE INDEX IF NOT EXISTS chat_rate_limits_created_idx
  ON chat_rate_limits (created_at);
