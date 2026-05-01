import { useState } from "react";

function AddSong({ moods, fetchSongs, currentUser }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [mood, setMood] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

async function handleSubmit(event) {
  event.preventDefault();
  setErrorMessage("");

  if (!currentUser) {
    setErrorMessage("Please log in before adding a song.");
    return;
  }

  if (!title.trim()) {
    setErrorMessage("Please enter a song title.");
    return;
  }

  if (!artist.trim()) {
    setErrorMessage("Please enter an artist name.");
    return;
  }

  if (!mood) {
    setErrorMessage("Please select a mood.");
    return;
  }

  if (songUrl && !songUrl.includes("youtube.com") && !songUrl.includes("youtu.be")) {
    setErrorMessage("Please enter a valid YouTube URL.");
    return;
  }

  const newSong = {
    title: title.trim(),
    artist: artist.trim(),
    moodId: Number(mood),
    userId: currentUser.id,
    songUrl: songUrl.trim()
  };

  const response = await fetch("http://localhost:5000/api/songs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newSong)
  });

  if (!response.ok) {
    setErrorMessage("Something went wrong while adding the song.");
    return;
  }

  await fetchSongs();

  setTitle("");
  setArtist("");
  setMood("");
  setSongUrl("");
}

  return (
    <section className="page">
      <h2>Add Song</h2>
      <p>Add a new song to your collection.</p>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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