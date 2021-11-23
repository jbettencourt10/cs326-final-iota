import express from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import fetch from 'node-fetch';
import { connectDB, initializeTables } from './database.js';
import { findUser, validateUser } from './auth.js';
import { getTopIMDB, imdbSearch } from '../client/imdb-functions.js';

const app = express();

app.use(express.static('client'));

const session = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

const db = await connectDB();
await initializeTables(db);

const strategy = new LocalStrategy(
  async (username, password, done) => {
    if ((await findUser(db, username)).length === 0) {
      return done(null, false, { message: 'Wrong username' });
    }
    if ((await validateUser(db, { username, password })).length === 0) {
      await new Promise((r) => setTimeout(r, 1000));
      return done(null, false, { message: 'Wrong password' });
    }
    return done(null, username);
  },
);

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
  done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
  done(null, uid);
});

app.use(express.json()); // allow JSON inputs
app.use(express.urlencoded({ extended: true }));

function checkLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
}

app.get('/', (req, res) => {
  res.sendFile('client/index.html', { root: '.' });
  // TODO: RESPONSE
});

app.get('/register', (req, res) => {
  res.sendFile('client/sign-up.html', { root: '.' });
});


// TODO:
app.post('/register', (req, res) => {
  res.sendFile('client/sign-up.html', { root: '.' });
});

app.get('/list', (req, res) => {
  res.sendFile('client/list.html', { root: '.' });
});

app.post('/login',
  passport.authenticate('local', { // use username/password authentication
    successRedirect: '/list', // when we login, go to /private
    failureRedirect: '/', // otherwise, back to login
  }));

app.get('/account', (req, res) => {
  res.sendFile('client/account.html', { root: '.' });
});

app.post('/register', (req, res) => {
  res.sendFile('client/list.html', { root: '.' });
});

app.get('/search', async (req, res) => {
  res.sendFile('client/search.html', { root: '.' });
});

app.get('/create', (req, res) => {
  res.sendFile('client/list.html', { root: '.' });
});

app.get('/delete', (req, res) => {

});

app.get('/update', (req, res) => {
  res.sendFile('client/list.html', { root: '.' });
});


app.get('*', (req, res) => {
  res.send('Error 404: Page not found');
});



app.listen(process.env.PORT || 8080, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT || 8080}`);
});
