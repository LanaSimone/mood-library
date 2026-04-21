import { useState } from "react";

function AddSong({ onAddSong }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("submitted")

    const newSong = {
      title,
      artist,
      mood
    };

    onAddSong(newSong);

    setTitle("")
    setArtist("")
    setMood("")
  }

  return (
    <section className="page">
      <h2>Add Song</h2>
      <p>Add a new song to your collection.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Artist
          <input
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
          />
        </label>
        <label>
          Mood
          <input
            value={mood}
            onChange={(event) => setMood(event.target.value)}
          />
        </label>
        <button type="submit">Add Song</button>
      </form>
    </section>
  );
}

export default AddSong;