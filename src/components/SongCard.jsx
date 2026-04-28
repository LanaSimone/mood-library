function SongCard({ song, onDelete }) {
  return (
    <div className="song-card">
      <h3>{song.title}</h3>
      <p>{song.artist}</p>
      <span className="mood">{song.mood}</span>
      <button onClick={() => onDelete(song.id)}>
        Delete
      </button>
    </div>
  );
}

export default SongCard;