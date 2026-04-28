const express = require("express");
const cors = require("cors");
const database = require("./db");
require("dotenv").config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Mood Library backend is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/api/moods", (request, response) => {
  database.all("SELECT * FROM moods", (error, rows) => {
    if (error) {
      return response.status(500).json(error)
    } else {
      return response.status(200).json(rows)
    }
  });
});

app.get("/api/songs", (request, response) => {
  database.all(
    `SELECT songs.id, songs.title, songs.artist, moods.mood
     FROM songs
     JOIN moods ON songs.moodId = moods.id`,
    (error, rows) => {
      if (error) {
        return response.status(500).json(error);
      }

      return response.status(200).json(rows);
    }
  );
});

app.post("/api/songs", (request, response) => {
  const { title, artist, moodId } = request.body;
  const userId = 1;

  database.run(
    "INSERT INTO songs (title, artist, userId, moodId) VALUES (?, ?, ?, ?)",
    [title, artist, userId, moodId],
    (error) => {
      if (error) {
        return response.status(500).json(error);
      } else {
        return response.status(201).json({ message: "Song added" });
      }
    }
  );
});

app.delete("/api/songs/:id", (request, response) => {
  const songId = request.params.id;

  database.run(
    "DELETE FROM songs WHERE id = ?",
    [songId],
    function (error) {
      if (error) {
        return response.status(500).json({ error: error.message });
      }

      return response.status(200).json({
        message: "Song deleted successfully",
        deletedId: songId
      });
    }
  );
});