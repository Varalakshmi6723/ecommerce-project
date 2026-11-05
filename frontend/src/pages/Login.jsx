import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/auth.service';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const data = await loginUser({
        email,
        password
      });

      localStorage.setItem('user', JSON.stringify(data.user));

      alert('Login successful!');

      navigate('/');

    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="formContainer">
      <h2>Welcome Back!</h2>
      <p>Login to your ShopNest account</p>

      <form onSubmit={handleLogin}>
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

        <p>

          <Link to="/forgot-password">Forgot Password?</Link>
        
        </p>

        <button type="submit">Login</button>
      </form>

      {message && <p>{message}</p>}

      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;