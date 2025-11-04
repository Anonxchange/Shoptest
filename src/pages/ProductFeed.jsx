import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ProductFeed.css';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description: 'High-quality sound with active noise cancellation',
    inStock: true
  },
  {
    id: 2,
    name: 'Smart Watch Pro',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: 'Track your fitness and stay connected',
    inStock: true
  },
  {
    id: 3,
    name: 'Designer Sunglasses',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    description: 'UV protection with modern style',
    inStock: true
  },
  {
    id: 4,
    name: 'Leather Backpack',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    description: 'Durable and stylish for everyday use',
    inStock: true
  },
  {
    id: 5,
    name: 'Portable Speaker',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    description: 'Waterproof with 12-hour battery life',
    inStock: true
  }
];

function ProductFeed() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products] = useState(MOCK_PRODUCTS);
  const [timeLeft, setTimeLeft] = useState(60);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const containerRef = useRef(null);
  const touchStartY = useRef(0);
  const checkoutProductRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (showCheckout) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNextProduct();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, showCheckout]);

  const handleNextProduct = () => {
    if (currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(60);
      setShowCheckout(false);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (diff > 50) {
      handleNextProduct();
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      handleNextProduct();
    }
  };

  const handleOpenCheckout = () => {
    checkoutProductRef.current = products[currentIndex];
    setShowCheckout(true);
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
    checkoutProductRef.current = null;
    setTimeLeft(60);
  };

  const handleBuyNow = async () => {
    const productToPurchase = checkoutProductRef.current;
    if (!productToPurchase) return;
    
    setPurchasing(true);
    
    setTimeout(() => {
      setPurchasing(false);
      setShowCheckout(false);
      alert(`Purchase successful! ${productToPurchase.name} will be shipped to ${user.address.street}`);
      checkoutProductRef.current = null;
      handleNextProduct();
    }, 1000);
  };

  if (!user) return null;

  const currentProduct = products[currentIndex];

  return (
    <div 
      className="product-feed"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div className="feed-header">
        <div className="logo">Shop</div>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>

      <div className="timer-bar">
        <div 
          className="timer-fill" 
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
        <span className="timer-text">{timeLeft}s</span>
      </div>

      <div className="product-container">
        <div 
          className="product-image"
          style={{ backgroundImage: `url(${currentProduct.image})` }}
        />

        <div className="product-info">
          <h2 className="product-name">{currentProduct.name}</h2>
          <p className="product-description">{currentProduct.description}</p>
          <div className="product-price">${currentProduct.price}</div>

          <div className="action-buttons">
            <button 
              className="btn-buy"
              onClick={handleOpenCheckout}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {showCheckout && checkoutProductRef.current && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <h3>Fast Checkout</h3>
            
            <div className="checkout-section">
              <div className="section-label">Product</div>
              <div className="checkout-item">
                <strong>{checkoutProductRef.current.name}</strong>
                <span>${checkoutProductRef.current.price}</span>
              </div>
            </div>

            <div className="checkout-section">
              <div className="section-label">Shipping Address</div>
              <div className="checkout-item">
                <div>{user.address.street}</div>
                <div>{user.address.city}, {user.address.state} {user.address.zip}</div>
              </div>
            </div>

            <div className="checkout-section">
              <div className="section-label">Payment Method</div>
              <div className="checkout-item">
                <div>{user.paymentMethod.brand} •••• {user.paymentMethod.last4}</div>
              </div>
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <strong>${checkoutProductRef.current.price}</strong>
            </div>

            <div className="checkout-actions">
              <button 
                className="btn-confirm"
                onClick={handleBuyNow}
                disabled={purchasing}
              >
                {purchasing ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <button 
                className="btn-cancel"
                onClick={handleCloseCheckout}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductFeed;
