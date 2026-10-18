const express = require('express');
const bcrypt = require('bcryptjs');
const svgCaptcha = require('svg-captcha');
const db = require('../db/database');
const { redirectIfLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res) => res.redirect('/login'));

router.get('/captcha', (req, res) => {
  const c = svgCaptcha.create({ size: 5, noise: 3, color: true, ignoreChars: '0oO1iIl' });
  req.session.captcha = c.text;
  res.set('Cache-Control', 'no-store');
  res.type('svg').send(c.data);
});

router.get('/login', redirectIfLoggedIn, (req, res) => {
  res.render('login', { error: null });
});

router.post('/login', redirectIfLoggedIn, (req, res) => {
  const { studentId, password, captcha } = req.body;

  const expected = req.session.captcha;
  req.session.captcha = null; // captcha sirf aik dafa use hoga

  if (!expected || captcha !== expected) {
    return res.render('login', { error: 'Captcha code galat hai.' });
  }

  const student = db
    .prepare('SELECT * FROM students WHERE student_id = ?')
    .get((studentId || '').trim());

  if (!student || !bcrypt.compareSync(password || '', student.password_hash)) {
    return res.render('login', { error: 'Student ID ya Password galat hai.' });
  }

  req.session.regenerate((err) => {
    if (err) return res.render('login', { error: 'Session error, dobara try karein.' });
    req.session.user = { id: student.id, studentId: student.student_id, name: student.name };
    res.redirect('/dashboard');
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

module.exports = router;