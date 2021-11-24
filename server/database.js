import pgPromise from 'pg-promise';

export async function connectDB() {
    const dbURL = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/postgres';
    const options = {
        connectionString: dbURL,
        ssl: { rejectUnauthorized: false },
    };
    if (!process.env.DATABASE_URL) {
        delete options.ssl;
    }
    const pgp = pgPromise({});
    const db = pgp(options);
    return db;
}

export async function initializeTables(database) {
    try {
        await database.none('CREATE TABLE IF NOT EXISTS Users(Username VARCHAR(30) PRIMARY KEY, Salt VARCHAR(64), Hash VARCHAR(256), FullName VARCHAR(50), CreationTime TIMESTAMP, LoginCount INT, WatchTime REAL, PagesRead INT, ListenTime REAL)');
        await database.none('CREATE TABLE IF NOT EXISTS MediaEntries(Username VARCHAR(30) REFERENCES Users (Username), Title VARCHAR(150), Medium VARCHAR(10), List VARCHAR(10), TimeAdded TIMESTAMP, Pages int, WatchTime REAL, ListenTime REAL, ImageLink VARCHAR(300), UserRating REAL, ImdbRating REAL)');
    } catch (error) {
        console.log(error);
    }
}

export async function addUserEntry(database, queryObject) {
    try {
        if((await database.any({text: 'SELECT * FROM MediaEntries WHERE username=$1 AND title=$2 AND medium=$3', values: [queryObject.username, queryObject.title, queryObject.medium]})).length === 0){
            console.log(queryObject);
            await database.none({text: 'INSERT INTO MediaEntries (Username, Title, Medium, List, ImageLink) Values ($1, $2, $3, $4, $5)', values: [queryObject.username, queryObject.title, queryObject.medium, 'planned', queryObject.imageLink]});
            return true;
        }
        else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function getUserEntries(database, queryObject) {
    try {
        const results = await database.any({ text: 'SELECT * FROM MediaEntries WHERE username=$1 AND list=$2 LIMIT $3 OFFSET $4', values: [queryObject.username, queryObject.list, queryObject.limit, queryObject.offest] });
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function removeUserEntry(database, queryObject) {
    try {
        await database.none({ text: 'DELETE FROM MediaEntries WHERE username=$1 AND title=$2', values: [queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function updateUserRating(database, queryObject) {
    try {
        await database.none({ text: 'UPDATE MediaEntries SET UserRating=$1 WHERE username=$2 AND title=$3', values: [queryObject.newRating, queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// TODO: MOVE ITEM FROM ONE LIST TO ANOTHER
export async function changeItemList(database, queryObject) {
    try {
        await database.none({ text: 'UPDATE MediaEntries SET list=$1 WHERE username=$2 AND title=$3', values: [queryObject.newList, queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
