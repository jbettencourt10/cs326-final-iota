import express from 'express';

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
    const { username } = req;
    const { password } = req;
});

app.get('register', (req, res) => {
    const emailAddress = req.email;
    const { name } = req;
    const { username } = req;
    // TODO: check for different passwords
    if (req.password === req.verifypassword) {
        const { password } = req;
    }
});

app.post('/pcreate', (req, res) => {
    // TODO: PARSE OUT KEY AND VALUE FROM req.body INTO k and v
    datastore[k] = v;
    console.log(`Set ${k} to ${v}, body = ${JSON.stringify(req.body)}`);
    res.send('Set.');
});

app.get('*', (req, res) => {
    res.send('404: Page not found');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
