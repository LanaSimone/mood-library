import { useState } from "react";

function AddSong({ onAddSong, moods }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const newSong = {
      title,
      artist,
      moodId: mood
    };

    await fetch("http://localhost:5000/api/songs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newSong)
    })
   
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
          <select value={mood} onChange={(event) => setMood(event.target.value)}>
            <option value="">Select a mood</option>
            {moods.map((moodOption) => (
                <option key={moodOption.id} value={moodOption.id}>
                    {moodOption.mood}
                </option>
            ))}
        </select>
        </label>
        <button type="submit">Add Song</button>
      </form>
    </section>
  );
}

export default AddSong;