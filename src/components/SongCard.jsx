function SongCard({ song }) {
  return (
    <div className="song-card">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <span className="mood">{song.mood}</span>
    </div>
  );
}

export default SongCard;