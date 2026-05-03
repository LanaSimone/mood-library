import { useState } from "react";
import SongCard from "../components/SongCard";

function Moods({ songs, moods }) {
  const [selectedMood, setSelectedMood] = useState(null);

  const groupedSongs = songs.reduce((groups, song) => {
    if (!groups[song.mood]) {
      groups[song.mood] = [];
    }

    groups[song.mood].push(song);
    return groups;
  }, {});

  if (selectedMood) {
    const selectedSongs = groupedSongs[selectedMood] || [];

    {selectedSongs.length === 0 && (
        <p>This playlist is empty.</p>
    )}

    return (
      <section className="page">
        <button onClick={() => setSelectedMood(null)}>
          Back to moods
        </button>

        <h2>{selectedMood} Playlist</h2>
        <p>
          {selectedSongs.length} song
          {selectedSongs.length === 1 ? "" : "s"}
        </p>

        <div className="song-grid">
          {selectedSongs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              moods={moods}
              onDelete={() => {}}
              onEdit={() => {}}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>Mood Playlists</h2>
      <p>Pick a mood and play songs that match how you feel.</p>
      <div className="mood-grid">
        {Object.keys(groupedSongs).length === 0 && (
            <p>No playlists yet. Add songs to create your first mood playlist.</p>
        )}
        {Object.entries(groupedSongs).map(([mood, moodSongs]) => (
          <div
            className="mood-card"
            key={mood}
            onClick={() => {
              console.log("Clicked mood:", mood);
              setSelectedMood(mood);
            }}
            style={{ cursor: "pointer" }}
          >
            <h3>{mood}</h3>
            <p>
              {moodSongs.length} song
              {moodSongs.length === 1 ? "" : "s"}
            </p>
            <p className="preview-song">{moodSongs[0].title}</p>
            
          </div>
        ))}
      </div>
    </section>
  );
}

export default Moods;