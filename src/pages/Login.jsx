import { useState } from "react";

function Login({ onLogin, onDemoLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error);
      return;
    }

    onLogin(data.user);
  }

  return (
    <section className="page">
      <h2>Login</h2>

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
    </section>
  );
}

export default Login;