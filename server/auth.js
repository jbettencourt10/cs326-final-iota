// Import pgPromise and miniCrypt
import pgPromise from 'pg-promise';
import { MiniCrypt } from './miniCrypt.js';

// Create miniCrypt object
const secureAuth = new MiniCrypt;

/**
 * Find a user with a particular username
 * @param {Database Connection} database
 * @param {string} username
 * @returns users that fit particular username
 */
export async function findUser(database, username) {
    try {
        const result = await database.any({ text: 'Select * from Users where Username=$1', values: [username] });
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/**
 * Add a user to Users table
 * @param {Database Connection} database
 * @param {<string, string, string, string>} registerObject
 * @returns success (true) or failure (false)
 */
export async function addUser(database, registerObject) {
    try {
        if ((await findUser(database, registerObject.username)).length > 0) {
            // Username already exists
            return false;
        }
        await database.none({ text: 'INSERT INTO Users(Username, Salt, Hash, CreationTime, FullName) VALUES ($1, $2, $3, current_date, $4)', values: [registerObject.username, registerObject.salt, registerObject.hash, registerObject.fullName] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

/**
 * Change name of specified user to new name
 * @param {Database Connection}} database
 * @param {<string, string>} nameObject
 */
export async function changeName(database, nameObject) {
    try {
        await database.none({ text: 'UPDATE users set fullName=$1 where username=$2', values: [nameObject.name, nameObject.username] });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Updates salt and hash for specified user
 * @param {Database Connection} database
 * @param {<string, string, string>} passwordObject
 */
export async function changePassword(database, passwordObject) {
    try {
        const saltHash = secureAuth.hash(passwordObject.password);
        await database.none({ text: 'UPDATE users SET salt=$1, hash=$2 WHERE username=$3', values: [saltHash[0], saltHash[1], passwordObject.username] });
    } catch (error) {
        console.log(error);
    }
}
