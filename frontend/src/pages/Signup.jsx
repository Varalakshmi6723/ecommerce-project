
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { signupUser } from '../services/auth.service';

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await signupUser({
        name,
        email,
        password
      });

      alert('Signup successful! Please login.');
      navigate('/login');

    } catch (error) {
      setMessage(error.message || 'Unable to connect to server');
    }
  };

  return (
    <div className="formContainer">
      <h2>Create Account</h2>
      <p>Join ShopNest today!</p>

      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
