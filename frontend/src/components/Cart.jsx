import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = ({ setCurrentPage, addOrder }) => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, clearCart } = useCart();
  const subtotal = getSubtotal();
  const [checkoutStep, setCheckoutStep] = useState(1); // 1: Cart, 2: Details, 3: Payment
  const [formData, setFormData] = useState({ firstName: '', lastName: '', location: '', paymentMethod: 'PhonePe' });

  const handlePlaceOrder = (e) => {
    if (e) e.preventDefault();
    if (cartItems.length === 0) return;
    
    fetch('http://localhost:5050/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerEmail: 'user@example.com', // mock email
        items: cartItems.map(i => ({ productId: i._id, name: i.name, price: i.price, quantity: i.quantity })),
        totalAmount: subtotal
      })
    })
    .then(res => res.json())
    .then(data => {
      if (addOrder) {
        const now = new Date();
        const shipDate = new Date(now); shipDate.setDate(now.getDate() + 1);
        const outDate = new Date(now); outDate.setDate(now.getDate() + 6);
        const deliverDate = new Date(now); deliverDate.setDate(now.getDate() + 7);
        const fmt = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
        addOrder({
          orderId: data.orderId,
          items: cartItems.map(i => ({ name: i.name, price: i.price, quantity: i.quantity, imageUrl: i.imageUrl })),
          totalAmount: subtotal,
          paymentMethod: formData.paymentMethod,
          shippingAddress: formData.location,
          date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'Ordered',
          tracking: {
            ordered: { date: fmt(now), done: true },
            shipped: { date: fmt(shipDate), done: false },
            outForDelivery: { date: fmt(outDate), done: false },
            delivered: { date: fmt(deliverDate), done: false }
          }
        });
      }
      clearCart();
      setCheckoutStep(1);
      alert('Order Placed Successfully! Order ID: ' + data.orderId);
      setCurrentPage('profile');
    })
    .catch(err => {
      console.error(err);
      alert('Failed to place order.');
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh'}}>
        <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" style={{width: '250px'}} />
        <div className="empty-title" style={{fontSize: '1.5rem', fontWeight: 600, marginTop: '20px'}}>Your cart is empty!</div>
        <div className="empty-desc" style={{color: '#878787', marginBottom: '20px'}}>Add items to it now.</div>
        <button className="btn-shop-now" onClick={() => setCurrentPage('products')} style={{padding: '12px 30px', background: '#2874f0', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}>Shop Now</button>
      </div>
    );
  }

  return (
    <div className="cart-layout" style={{ maxWidth: '1200px', margin: '20px auto', display: 'flex', flexDirection: 'row-reverse', gap: '20px', padding: '0 20px', fontFamily: '"Inter", sans-serif' }}>
      
      {/* LEFT SECTION - Stepper Content */}
      <div className="cart-items-section" style={{ flex: 1, background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Stepper Header */}
        <div style={{ display: 'flex', background: '#f5f7fa', borderBottom: '1px solid #eaeaea' }}>
          {['1. REVIEW CART', '2. DELIVERY ADDRESS', '3. PAYMENT'].map((stepName, idx) => {
            const stepNum = idx + 1;
            const isActive = checkoutStep === stepNum;
            const isCompleted = checkoutStep > stepNum;
            return (
              <div 
                key={stepNum} 
                onClick={() => isCompleted && setCheckoutStep(stepNum)}
                style={{ 
                  flex: 1, padding: '16px 10px', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600,
                  color: isActive ? '#2874f0' : isCompleted ? '#388e3c' : '#878787',
                  borderBottom: isActive ? '3px solid #2874f0' : '3px solid transparent',
                  cursor: isCompleted ? 'pointer' : 'default',
                  transition: 'all 0.3s'
                }}
              >
                {isCompleted && <span style={{marginRight: '6px'}}>✓</span>}
                {stepName}
              </div>
            );
          })}
        </div>

        <div className="cart-list" style={{ padding: '20px' }}>
          {/* STEP 1: CART */}
          {checkoutStep === 1 && (
            <div className="step-1-cart">
              {cartItems.map(item => (
                <div key={item._id} className="cart-item" style={{ display: 'flex', gap: '20px', padding: '20px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <img src={item.imageUrl} alt={item.name} className="cart-img" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                  <div className="cart-details" style={{ flex: 1 }}>
                    <div className="cart-name" style={{ fontSize: '1.1rem', fontWeight: 500, color: '#212121', marginBottom: '8px' }}>{item.name}</div>
                    <div className="cart-price" style={{ fontSize: '1.2rem', fontWeight: 600, color: '#212121', marginBottom: '16px' }}>₹{item.price.toLocaleString('en-IN')}</div>
                    <div className="cart-qty-controls" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>-</button>
                      <input type="text" value={item.quantity} readOnly style={{ width: '40px', textAlign: 'center', border: '1px solid #ccc', height: '32px', borderRadius: '4px' }} />
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}>+</button>
                      <button className="btn-remove" onClick={() => removeFromCart(item._id)} style={{ marginLeft: '20px', border: 'none', background: 'transparent', color: '#ff6161', fontWeight: 600, cursor: 'pointer' }}>REMOVE</button>
                    </div>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setCheckoutStep(2)} 
                  style={{ padding: '14px 40px', background: '#fb641b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)' }}
                >
                  CONTINUE TO ADDRESS
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ADDRESS */}
          {checkoutStep === 2 && (
            <div className="step-2-address">
               <h4 style={{ marginBottom: '20px', color: '#212121' }}>Shipping Details</h4>
               <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px' }}>
                     <input type="text" placeholder="First Name" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} style={{flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem'}} />
                     <input type="text" placeholder="Last Name" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} style={{flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem'}} />
                  </div>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                     <input type="text" placeholder="Full Address / Location" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem'}} />
                     <button type="button" onClick={() => setFormData({...formData, location: 'San Francisco, CA (Geo Location Detected)'})} style={{padding: '12px', background: '#e0f0ff', color: '#2874f0', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}>Use Current Location</button>
                  </div>
               </form>
               <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCheckoutStep(1)} style={{ padding: '14px 20px', background: 'transparent', color: '#2874f0', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Back to Cart</button>
                <button 
                  onClick={() => {
                    if(!formData.firstName || !formData.lastName || !formData.location) { alert('Please fill all address fields'); return; }
                    setCheckoutStep(3);
                  }} 
                  style={{ padding: '14px 40px', background: '#fb641b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)' }}
                >
                  CONTINUE TO PAYMENT
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT */}
          {checkoutStep === 3 && (
            <div className="step-3-payment">
               <h4 style={{ marginBottom: '20px', color: '#212121' }}>Payment Options</h4>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['PhonePe', 'GPay', 'Credit / Debit Card', 'Cash on Delivery'].map(method => (
                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px', cursor: 'pointer', background: formData.paymentMethod === method ? '#f0f8ff' : '#fff' }}>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value={method} 
                        checked={formData.paymentMethod === method} 
                        onChange={e => setFormData({...formData, paymentMethod: e.target.value})} 
                        style={{ width: '18px', height: '18px' }}
                      />
                      <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>{method}</span>
                    </label>
                  ))}
               </div>
               <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
                <button onClick={() => setCheckoutStep(2)} style={{ padding: '14px 20px', background: 'transparent', color: '#2874f0', border: 'none', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>Back to Address</button>
                <button 
                  onClick={handlePlaceOrder} 
                  style={{ padding: '14px 40px', background: '#fb641b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px 0 rgba(0,0,0,.2)' }}
                >
                  PAY ₹{subtotal.toLocaleString('en-IN')} & PLACE ORDER
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* RIGHT SECTION - Price Summary */}
      <div className="cart-summary-section" style={{ width: '350px', height: 'fit-content', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', padding: '20px' }}>
         <div className="summary-header" style={{ fontSize: '1rem', fontWeight: 600, color: '#878787', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px', marginBottom: '16px' }}>PRICE DETAILS</div>
         <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1.05rem' }}>
            <span>Price ({cartItems.length} items)</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
         </div>
         <div className="summary-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '1.05rem' }}>
            <span>Delivery Charges</span>
            <span className="free-text" style={{ color: '#388e3c', fontWeight: 600 }}>FREE</span>
         </div>
         <div className="summary-total" style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed #e0e0e0', paddingTop: '16px', fontSize: '1.2rem', fontWeight: 700, color: '#212121' }}>
            <span>Total Amount</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
         </div>
         <div style={{ marginTop: '20px', color: '#388e3c', fontWeight: 600, fontSize: '0.95rem' }}>
           You will save ₹{(subtotal * 0.15).toLocaleString('en-IN', {maximumFractionDigits: 0})} on this order
         </div>
      </div>
    </div>
  );
};

export default Cart;
