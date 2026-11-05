import { useState } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../services/api';
import {useNavigate} from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to send OTP');
      }

      setOtpSent(true);
      setMessage(data.message || 'OTP sent successfully!');
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Verify OTP and Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          otp,
          newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Password reset failed');
      }

      //setMessage('Password reset successful! Please login.');
      alert('Password reset successful! Please login with your new password.');
      setOtpSent(false);
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="formContainer">
      <h2>Forgot Password?</h2>

      {!otpSent ? (
        <>
          <p>Enter your registered Gmail to receive OTP.</p>

          <form onSubmit={handleSendOtp}>
            <input
              type="email"
              placeholder="Enter your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Send OTP</button>
          </form>
        </>
      ) : (
        <>
          <p>Enter the OTP sent to your email.</p>

          <form onSubmit={handleResetPassword}>
            <input
              type="text"
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="4"
              required
            />

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              minLength="6"
              required
            />

            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength="6"
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        </>
      )}

      {message && <p>{message}</p>}

      <p>
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
