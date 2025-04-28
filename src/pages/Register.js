import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Register() {
  const [form, setForm] = useState({ username: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', form);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="Password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="professor">Professor</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
