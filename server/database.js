// Necessary pgPromise import
import pgPromise from 'pg-promise';

/**
 * Connects to database with tables MediaEntries and Users
 * @returns Database connection
 */
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

/**
 * Creates tables Users and MediaEntries in database if they do not exist
 * @param {DatabaseConnection} database
 */
export async function initializeTables(database) {
    try {
        await database.none('CREATE TABLE IF NOT EXISTS Users(Username VARCHAR(30) PRIMARY KEY, Salt VARCHAR(64), Hash VARCHAR(256), FullName VARCHAR(50), CreationTime DATE)');
        await database.none('CREATE TABLE IF NOT EXISTS MediaEntries(Username VARCHAR(30) REFERENCES Users (Username), Title VARCHAR(150), Medium VARCHAR(10), List VARCHAR(10), TimeStarted DATE, TimeCompleted DATE, ImageLink VARCHAR(300), UserRating REAL)');
    } catch (error) {
        console.log(error);
    }
}

/**
 * Add an entry to MediaEntries table with associated queryObject information
 * @param {DatabaseConnection} database
 * @param {<string, string, string>} queryObject
 * @returns success (true) or failure (false)
 */
export async function addUserEntry(database, queryObject) {
    try {
        if ((await database.any({ text: 'SELECT * FROM MediaEntries WHERE username=$1 AND title=$2 AND medium=$3', values: [queryObject.username, queryObject.title, queryObject.medium] })).length === 0) {
            await database.none({ text: 'INSERT INTO MediaEntries (Username, Title, Medium, List, ImageLink) Values ($1, $2, $3, $4, $5)', values: [queryObject.username, queryObject.title, queryObject.medium, 'planned', queryObject.imageLink] });
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

/**
 * Gets a user's list entries
 * @param {DatabaseConnection} database
 * @param {<string, string, int>} queryObject
 * @returns list of entries on a user's list
 */
export async function getUserEntries(database, queryObject) {
    try {
        if (queryObject.mediaType === "all") {
            const results = database.any({ text: 'SELECT * FROM MediaEntries WHERE username=$1 AND list=$2 OFFSET $3', values: [queryObject.username, queryObject.list, queryObject.offset] });
            return results;
        }
        const results = database.any({ text: 'SELECT * FROM MediaEntries WHERE username=$1 AND medium=$2 AND list=$3 OFFSET $4', values: [queryObject.username, queryObject.mediaType, queryObject.list, queryObject.offset] });
        return results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Removes an entry from a user's list
 * @param {DatabaseConnection} database
 * @param {<string, string>} queryObject
 * @returns success (true) or failure (false)
 */
export async function removeUserEntry(database, queryObject) {
    try {
        await database.none({ text: 'DELETE FROM MediaEntries WHERE username=$1 AND title=$2', values: [queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Updates a user's rating for an entry on their list
 * @param {DatabaseConnection} database
 * @param {<int, string, string>} queryObject
 * @returns success (true) or failure (false)
 */
export async function updateUserRating(database, queryObject) {
    try {
        await database.none({ text: 'UPDATE MediaEntries SET UserRating=$1 WHERE username=$2 AND title=$3', values: [queryObject.newRating, queryObject.username, queryObject.title] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Change item to another list
 * @param {DatabaseConnection} database
 * @param {<int, string, string>} queryObject
 * @returns success (true) or failure (false)
 */
export async function changeItemList(database, queryObject) {
    try {
        if (queryObject.newList === "inProgress") {
            await database.none({ text: 'UPDATE MediaEntries SET list=$1, timestarted=current_date, timecompleted=NULL WHERE username=$2 AND title=$3', values: [queryObject.newList, queryObject.username, queryObject.title] });
        } else if (queryObject.newList === "completed") {
            await database.none({ text: 'UPDATE MediaEntries SET list=$1, timestarted=current_date WHERE username=$2 AND title=$3 AND timestarted IS NULL', values: [queryObject.newList, queryObject.username, queryObject.title] });
            await database.none({ text: 'UPDATE MediaEntries SET list=$1, timecompleted=current_date WHERE username=$2 AND title=$3', values: [queryObject.newList, queryObject.username, queryObject.title] });
        } else {
            await database.none({ text: 'UPDATE MediaEntries SET list=$1, timestarted=NULL, timecompleted=NULL WHERE username=$2 AND title=$3', values: [queryObject.newList, queryObject.username, queryObject.title] });
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get account age
 * @param {DatabaseConnection} database
 * @param {<string>} queryObject
 * @returns account age or failure (false)
 */
export async function accountAge(database, queryObject) {
    try {
        const response = await database.any({ text: 'SELECT current_date - creationtime FROM users WHERE username=$1', values: [queryObject.username] });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get item count of particular user
 * @param {DatabaseConnection} database
 * @param {<string, string>} queryObject
 * @returns item count or failure (false)
 */
export async function itemCount(database, queryObject) {
    try {
        if (queryObject.time === "week") {
            const response = await database.any({ text: 'SELECT COUNT (*) FROM MediaEntries WHERE username=$1 AND medium=$2 AND timecompleted-timestarted < 7', values: [queryObject.username, queryObject.medium] });
            return response;
        }
        const response = await database.any({ text: 'SELECT COUNT (*) FROM MediaEntries WHERE username=$1 AND medium=$2 AND timecompleted IS NOT NULL', values: [queryObject.username, queryObject.medium] });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get items on In Progress list
 * @param {DatabaseConnection} database
 * @param {<string>} queryObject
 * @returns items started or failure (false)
 */
export async function itemsStarted(database, queryObject) {
    try {
        if (queryObject.time === "week") {
            const response = await database.any({ text: 'SELECT COUNT (*) FROM MediaEntries WHERE username=$1 AND timestarted IS NOT NULL AND timecompleted IS NULL AND current_date-timestarted < 7', values: [queryObject.username] });
            return response;
        }
        const response = await database.any({ text: 'SELECT COUNT (*) FROM MediaEntries WHERE username=$1 AND timestarted IS NOT NULL AND timecompleted IS NULL', values: [queryObject.username] });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get average time of item on list
 * @param {DatabaseConnection} database
 * @param {<string, string>} queryObject
 * @returns average time or failure (false)
 */
export async function averageTime(database, queryObject) {
    try {
        const response = await database.any({ text: 'SELECT AVG (timecompleted - timestarted) FROM MediaEntries WHERE username=$1 AND medium=$2 AND timestarted IS NOT NULL AND timecompleted IS NOT NULL', values: [queryObject.username, queryObject.medium] });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Get average rating of items on user's list
 * @param {DatabaseConnection} database
 * @param {<string, string>} queryObject
 * @returns account age or failure (false)
 */
export async function averageRating(database, queryObject) {
    try {
        const response = await database.any({ text: 'SELECT AVG (userrating) FROM MediaEntries WHERE username=$1 AND medium=$2 AND userrating IS NOT NULL', values: [queryObject.username, queryObject.medium] });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function fullName(database, queryObject) {
    try {
        const response = await database.any({ text: 'SELECT fullname FROM Users WHERE username=$1', values: [queryObject.username] });
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}
