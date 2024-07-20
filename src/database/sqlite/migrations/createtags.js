const createTags = `
    CREATE TABLE IF NOT EXISTS movies_tags (
      id        INTEGER PRIMARY KEY AUTOINCREMENT,
      note_id   INTEGER NOT NULL,
      user_id   INTEGER NOT NULL,
      name      VARCHAR NOT NULL,
      FOREIGN KEY (note_id) REFERENCES movies_notes(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
`
module.exports = createTags;