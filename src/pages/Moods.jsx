import { useState } from "react";
import YouTube from "react-youtube";

function Moods({ songs }) {
  const [selectedMood, setSelectedMood] = useState(() => {
    return localStorage.getItem("selectedMood");
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const groupedSongs = songs.reduce((groups, song) => {
    if (!groups[song.mood]) {
      groups[song.mood] = [];
    }

    groups[song.mood].push(song);
    return groups;
  }, {});

  function getYouTubeVideoId(url) {
    if (!url) return null;

    try {
      const youtubeUrl = new URL(url);

      if (youtubeUrl.hostname.includes("youtu.be")) {
        return youtubeUrl.pathname.slice(1);
      }

      if (youtubeUrl.hostname.includes("youtube.com")) {
        return youtubeUrl.searchParams.get("v");
      }

      return null;
    } catch {
      return null;
    }
  }

  if (selectedMood) {
    const playlist = groupedSongs[selectedMood] || [];
    const currentSong = playlist[currentIndex];
    const videoId = getYouTubeVideoId(currentSong?.songUrl);

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
      <section className="page playlist-page">
        <button
          onClick={() => {
            setSelectedMood(null);
            localStorage.removeItem("selectedMood");
          }}
        >
          Back to moods
        </button>

        <h2 className="playlist-title">{selectedMood} Playlist</h2>

        {currentSong && (
          <div className="player-section">
            <div className="player-text">
              <h3>{currentSong.title}</h3>
              <p>{currentSong.artist}</p>
            </div>

            {videoId && (
              <div className="playlist-video-wrapper">
                <YouTube
                  videoId={videoId}
                  opts={{
                    width: "100%",
                    height: "520",
                    playerVars: { autoplay: 1 }
                  }}
                  onEnd={handleNext}
                />
              </div>
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

        <h4 className="up-next">Up Next</h4>

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
              localStorage.setItem("selectedMood", mood);
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