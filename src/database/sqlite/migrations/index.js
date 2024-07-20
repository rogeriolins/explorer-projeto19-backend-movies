const sqliteConnection = require("../../sqlite");
const createUsers  = require("./createusers");
const createMovies = require("./createmovies");
const createTags   = require("./createtags");

async function migrationsRun() {
    const schemas = [
        createUsers,
        createMovies,
        createTags
    ].join(" ");

    sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.log(error));
}

module.exports = migrationsRun;