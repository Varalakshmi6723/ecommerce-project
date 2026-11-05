
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from '../services/api';

function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to fetch products');
        }

        setProducts(data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="Home">

      <div className="hero">
        <h1>Discover Your Style</h1>
        <p>Find your favourite products at amazing prices.</p>
        <button>Shop Now</button>
      </div>

      <div className="section">

        <h2>Trending Products</h2>
        <p>Explore our best selling products</p>

        <div className="productContainer">

          {products.map((product) => (
            

            <div className="productCard" key={product._id}>

              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <h4>₹{product.price}</h4>

              <Link to={`/products/${product._id}`}>
                <button type="button">View Details</button>
              </Link>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Home;
