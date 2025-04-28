import { Link } from 'react-router-dom';
import { logout } from '../utils/auth';

function Navbar() {
  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
      <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;
