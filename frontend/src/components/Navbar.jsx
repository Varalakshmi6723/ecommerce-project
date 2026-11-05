
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/products?search=${search}`);
  };

  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    alert('Logged out successfully!');
    window.location.href = '/login';
  };

  return (
    <div>
      <div className="topbar">
        Free Shipping on Orders Above ₹999
      </div>

      <nav className="navbar">
        <h2 className="logo">ShopNest.</h2>

        <div className="search">
          <input
            type="text"
            placeholder="Search for products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="navLinks">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>

          <Link to="/cart" className="cartBtn">
            Cart
          </Link>

          {token ? (
            <button className="navButton" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="navButton">
              Login
            </Link>
          )}
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
