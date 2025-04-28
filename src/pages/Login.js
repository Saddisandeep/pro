// src/pages/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { saveToken } from '../utils/auth';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      saveToken(res.data.token);

      // Safer way to decode JWT token
      const base64Url = res.data.token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = JSON.parse(window.atob(base64));

      console.log('Logged in role:', decodedPayload.role);

      if (decodedPayload.role === 'student') {
        navigate('/student');
      } else if (decodedPayload.role === 'professor') {
        navigate('/professor');
      } else {
        alert('Unknown user role.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        required
      />
      <input
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
