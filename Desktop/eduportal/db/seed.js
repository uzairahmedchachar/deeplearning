const bcrypt = require('bcryptjs');
const db = require('./database');

const insert = db.prepare(`
  INSERT OR IGNORE INTO students
  (student_id, name, password_hash, program, semester, batch, cgpa, completed_credits)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

insert.run(
  'S2023000001',
  'Demo Student',
  bcrypt.hashSync('Demo@123', 10),
  'BS Computer Science',
  'Fall 2026',
  'S2023000',
  3.10,
  115
);

console.log('Seed complete');