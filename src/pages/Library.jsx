import SongCard from "../components/SongCard";

function Library({ songList, fetchSongs, moods, currentUser }) {
  async function handleDelete(songId) {
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

  async function handleEdit(updatedSong) {
    try {
      const response = await fetch(`http://localhost:5000/api/songs/${updatedSong.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: updatedSong.title,
          artist: updatedSong.artist,
          moodId: updatedSong.moodId,
          userId: currentUser.id
        })
      });

      if (!response.ok) {
        throw new Error("Failed to update song");
      }

      fetchSongs();
    } catch (error) {
      console.error("Error updating song:", error);
    }
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