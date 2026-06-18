import React, { useState } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import CategoryGrid from './components/CategoryGrid';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import AdminDashboard from './components/AdminDashboard';
import { CartProvider } from './context/CartContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [orderHistory, setOrderHistory] = useState([]);
  
  // Track registered users
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '10 Jun 2026' }
  ]);

  const handleLogin = (name, email) => {
    setIsLoggedIn(true);
    setUserEmail(email || '');
    
    // Check if it's the admin
    if (email === 'admin@gmail.com') {
      setIsAdmin(true);
      setUserName('Admin');
      setCurrentPage('adminDashboard');
    } else {
      setIsAdmin(false);
      setUserName(name || 'User');
      setCurrentPage('products');
    }
  };

  const handleRegister = (name, email) => {
    const newUser = {
      id: Date.now(),
      name,
      email,
      joinDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setUsers(prev => [...prev, newUser]);
  };

  const deleteUser = (email) => {
    setUsers(prev => prev.filter(u => u.email !== email));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    setUserEmail('');
    setCurrentPage('home');
  };

  const addOrder = (order) => {
    const orderWithUser = { ...order, userEmail: userEmail || 'guest@example.com' };
    setOrderHistory(prev => [orderWithUser, ...prev]);
  };

  const cancelOrder = (orderId, reason) => {
    setOrderHistory(prev => prev.map((order, idx) => 
      (order.orderId === orderId || `LOCAL_${idx}` === orderId)
        ? { ...order, status: 'Cancelled', cancelReason: reason } 
        : order
    ));
  };

  return (
    <CartProvider>
      <Header 
        setCurrentPage={setCurrentPage} 
        isLoggedIn={isLoggedIn} 
        isAdmin={isAdmin}
        userName={userName}
        onLogout={handleLogout}
      />
      <main className="main-container bg-gray" style={{ maxWidth: '100%', padding: '0', backgroundColor: '#f1f3f6', minHeight: '100vh' }}>
        {currentPage === 'home' && (
          <div style={{ width: '100%', margin: '0 auto', padding: '0' }}>
            <HeroBanner setCurrentPage={setCurrentPage} />
          </div>
        )}
        {currentPage === 'products' && <ProductList setCurrentPage={setCurrentPage} />}
        {currentPage === 'cart' && <Cart setCurrentPage={setCurrentPage} addOrder={addOrder} />}
        {currentPage === 'login' && <Login setCurrentPage={setCurrentPage} onLogin={handleLogin} />}
        {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} onLogin={handleLogin} onRegister={handleRegister} />}
        {currentPage === 'profile' && <Profile userName={userName} orderHistory={orderHistory} setCurrentPage={setCurrentPage} cancelOrder={cancelOrder} />}
        {currentPage === 'adminDashboard' && (
          <AdminDashboard 
            users={users} 
            deleteUser={deleteUser}
            orders={orderHistory} 
            cancelOrder={cancelOrder} 
          />
        )}
      </main>
    </CartProvider>
  );
}

export default App;
