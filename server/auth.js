import pgPromise from 'pg-promise';

export async function findUser(database, username) {
    try {
        const result = await database.any({ text: 'Select * from Users where Username=$1', values: [username] });
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getSaltHash(database, userObject) {
    try {
        const result = await database.any({ text: 'Select * from users where Username=$1 and Hash=$2', values: [userObject.username, userObject.hash] });
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function addUser(database, registerObject) {
    try {
        if ((await findUser(database, registerObject.username)).length > 0) {
            // Username already exists
            return false;
        }

        await database.none({ text: 'INSERT INTO Users(Username, Salt, Hash, CreationTime, FullName, LoginCount, WatchTime, PagesRead, ListenTime) VALUES ($1, $2, $3, current_timestamp, $4, 1, 0, 0, 0)', values: [registerObject.username, registerObject.salt, registerObject.hash, registerObject.fullName] });
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}
