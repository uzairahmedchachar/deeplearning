const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'portal.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS students (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  program TEXT NOT NULL,
  semester TEXT NOT NULL,
  batch TEXT NOT NULL,
  cgpa REAL DEFAULT 0,
  completed_credits INTEGER DEFAULT 0,
  required_credits INTEGER DEFAULT 132,
  max_credits INTEGER DEFAULT 19
);
`);

module.exports = db;