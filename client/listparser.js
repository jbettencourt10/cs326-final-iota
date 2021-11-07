

import fs from 'fs';

const database = fs.readFileSync('./../user.json');
const user = JSON.parse(database);

