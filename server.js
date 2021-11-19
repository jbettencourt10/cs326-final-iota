import express from 'express';
import pgp from 'pg-promise';

const IMDB_API_KEY = 'k_t249l7q8';

const app = express();

app.use(express.json()); // lets you handle JSON input

const port = process.env.PORT || 8080;

// const dbURL = process.env.DATABASE_URL;

// const db = pgp(dbURL);

// console.log(db);

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

app.get('/account', (req, res) => {
    res.sendFile('client/account.html', {root: '.'});
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

// app.get('/search', async(req, res) => {
//     res.sendFile('client/list.html', { root: '.' });
// });

app.get('/create', async (req, res) => {
    if (req.query.media === 'TV'){
        testAccount['tv_list'].push([req.query.title, req.query.rating]);
    }
    else if (req.query.media === 'Movie') {
        testAccount['movie_list'].push([req.query.title, req.query.rating]);
    }
    fs.writeFileSync(userFile, JSON.stringify(testAccount));
    res.sendFile('client/list.html', { root: '.' });

});

app.get('/delete', (req, res) => {
    if (req.query.media === 'TV') {
        for (let i=0; i < testAccount['tv_list'].length; i++) {
            if (testAccount['tv_list'][i][0] === req.query.title){
                testAccount['tv_list'].splice(i, 1);
            }
        }
    }
    else if (req.query.media === 'Movie') {
        for (let i = 0; i < testAccount['movie_list'].length; i++) {
            if (testAccount['movie_list'][i][0] === req.query.title) {
                testAccount['movie_list'].splice(i, 1);
            }
        }
    }
    fs.writeFileSync(userFile, JSON.stringify(testAccount));
    res.sendFile('client/list.html', { root: '.' });

});

app.get('/read', (req, res) => {
    res.sendFile('client/list.html', { root: '.' });

});

app.get('/update', (req, res) => {
    if (req.query.media === 'TV') {
        for (let x of testAccount['tv_list']){
            if (x[0] === req.query.title){
                console.log(x);
                x[1] = req.query.rating;
            }
        }
    }
    if (req.query.media === 'Movie') {
        for (let x of testAccount['movie_list']) {
            if (x[0] === req.query.title) {
                x[1] = req.query.rating;
            }
        }
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
