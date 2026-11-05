
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API_URL from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/products`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error('Unable to fetch products');
        }

        setProducts(data.products);
        console.log('FETCHED PRODUCTS:', data.products);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const search = new URLSearchParams(location.search).get('search') || '';

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(result);
  }, [products, location.search]);

  return (
    <div className="section">
      <h2>All Products</h2>
      <p>Explore our latest collection</p>

      <div className="productContainer">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="productCard" key={product._id}>
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>
              <h4>₹{product.price}</h4>

              <Link to={`/products/${product._id}`}>
                <button type="button">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
