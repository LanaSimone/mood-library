import songs from "../data/songs";
import SongCard from "../components/SongCard";

function Library() {
  return (
    <section className="page">
      <h2>Library</h2>
      <p>Your saved songs will appear here.</p>
      <div className="song-grid">
        {songs.map((song) => (
            <SongCard key={song.id} song={song} />
        ))}
        </div>
    </section>
  );
}

export default Library;