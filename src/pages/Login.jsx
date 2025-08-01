import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const registered = location.state?.registered;

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const res = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      handleLogin(data.user);
    } else {
      setError(data.error || 'Login failed');
    }
  };

  function handleLogin(userData) {
    setUser(userData);

    if (userData.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      {registered && <div className="success">Successful registration! You can now log in.</div>}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />
      <p >
        Dont have an account? <a href="/register">Register here!</a>
      </p>
      <button type="submit">Login</button>
    </form>
  );
}
