import { NavLink } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Mood Library</h1>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/library">Library</NavLink>
        <NavLink to="/add-song">Add Song</NavLink>
        <NavLink to="/moods">Moods</NavLink>
      </div>
      <div className="nav-user">
        <span>Hi, {currentUser.username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;