import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
  event.preventDefault();
  setErrorMessage("");

  if (!username.trim()) {
    setErrorMessage("Please enter a username.");
    return;
  }

  if (username.trim().length < 3) {
    setErrorMessage("Username must be at least 3 characters.");
    return;
  }

  if (!password.trim()) {
    setErrorMessage("Please enter a password.");
    return;
  }

  if (password.length < 6) {
    setErrorMessage("Password must be at least 6 characters.");
    return;
  }

  const response = await fetch("https://mood-library-api.onrender.com/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username.trim(),
      password
    })
  });

  const data = await response.json();

  if (!response.ok) {
    setErrorMessage(data.error || "Registration failed.");
    return;
  }

  onLogin(data.user);
}

    return (
        <section className="page">
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
            <label>
            Username
            <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />
            </label>
            <label>
            Password
            <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            </label>
            <button type="submit">Create Account</button>
        </form>
        <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
        </p>
        </section>
        );
    }

export default Register;