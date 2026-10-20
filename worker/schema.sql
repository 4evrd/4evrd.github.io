-- One row per evrd install per day (see src/index.js).
CREATE TABLE IF NOT EXISTS installs (
  day     TEXT NOT NULL, -- YYYY-MM-DD (UTC)
  who     TEXT NOT NULL, -- salted, per-day hash of the address
  version TEXT NOT NULL,
  PRIMARY KEY (day, who)
);
