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

// export function addToList() {
//     try {

//     } catch (error) {

//     }
// }

// export function removeFromList(database, mediaObject, userObject) {
//     try {

//     } catch (error) {

//     }
// }

export async function initializeTables(database) {
    try {
        await database.none('CREATE TABLE IF NOT EXISTS Users(Username VARCHAR(30) PRIMARY KEY, Password VARCHAR(128), FullName VARCHAR(50), Email VARCHAR(100), CreationTime TIMESTAMP, LoginCount INT, WatchTime REAL, PagesRead INT, ListenTime REAL)');
        await database.none('CREATE TABLE IF NOT EXISTS MediaEntries(Username VARCHAR(30) REFERENCES Users (Username), Title VARCHAR(50), Medium VARCHAR(10), List VARCHAR(10), TimeAdded TIMESTAMP, Pages int, WatchTime REAL, ListenTime REAL, ImageLink VARCHAR(100), UserRating REAL, ImdbRating REAL)');
    } catch (error) {
        console.log(error);
    }
}
