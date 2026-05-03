import SongCard from "../components/SongCard";

function Library({ songList, fetchSongs, moods, currentUser }) {
  async function handleDelete(songId) {
    const confirmDelete = window.confirm("Delete this song?");

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/songs/${songId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete song");
      }

      fetchSongs();
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  }

  function handleEdit() {
    console.log("Edit not implemented yet");
  }

  return (
    <section className="page">
      <h2>Library</h2>
      <p>Total songs: {songList.length}</p>
      <p>Your saved songs will appear here.</p>
      {songList.length === 0 && (
        <p>No songs yet. Add your first song to get started.</p>
      )}
      <div className="song-grid">
        {songList.map((song) => (
          <SongCard
            key={song.id}
            song={song}
            moods={moods}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </section>
  );
}

export default Library;