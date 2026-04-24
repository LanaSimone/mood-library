const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const databasePath = path.join(__dirname, "mood-library.db");

const database = new sqlite3.Database(databasePath, (error) => {
  if (error) {
    console.error("Database connection error:", error.message);
  } else {
    console.log("Connected to SQLite database");

    database.serialize(() => {
      database.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        )
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS moods (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          mood TEXT UNIQUE
        )
      `);

      database.run(`
        CREATE TABLE IF NOT EXISTS songs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          artist TEXT,
          userId INTEGER,
          moodId INTEGER
        )
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("happy")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("sad")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("chill")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("romantic")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("energetic")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("nostalgic")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("focus")
      `);

      database.run(`
        INSERT OR IGNORE INTO moods (mood)
        VALUES ("late night")
      `);
    });
  }
});

module.exports = database;