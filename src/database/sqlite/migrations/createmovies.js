const createMovies = `
    CREATE TABLE IF NOT EXISTS movies_notes (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        title       VARCHAR NOT NULL,
        description VARCHAR,
        rating      INTEGER,
        user_id     INTEGER NOT NULL,
        created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) 
            REFERENCES users(id)
                ON DELETE CASCADE
);`
module.exports = createMovies;