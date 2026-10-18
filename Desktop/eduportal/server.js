require('dotenv').config();
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, sameSite: 'lax', maxAge: 1000 * 60 * 30 }
  })
);

app.use(require('./routes/auth'));
app.use(require('./routes/dashboard'));

app.use((req, res) => res.status(404).send('404 - Page nahi mila'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`EduPortal chal raha hai: http://localhost:${PORT}`));