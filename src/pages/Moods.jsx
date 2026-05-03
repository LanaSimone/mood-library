import { useState } from "react";

function Moods({ songs }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const groupedSongs = songs.reduce((groups, song) => {
    if (!groups[song.mood]) {
      groups[song.mood] = [];
    }
    groups[song.mood].push(song);
    return groups;
  }, {});

  function getEmbedUrl(url) {
    if (!url) return null;

    try {
      const youtubeUrl = new URL(url);

      if (youtubeUrl.hostname.includes("youtu.be")) {
        const videoId = youtubeUrl.pathname.slice(1);
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (youtubeUrl.hostname.includes("youtube.com")) {
        const videoId = youtubeUrl.searchParams.get("v");
        if (!videoId) return null;
        return `https://www.youtube.com/embed/${videoId}`;
      }

      return null;
    } catch {
      return null;
    }
  }

  if (selectedMood) {
    const playlist = groupedSongs[selectedMood] || [];
    const currentSong = playlist[currentIndex];
    const embedUrl = getEmbedUrl(currentSong?.songUrl);

    function handleNext() {
      if (currentIndex < playlist.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    function handlePrev() {
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }

    return (
      <section className="page">
        <button onClick={() => setSelectedMood(null)}>
          Back to moods
        </button>

        <h2>{selectedMood} Playlist</h2>

        {currentSong && (
          <div className="player-section">
            <h3>{currentSong.title}</h3>
            <p>{currentSong.artist}</p>

            {embedUrl && (
              <iframe
                width="100%"
                height="220"
                src={embedUrl}
                title="YouTube player"
                frameBorder="0"
                allowFullScreen
              />
            )}

            <div className="player-controls">
              <button onClick={handlePrev} disabled={currentIndex === 0}>
                Prev
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === playlist.length - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}

        <div className="playlist-list">
          {playlist.map((song, index) => (
            <div
              key={song.id}
              className={`playlist-item ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span>{song.title}</span>
              <span>{song.artist}</span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <h2>Mood Playlists</h2>

      <div className="mood-grid">
        {Object.entries(groupedSongs).map(([mood, moodSongs]) => (
          <div
            key={mood}
            className="mood-card"
            onClick={() => {
              setSelectedMood(mood);
              setCurrentIndex(0);
            }}
            style={{ cursor: "pointer" }}
          >
            <h3>{mood}</h3>
            <p>{moodSongs.length} songs</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Moods;