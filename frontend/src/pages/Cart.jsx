
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeCartProduct } from '../services/cart.service';

function Cart() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setProducts(data.cart.products || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeCartProduct(productId);
      fetchCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handlePayment = () => {
    if (products.length === 0) {
      alert('Your cart is empty');
      return;
    }

    navigate('/order-success');
  };

  if (loading) return <h2>Loading Cart...</h2>;

  return (
    <div className="section">
      <h2>My Cart</h2>

      {products.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <>
          <div className="productContainer">
            {products.map((product) => (
              <div className="productCard" key={product.productId}>
                <img src={product.image} alt={product.name} />
                <h3>{product.name}</h3>
                <h4>₹{product.price}</h4>
                <p>Quantity: {product.quantity}</p>

                <button onClick={() => handleRemove(product.productId)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <h2>Total: ₹{total}</h2>

          <button onClick={handlePayment} className="proceedButton" >
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
