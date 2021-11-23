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
        await database.none('CREATE TABLE IF NOT EXISTS Users(Username VARCHAR(30) PRIMARY KEY, Password VARCHAR(128), FullName VARCHAR(50), Email VARCHAR(100), CreationTime TIMESTAMP, LoginCount INT, WatchTime REAL, PagesRead INT, ListenTime REAL)');
        await database.none('CREATE TABLE IF NOT EXISTS MediaEntries(Username VARCHAR(30) REFERENCES Users (Username), Title VARCHAR(50), Medium VARCHAR(10), List VARCHAR(10), TimeAdded TIMESTAMP, Pages int, WatchTime REAL, ListenTime REAL, ImageLink VARCHAR(100), UserRating REAL, ImdbRating REAL)');
    } catch (error) {
        console.log(error);
    }
}

export async function getUserEntries(database, queryObject) {
    try {
        const results = await database.any({ text: 'SELECT * FROM MediaEntries where username=$1 and medium=$2 and list=$3', values: [queryObject.username, queryObject.medium, queryObject.list] });
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function removeUserEntry(database, queryObject) {
    try {
        await database.none({ text: 'DELETE FROM MediaEntries where username=$1 and title=$2', values: [queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function updateUserRating(database, queryObject) {
    try {
        await database.none({ text: 'UPDATE MediaEntries SET UserRating=$1 where username=$2 and title=$3', values: [queryObject.newRating, queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// TODO: MOVE ITEM FROM ONE LIST TO ANOTHER
export async function changeItemList(database, queryObject) {
    try {
        await database.none({ text: 'UPDATE MediaEntries SET list=$1 where username=$2 and title=$3', values: [queryObject.newList, queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
