import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import AddSong from "./pages/AddSong";
import Moods from "./pages/Moods";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/add-song" element={<AddSong />} />
        <Route path="/moods" element={<Moods />} />
      </Routes>
    </div>
  )
}

export default App;