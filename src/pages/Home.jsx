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
    <section className="page">
      <h2>Welcome back, {currentUser.username}</h2>
      <p>Here’s your mood-based music library.</p>

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

      <div className="dashboard-actions">
        <Link to="/add-song" className="action-card">
          Add Song
        </Link>

        <Link to="/moods" className="action-card">
          Browse Moods
        </Link>
      </div>

      <div className="dashboard-preview">
        <h3>Your Playlists</h3>

        {populatedMoods.length === 0 ? (
          <p>No playlists yet. Add a song to create your first mood playlist.</p>
        ) : (
          <div className="mood-grid">
            {populatedMoods.map((playlist) => (
              <Link
                key={playlist.mood}
                to={`/moods?mood=${encodeURIComponent(playlist.mood)}`}
                className="mood-card"
              >
                <h3>{playlist.mood}</h3>
                <p>{playlist.count} song{playlist.count === 1 ? "" : "s"}</p>
                <p className="preview-song">{playlist.previewSong}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Home;