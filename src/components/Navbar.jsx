import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Mood Library</h1>
      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/library">Library</a>
        <a href="/add-song">Add Song</a>
        <a href="/moods">Moods</a>
      </div>
    </nav>
  );
}

export default Navbar;