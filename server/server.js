import express, { json } from 'express';
import expressSession from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { connectDB, initializeTables, changeItemList, addUserEntry, getUserEntries, removeUserEntry, updateUserRating } from './database.js';
import { findUser, addUser, changePassword, changeName } from './auth.js';
import { getTopIMDB, imdbSearch } from '../client/imdb-functions.js';
import { MiniCrypt } from './miniCrypt.js';


const app = express();

app.use(express.static('client'));

const session = {
  secret: process.env.SECRET || 'SECRET',
  resave: false,
  saveUninitialized: false,
};

const db = await connectDB();
await initializeTables(db);
const secureAuth = new MiniCrypt;

const strategy = new LocalStrategy(
  async (username, password, done) => {
    const userResult = await findUser(db, username);
    if (userResult.length === 0) {
      return done(null, false, { message: 'Wrong username' });
    }
    if (!secureAuth.check(password, userResult[0].salt, userResult[0].hash)) {
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
});

app.post('/register',
  async (req, res) => {
    const userAuth = secureAuth.hash(req.body.password);
    // Succesfully registered
    if (await addUser(db, { 'username': req.body.username, 'salt': userAuth[0], 'hash': userAuth[1], 'fullName': req.body.fullName })) {
      // route them to their list page
      res.redirect('/list');
    }
    // Error or account already existed
    else {
      res.redirect('/register');
    }
  });

app.get('/register', (req, res) => {
  res.sendFile('client/sign-up.html', { root: '.' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/index.html');
});

app.post('/changeName', async (req, res) => {
  await changeName(db, { name: req.body.name, username: req.user });
  res.redirect('/list');
});

app.post('/changePassword', async (req, res) => {
  await changePassword(db, { password: req.body.password, username: req.user });
  res.redirect('/list');
});

app.post('/login',
  passport.authenticate('local', { // use username/password authentication
    successRedirect: '/list', // when we login, go to /private
    failureRedirect: '/', // otherwise, back to login
  }));

app.get('/list',
  checkLoggedIn, // If we are logged in (notice the comma!)...
  (req, res) => { // Go to the user's page.
    res.redirect(`/list/${req.user}`);
  });

app.get('/list/:username/',
  checkLoggedIn, // We also protect this route: authenticated...
  (req, res) => {
    // Verify this is the right user.
    if (req.params.username === req.user) {
      res.sendFile('client/list.html', { root: '.' });
    } else {
      res.redirect('/');
    }
  });

app.get('/account', checkLoggedIn, (req, res) => {
  res.redirect(`/account/${req.user}`);
});

app.get('/account/:username', checkLoggedIn, (req, res) => {
  res.sendFile('client/account.html', { root: '.' });
});

app.get('/search', (req, res) => {
  res.sendFile('client/search.html',
    { root: '.' });
});

app.get('/books', (req, res) => {
  res.redirect(`/list/${req.user}?mediaType=books`);
});

app.get('/movies', (req, res) => {
  res.redirect(`/list/${req.user}?mediaType=Movies`);
});

app.get('/tvs', (req, res) => {
  res.redirect(`/list/${req.user}?mediaType=Series`);
});

app.get('/music', (req, res) => {
  res.redirect(`/list/${req.user}?mediaType=music`);
});

app.get('/customList', checkLoggedIn, (req, res) => {
  res.redirect(`/customList/${req.user}`);
});

app.get('/customList/:username', checkLoggedIn, (req, res) => {
  res.sendFile('client/customList.html',
    { root: '.' });
});

app.get('/analytics', checkLoggedIn, (req, res) => {
  res.redirect(`/analytics/${req.user}`);
});

app.get('/analytics/:username', checkLoggedIn, (req, res) => {
  res.sendFile('client/analytics.html',
    { root: '.' });
});

app.get('/add', async (req, res) => {
  await addUserEntry(db, { username: req.user, title: req.query.Title, imageLink: req.query.ImageLink, medium: req.query.Medium });
  res.redirect('/list');
});

app.get('/getList', async (req, res) => {
  const result = await getUserEntries(db, { username: req.user, list: req.query.list, limit: req.query.limit, offset: req.query.offset, mediaType: req.query.mediaType });
  res.send(JSON.parse(JSON.stringify(result)));
});

app.get('/updateItem', async (req, res) => {
  if (req.query.list === 'remove') {
    await removeUserEntry(db, { username: req.user, title: req.query.title });
  } else {
    if (req.query.list !== 'empty') {
      await changeItemList(db, { username: req.user, newList: req.query.list, title: req.query.title });
    }
    if (req.query.rating !== "") {
      await updateUserRating(db, { username: req.user, title: req.query.title, newRating: req.query.rating });
    }
  }
  res.redirect('/list');
});

// app.get('/create', (req, res) => {
//   res.sendFile('client/list.html', { root: '.' });
// });

// app.get('/delete', (req, res) => {

// });

// app.get('/update', (req, res) => {
//   res.sendFile('client/list.html', { root: '.' });
// });

// app.get('*', (req, res) => {
//   res.redirect('/logout');
// });

app.listen(process.env.PORT || 8080, () => {
  console.log(`MyMediaMix listening at http://localhost:${process.env.PORT || 8080}`);
});
