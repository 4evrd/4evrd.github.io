-- One row per evrd install per day (see src/index.js).
CREATE TABLE IF NOT EXISTS installs (
  day     TEXT NOT NULL, -- YYYY-MM-DD (UTC)
  who     TEXT NOT NULL, -- salted, per-day hash of the address
  version TEXT NOT NULL,
  PRIMARY KEY (day, who)
);

-- Daily totals, kept for good (no hashes): what the per-install rows add up
-- to, rolled up for each finished day before those rows are dropped.
CREATE TABLE IF NOT EXISTS daily (
  day      TEXT NOT NULL,
  version  TEXT NOT NULL,
  installs INTEGER NOT NULL,
  PRIMARY KEY (day, version)
);
