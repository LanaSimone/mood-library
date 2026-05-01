import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin, onDemoLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim()) {
        setErrorMessage("Please enter your username.");
        return;
    }

    if (!password.trim()) {
        setErrorMessage("Please enter your password.");
        return;
    }

    const response = await fetch("http://localhost:5000/api/login", {
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
        setErrorMessage(data.error || "Login failed.");
        return;
    }

    onLogin(data.user);
}

  return (
    <section className="page">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <button type="button" onClick={onDemoLogin}>
        Demo Login
      </button>
      <p className="auth-switch">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </section>
  );
}

export default Login;