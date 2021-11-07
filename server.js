import express from 'express';
import faker from 'faker';
import { getIMDBSearch } from './client/imdbFunctions.js';

const IMDB_API_KEY = 'k_t249l7q8';

const app = express();

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
    res.sendFile('client/list.html', { root: '.' });
});

app.post('register', (req, res) => {
    // const emailAddress = req.email;
    // const { name } = req;
    // const { username } = req;
    // // TODO: check for different passwords
    // if (req.password === req.verifypassword) {
    //     const { password } = req;
    // }
});

app.get('/search', (req, res) => {
    // const searchResult = await getIMDBSearch(req.query.title, req.query.media);
    res.sendFile('client/search.html', { root: '.' });

});

app.get('*', (req, res) => {
    res.send('Error 404: Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
