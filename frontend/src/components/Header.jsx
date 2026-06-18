import React from 'react';
import { useCart } from '../context/CartContext';

const Header = ({ setCurrentPage, isLoggedIn, isAdmin, userName, onLogout }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header-container flipkart-header">
      <div className="header-wrapper">
        <div 
          className="header-logo" 
          onClick={() => setCurrentPage(isAdmin ? 'adminDashboard' : 'home')}
          title="Go to Homepage"
        >
          LuminaStore
        </div>
        
        <div className="header-actions">
          {!isLoggedIn ? (
            <>
              <div className="login-dropdown" onClick={() => setCurrentPage('login')}>
                 Login
              </div>
              <div className="login-dropdown register-btn" onClick={() => setCurrentPage('register')}>
                 Register
              </div>
            </>
          ) : (
            <>
              {isAdmin ? (
                <div className="header-profile-btn" onClick={() => setCurrentPage('adminDashboard')}>
                  <span style={{fontSize: '1.2rem', title: 'Dashboard'}}>⚙️</span>
                </div>
              ) : (
                <>
                  <div className="header-profile-btn" onClick={() => setCurrentPage('profile')} title="Profile">
                    <span style={{fontSize: '1.2rem'}}>👤</span>
                  </div>
                  <div className="header-cart" onClick={() => setCurrentPage('cart')}>
                    <span style={{marginRight: '0.5rem'}}>🛒</span> Cart
                    {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                  </div>
                </>
              )}
              <div className="logout-btn" onClick={onLogout}>
                 Logout
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
