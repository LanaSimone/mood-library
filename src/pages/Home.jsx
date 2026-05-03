import { Link } from "react-router-dom";

function Home({ songs, currentUser }) {
  const populatedMoods = Object.values(
    songs.reduce((groups, song) => {
      if (!groups[song.mood]) {
        groups[song.mood] = {
          mood: song.mood,
          count: 0,
          previewSong: song.title
        };
      }

      groups[song.mood].count += 1;
      return groups;
    }, {})
  );

  return (
    <section className="page home-page">
      <div className="home-hero">
      <h2>Welcome back, {currentUser.username}</h2>
      <p>Here’s your mood-based music library.</p>
      <div className="hero-actions">
        <Link to="/add-song" className="action-card">
          Add Song
        </Link>
        <Link to="/moods" className="action-card secondary">
          Browse Moods
        </Link>
      </div>
    </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>{songs.length}</h3>
          <p>Total Songs</p>
        </div>
        <div className="dashboard-card">
          <h3>{populatedMoods.length}</h3>
          <p>Mood Playlists</p>
        </div>
      </div>
      <h2 className="home-section-title">Your Playlists</h2>
      {populatedMoods.length === 0 ? (
        <p>No playlists yet. Add a song to create your first mood playlist.</p>
      ) : (
        <div className="home-playlist-grid">
          {populatedMoods.map((playlist) => (
            <Link
              key={playlist.mood}
              to={`/moods?mood=${encodeURIComponent(playlist.mood)}`}
              className="home-playlist-card"
            >
              <h3>{playlist.mood}</h3>
              <p>{playlist.count} song{playlist.count === 1 ? "" : "s"}</p>
              <p className="preview-song">{playlist.previewSong}</p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;