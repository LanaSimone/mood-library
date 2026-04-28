import SongCard from "../components/SongCard";

function Library({ songList, fetchSongs }) {
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
  
  
  return (
    <section className="page">
      <h2>Library</h2>
      <p>Total songs: {songList.length}</p>
      <p>Your saved songs will appear here.</p>
      <div className="song-grid">
        {songList.map((song) => (
          <SongCard 
            key={song.id} 
            song={song} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  );
}

export default Library;