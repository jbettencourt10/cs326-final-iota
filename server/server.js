import express from 'express';
import {connectDB, findUser, initializeTables} from './database.js'
import expressSession from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';


const app = express();


app.use(express.json());
app.use(express.static('client'));


const db = await connectDB();
await initializeTables(db);


app.get('/', (req, res) => {
    res.sendFile('client/index.html', { root: '.' });
    // TODO: RESPONSE
});

app.get('/signup-page', (req, res) => {
    res.sendFile('client/sign-up.html', { root: '.' });
    // TODO: RESPONSE
});

app.get('/login', (req, res) => {


    res.sendFile('client/list.html', { root: '.' });
});

app.get('/account', (req, res) => {
    res.sendFile('client/account.html', {root: '.'});
});

app.post('register', (req, res) => {
    res.sendFile('client/list.html', { root: '.' });
});

app.get('/search', (req, res) => {
    res.sendFile('client/list.html', { root: '.' });
});

app.get('/create',  (req, res) => {
    res.sendFile('client/list.html', { root: '.' });
});

app.get('/delete', (req, res) => {

});

app.get('/read', (req, res) => {
    res.sendFile('client/list.html', { root: '.' });
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
