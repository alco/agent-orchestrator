-- Create agents table for AI agent orchestration
CREATE TABLE IF NOT EXISTS agents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('claude', 'gpt', 'gemini', 'llama', 'custom')),
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'running', 'error', 'completed')),
  prompt TEXT,
  task TEXT,
  result TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for filtering by status (common dashboard operation)
CREATE INDEX IF NOT EXISTS agents_status_idx ON agents(status);

-- Index for sorting by creation time
CREATE INDEX IF NOT EXISTS agents_created_at_idx ON agents(created_at DESC);
