import { useState } from "react";

function AddSong({ moods, fetchSongs, currentUser }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState("");
  const [songUrl, setSongUrl] = useState("");

async function handleSubmit(event) {
  event.preventDefault();

  if (!currentUser) {
    return;
  }

  if (!title || !artist || !mood) {
    return;
  }

  const newSong = {
    title,
    artist,
    moodId: Number(mood),
    userId: currentUser.id,
    songUrl 
  };

  const response = await fetch("http://localhost:5000/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSong)
  });

  if (!response.ok) {
    console.error("Failed to add song");
    return;
  }

  await fetchSongs();

  setTitle("");
  setArtist("");
  setMood("");
  setSongUrl("")
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
        <label>
          Song URL (YouTube)
          <input
            value={songUrl}
            onChange={(e) => setSongUrl(e.target.value)}
          />
        </label>
        <button type="submit">Add Song</button>
      </form>
    </section>
  );
}

export default AddSong;