import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import AddSong from "./pages/AddSong";
import Moods from "./pages/Moods";
import songData from "./data/songs";


function App() {
  const [songs, setSongs] = useState(songData)
  
  function addSong(newSong) {
    setSongs((currentSongs) => {
      return [...currentSongs, newSong]
    })
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/library"
          element={<Library songList={songs} />}
        />
        <Route path="/add-song" element={<AddSong onAddSong={addSong} />} />
        <Route path="/moods" element={<Moods />} />
      </Routes>
    </div>
  )
}

export default App;