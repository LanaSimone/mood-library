import { useState } from "react";
import { Pencil, Trash2, Save, X } from "lucide-react";

function SongCard({ song, moods, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(song.title);
  const [editedArtist, setEditedArtist] = useState(song.artist);
  const [editedMoodId, setEditedMoodId] = useState(song.moodId);

  function handleSave() {
    if (!editedTitle || !editedArtist || !editedMoodId) {
      return;
    }

    onEdit({
      id: song.id,
      title: editedTitle,
      artist: editedArtist,
      moodId: Number(editedMoodId)
    });

    setIsEditing(false);
  }


  if (isEditing) {
    return (
      <div className="song-card">
        <input
          value={editedTitle}
          onChange={(event) => setEditedTitle(event.target.value)}
        />
        <input
          value={editedArtist}
          onChange={(event) => setEditedArtist(event.target.value)}
        />
        <select
          value={editedMoodId}
          onChange={(event) => setEditedMoodId(event.target.value)}
        >
          <option value="">Select a mood</option>
          {moods.map((moodOption) => (
            <option key={moodOption.id} value={moodOption.id}>
              {moodOption.mood}
            </option>
          ))}
        </select>
        <button onClick={handleSave} aria-label="Save song">
          <Save size={16} />
        </button>
        <button onClick={() => setIsEditing(false)} aria-label="Cancel edit">
          <X size={16} />
        </button>
      </div>
    );
  }

  function getEmbedUrl(url) {
  if (!url) {
    return null;
  }

  try {
    const youtubeUrl = new URL(url);

    if (youtubeUrl.hostname.includes("youtu.be")) {
      const videoId = youtubeUrl.pathname.slice(1);
      return `https://www.youtube.com/embed/${videoId}`;
    }

    if (youtubeUrl.hostname.includes("youtube.com")) {
      const videoId = youtubeUrl.searchParams.get("v");

      if (!videoId) {
        return null;
      }

      return `https://www.youtube.com/embed/${videoId}`;
    }

    return null;
  } catch (error) {
    return null;
  }
}

const embedUrl = getEmbedUrl(song.songUrl);

  return (
  <div className="song-card">
    <h3>{song.title}</h3>
    <p>{song.artist}</p>
    <span className="mood">{song.mood}</span>

    {embedUrl && (
      <iframe
        width="100%"
        height="200"
        src={embedUrl}
        title="YouTube player"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    )}

    <div className="song-actions">
      <button 
        className="icon-button"
        onClick={() => setIsEditing(true)} 
        aria-label="Edit song"
      >
        <Pencil size={18} strokeWidth={1.2} />
      </button>

      <button 
        className="icon-button"
        onClick={() => onDelete(song.id)} 
        aria-label="Delete song"
      >
        <Trash2 size={18} strokeWidth={1.5} />
      </button>
    </div>
  </div>
  )
}

export default SongCard;