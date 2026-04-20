import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">Mood Library</h1>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/add-song">Add Song</NavLink>
        <NavLink to="/moods">Moods</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;