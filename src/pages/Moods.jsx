function Moods({ songs }) {
  const groupedSongs = songs.reduce((groups, song) => {
    if (!groups[song.mood]) {
      groups[song.mood] = [];
    }

    groups[song.mood].push(song);
    return groups;
  }, {});

  return (
    <section className="page">
      <h2>Moods</h2>
      <p>Browse your songs by mood.</p>

      <div className="mood-grid">
        {Object.entries(groupedSongs).map(([mood, moodSongs]) => (
          <div className="mood-card" key={mood}>
            <h3>{mood}</h3>
            <p>{moodSongs.length} song{moodSongs.length === 1 ? "" : "s"}</p>
            <p className="preview-song">{moodSongs[0].title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Moods;