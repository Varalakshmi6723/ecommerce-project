import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { addToCart } from '../services/cart.service';
import API_URL from '../services/api';

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Product not found');
        }

        setProduct(data.product || data);
      } catch (error) {
        console.error('Product Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please login to add products to cart');
      return;
    }

    try {
      console.log("Product being added:", product);

      const result = await addToCart(product, id);
      console.log('API Response:', result);
      setMessage('Product added to cart successfully!');
    } catch (error) {
      console.error('Cart Error:', error);
      setMessage(error.message);
    }
  };

  if (loading) {
    return <h2>Loading product...</h2>;
  }

  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  return (
    <div className="productDetails">

      <div className="detailsImage">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="detailsContent">
        <p className="category">{product.category}</p>

        <h1>{product.name}</h1>

        <h2>₹{product.price}</h2>

        <p>{product.description}</p>

        <button onClick={handleAddToCart}>
          Add to Cart
        </button>

        {message && <p>{message}</p>}

        <Link to="/products" className="backLink">
          Back to Products
        </Link>

      </div>

    </div>
  );
}

export default ProductDetails;