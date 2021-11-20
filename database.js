


function connectDB(){
    const dbURL = process.env.DATABASE_URL || 'postgres://326iota:n8c726ezve4dq8bo@localhost:5432/postgres';
    const pgp = pgPromise({});
    const db = pgp(dbURL);
    return db
}


function addToList() {

}


function removeFromList(){

}


function initializeTables(database) {
    return database.
}
