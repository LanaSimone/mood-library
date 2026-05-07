import { useState } from "react";

function AddSong({ moods, fetchSongs, currentUser }) {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [moodId, setMoodId] = useState("");
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  function showMessage(text, type) {
    setMessage(text);
    setMessageType(type);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      showMessage("Please enter a song title.", "error");
      return;
    }

    if (!artist.trim()) {
      showMessage("Please enter an artist name.", "error");
      return;
    }

    if (!moodId) {
      showMessage("Please select a mood.", "error");
      return;
    }

    if (!url.trim()) {
      showMessage("Please enter a YouTube URL.", "error");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      showMessage("Please enter a valid YouTube URL.", "error");
      return;
    }

    try {
      const response = await fetch("https://mood-library-api.onrender.com/api/songs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title.trim(),
          artist: artist.trim(),
          moodId,
          url: url.trim(),
          userId: currentUser.id
        })
      });

      if (!response.ok) {
        showMessage("Song could not be added. Please try again.", "error");
        return;
      }

      await fetchSongs();

      setTitle("");
      setArtist("");
      setMoodId("");
      setUrl("");

      showMessage("Song added successfully!", "success");
    } catch (error) {
      console.error("Error adding song:", error);
      showMessage("Something went wrong while adding the song.", "error");
    }
  }

  return (
    <section className="page add-song-page">
      <div className="form-card">
        <h2>Add Song</h2>
        <p>Add a new song to your collection.</p>

        {message && (
          <div className={`form-message ${messageType}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Enter song title"
            />
          </label>

          <label>
            Artist
            <input
              type="text"
              value={artist}
              onChange={(event) => setArtist(event.target.value)}
              placeholder="Enter artist name"
            />
          </label>

          <label>
            Mood
            <select
              value={moodId}
              onChange={(event) => setMoodId(event.target.value)}
            >
              <option value="">Select a mood</option>
              {moods.map((mood) => (
                <option key={mood.id} value={mood.id}>
                  {mood.mood}
                </option>
              ))}
            </select>
          </label>

          <label>
            Song URL (YouTube)
            <input
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="Enter YouTube link"
            />
          </label>

          <button type="submit">Add Song</button>
        </form>
      </div>
    </section>
  );
}

export default AddSong;