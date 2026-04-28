import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Library from "./pages/Library";
import AddSong from "./pages/AddSong";
import Moods from "./pages/Moods";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  const [songs, setSongs] = useState([]);
  const [moods, setMoods] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
  const savedUser = localStorage.getItem("currentUser");

  if (savedUser) {
    return JSON.parse(savedUser);
  }
    return null;
  });
  
  useEffect(() => {
    fetchSongs();
  }, [currentUser]);
  
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

async function fetchSongs() {
  try {
    if (!currentUser) {
      setSongs([]);
      return;
    }

    const response = await fetch(
      `http://localhost:5000/api/songs?userId=${currentUser.id}`
    );
    const data = await response.json();

    setSongs(data);
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

async function handleDemoLogin() {
  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: "demo",
        password: "demo123"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return;
    }

    setCurrentUser(data.user);
    localStorage.setItem("currentUser", JSON.stringify(data.user));
  } catch (error) {
    console.error("Demo login error:", error);
  }
}

function handleLogin(user) {
  setCurrentUser(user);
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function handleLogout() {
  setCurrentUser(null);
  localStorage.removeItem("currentUser");
}

if (!currentUser) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Routes>
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={<Login onLogin={handleLogin} onDemoLogin={handleDemoLogin} />}
          />
        </Routes>
      </div>
    </div>
  );
}

  return (
  <div>
    <Navbar currentUser={currentUser} onLogout={handleLogout} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/library"
        element={<Library songList={songs} fetchSongs={fetchSongs} />}
      />
      <Route
        path="/add-song"
        element={
          <AddSong
            moods={moods}
            fetchSongs={fetchSongs}
            currentUser={currentUser}
          />
        }
      />
      <Route path="/moods" element={<Moods songs={songs} />} />
    </Routes>
  </div>
  )
};

export default App;