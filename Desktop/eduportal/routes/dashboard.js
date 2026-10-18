const express = require('express');
const db = require('../db/database');
const { requireLogin } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', requireLogin, (req, res) => {
  const student = db.prepare('SELECT * FROM students WHERE id = ?').get(req.session.user.id);
  res.render('dashboard', { student, active: 'dashboard' });
});

module.exports = router;