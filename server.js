import express from 'express';
import faker from 'faker';
import fs from 'fs';

const IMDB_API_KEY = 'k_t249l7q8';

const app = express();

// Just for testing, emulates a database
const userFile = './user.json';
const testAccount = JSON.parse(fs.readFileSync(userFile));


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
    res.sendFile('client/search.html', { root: '.' });

});

app.get('/add', async (req, res) => {
    if (req.query.media === 'TV'){
        testAccount['tv_list'].push(req.query.title);
    }
    else if (req.query.media === 'Movie') {
        testAccount['movie_list'].push(req.query.title);
    }
    fs.writeFileSync(userFile, JSON.stringify(testAccount));
    res.sendFile('client/list.html', { root: '.' });

});

app.get('/delete', (req, res) => {
    if (req.query.media === 'TV') {
        testAccount.tv_list = testAccount.tv_list.filter(t => t !== req.query.title);
    }
    else if (req.query.media === 'Movie') {
        testAccount.movie_list = testAccount.movie_list.filter(t => t !== req.query.title);
    }
    fs.writeFileSync(userFile, JSON.stringify(testAccount));
    res.sendFile('client/list.html', { root: '.' });

});

app.get('*', (req, res) => {
    res.send('Error 404: Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
