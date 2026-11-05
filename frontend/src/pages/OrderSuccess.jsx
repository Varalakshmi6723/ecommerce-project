import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <div className="orderSuccess">
      <h1>✓</h1>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for shopping with ShopNest.</p>
      <p>Your order has been confirmed.</p>

      <Link to="/products">
        Continue Shopping
      </Link>
    </div>
  );
}

export default OrderSuccess;