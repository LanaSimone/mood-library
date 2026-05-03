import { Link } from "react-router-dom";

function Navbar({ currentUser, onLogout }) {
  return (
    <header className="navbar">
      <Link to="/" className="brand">
        <div className="brand-icon">ML</div>
        <div className="brand-text">Mood Library</div>
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/add-song">Add Song</Link>
        <Link to="/moods">Moods</Link>
      </nav>
      <div className="user-area">
        <span>Hi, {currentUser?.username}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;