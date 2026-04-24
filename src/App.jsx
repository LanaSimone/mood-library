import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import AddSong from "./pages/AddSong";
import Moods from "./pages/Moods";
import songData from "./data/songs";


function App() {
  const [songs, setSongs] = useState(songData)
  const [moods, setMoods] = useState([]);
  
  function addSong(newSong) {
    setSongs((currentSongs) => {
      return [...currentSongs, newSong]
    })
  }
  
  useEffect(() => {
  async function fetchMoods() {
    try {
      const response = await fetch("http://localhost:5000/api/moods");
      const data = await response.json();
      console.log("moods from backend:", data);
      setMoods(data);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  }

  fetchMoods();
}, []);

console.log("App is rendering");
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/library"
          element={<Library songList={songs} />}
        />
        <Route path="/add-song" element={<AddSong onAddSong={addSong} moods={moods} />} />
        <Route path="/moods" element={<Moods />} />
      </Routes>
    </div>
  )
}

export default App;