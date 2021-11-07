import express from 'express';
import faker from 'faker';
import { getIMDBSearch } from './client/imdbFunctions.js';
import fs from 'fs';

const IMDB_API_KEY = 'k_t249l7q8';

const app = express();

// Just for testing, emulates a database
const testAccount = JSON.parse(fs.readFileSync('./user.json'));



app.use(express.json()); // lets you handle JSON input

const port = process.env.PORT || 8080;

const datastore = {};

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile('client/index.html', { root: '.' });
    // TODO: RESPONSE
});

app.get('/signup-page', (req, res) => {
    res.sendFile('client/sign-up.html', { root: '.' });
    // TODO: RESPONSE
});

app.get('/login', (req, res) => {
    // For now, pretend like we are logged in when we click login
    // This will change once we make a database
    res.sendFile('client/list.html', { root: '.' });
});

app.post('register', (req, res) => {
    // Once we have a database, the signup page will route
    // to list.html after signing up
    res.sendFile('client/list.html', { root: '.' });

    // const emailAddress = req.email;
    // const { name } = req;
    // const { username } = req;
    // // TODO: check for different passwords
    // if (req.password === req.verifypassword) {
    //     const { password } = req;
    // }
});

app.get('/search', async(req, res) => {
    const searchResult = await getIMDBSearch(req.query.title, req.query.media);
    res.sendFile('client/search.html', { root: '.' });

});

app.get('/delete', (req, res) => {
    // const searchResult = await getIMDBSearch(req.query.title, req.query.media);
    // console.log(searchResult);
    res.sendFile('client/search.html', { root: '.' });

});

app.get('*', (req, res) => {
    res.send('Error 404: Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
