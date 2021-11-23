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

export async function validateUser(database, userObject) {
    try {
        const result = await database.any({ text: 'Select * from users where Username=$1 and Password=$2', values: [userObject.username, userObject.password] });
        return result;
    } catch (error) {
        console.log(error);
        return [];
    }
}
