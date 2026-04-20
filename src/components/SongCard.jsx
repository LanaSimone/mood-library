function SongCard({ song }) {
  return (
    <div>
      <p>{song.title}</p>
      <p>{song.artist}</p>
      <p>{song.mood}</p>
    </div>
  );
}

export default SongCard;