import SongCard from "../components/SongCard";

function Library({songList}) {
  return (
    <section className="page">
      <h2>Library</h2>
      <p>Total songs: {songList.length}</p>
      <p>Your saved songs will appear here.</p>
      <div className="song-grid">
        {songList.map((song) => (
            <SongCard key={song.id} song={song} />
        ))}
        </div>
    </section>
  );
}

export default Library;