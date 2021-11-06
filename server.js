
'use strict';
import express from 'express';

const app = express();

app.use(express.json()); // lets you handle JSON input

const port = 8080;

const datastore = {};

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/create', (req, res) => {
    // TODO: PARSE OUT KEY AND VALUE FROM *QUERY* INTO k AND v
    datastore[k] = v;
    console.log(`Set ${k} to ${v}`);
    res.send('Set.');
});

app.get('/read', (req, res) => {
    // TODO: PARSE OUT KEY FROM *QUERY* into k
    const v = datastore[k];
    res.send(`key = ${k}, value = ${v}`);
});

//   curl -d '{ "value" : "12" }' -H "Content-Type: application/json" http://localhost:3000/read/x
app.get('/read/:key', (req, res) => {
    // TODO: PARSE OUT KEY FROM *PARAMS* INTO k
    const v = datastore[k];
    res.send(`key = ${k}, value = ${v}`);
});

//   curl -d '{ "key" : "x", "value" : "12" }' -H "Content-Type: application/json" http://localhost:3000/pcreate
app.post('/pcreate', (req, res) => {
    // TODO: PARSE OUT KEY AND VALUE FROM req.body INTO k and v
    datastore[k] = v;
    console.log(`Set ${k} to ${v}, body = ${JSON.stringify(req.body)}`);
    res.send('Set.');
});

app.get('*', (req, res) => {
    res.send('NO FOOL, BAD COMMAND');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
