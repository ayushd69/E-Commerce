import React, { useState } from 'react';

const trackingSteps = [
  { key: 'ordered', label: 'Ordered' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'outForDelivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivery' }
];

/* Generate tracking dates from the order date if tracking data is missing */
const generateTracking = (order) => {
  if (order.tracking) return order.tracking;

  // Parse order date or use current date
  const base = order.date ? new Date(order.date) : new Date();
  if (isNaN(base.getTime())) {
    // fallback for "17 Jun 2026" style
    const now = new Date();
    return buildDates(now);
  }
  return buildDates(base);
};

const buildDates = (base) => {
  const fmt = d => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const ship = new Date(base); ship.setDate(base.getDate() + 1);
  const out  = new Date(base); out.setDate(base.getDate() + 6);
  const del  = new Date(base); del.setDate(base.getDate() + 7);
  return {
    ordered:        { date: fmt(base), done: true },
    shipped:        { date: fmt(ship), done: false },
    outForDelivery: { date: fmt(out),  done: false },
    delivered:      { date: fmt(del),  done: false }
  };
};

const Profile = ({ userName, orderHistory, setCurrentPage, cancelOrder }) => {
  const [cancellingOrderId, setCancellingOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [otherReason, setOtherReason] = useState('');

  const handleCancelSubmit = () => {
    if (!cancelReason) return;
    const finalReason = cancelReason === 'etc' ? otherReason : cancelReason;
    if (cancelOrder) {
      cancelOrder(cancellingOrderId, finalReason);
    }
    setCancellingOrderId(null);
    setCancelReason('');
    setOtherReason('');
  };

  return (
    <div style={{maxWidth: '900px', margin: '2rem auto', padding: '0 1rem'}}>
      {/* Profile Card */}
      <div style={{background: '#fff', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,.1)', padding: '2rem', marginBottom: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem'}}>
          <div style={{width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #2874f0, #6dd5fa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: '#fff', fontWeight: 'bold'}}>
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 style={{margin: 0, fontSize: '1.5rem', color: '#212121'}}>{userName || 'User'}</h2>
            <p style={{margin: '4px 0 0', color: '#878787', fontSize: '0.9rem'}}>{userName?.toLowerCase().replace(/\s/g, '') || 'user'}@novakart.com</p>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center'}}>
          <div style={{padding: '1rem', background: '#f5f7fa', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#2874f0'}}>{orderHistory.length}</div>
            <div style={{fontSize: '0.85rem', color: '#878787'}}>Total Orders</div>
          </div>
          <div style={{padding: '1rem', background: '#f5f7fa', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#388e3c'}}>
              ₹{orderHistory.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0).toLocaleString('en-IN')}
            </div>
            <div style={{fontSize: '0.85rem', color: '#878787'}}>Total Spent</div>
          </div>
          <div style={{padding: '1rem', background: '#f5f7fa', borderRadius: '8px'}}>
            <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#ff6f00'}}>⭐ Gold</div>
            <div style={{fontSize: '0.85rem', color: '#878787'}}>Member Tier</div>
          </div>
        </div>
      </div>

      {/* Order History */}
      <div>
        <div style={{padding: '0 0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <h3 style={{margin: 0, fontSize: '1.1rem', color: '#212121'}}>My Orders</h3>
        </div>

        {orderHistory.length === 0 ? (
          <div style={{background: '#fff', borderRadius: '4px', boxShadow: '0 1px 2px rgba(0,0,0,.1)', padding: '3rem', textAlign: 'center', color: '#878787'}}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📦</div>
            <p style={{fontSize: '1rem'}}>No orders placed yet</p>
            <button
              onClick={() => setCurrentPage('products')}
              style={{marginTop: '1rem', padding: '10px 30px', background: '#2874f0', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600}}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          orderHistory.map((order, idx) => {
            const isCancelled = order.status === 'Cancelled';
            const tracking = generateTracking(order);
            let currentStep = 0;
            trackingSteps.forEach((s, i) => { if (tracking[s.key]?.done) currentStep = i; });
            const deliveryDate = tracking.delivered.date;
            const firstItem = order.items?.[0];

            return (
              <div key={idx} style={{
                background: '#fff', borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,.08)',
                marginBottom: '1.25rem', overflow: 'hidden',
                opacity: isCancelled ? 0.7 : 1
              }}>
                {/* ── ORDER HEADER ── */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '16px 20px', borderBottom: '1px solid #f0f0f0'
                }}>
                  {/* Product thumbnail */}
                  <img
                    src={firstItem?.imageUrl || 'https://via.placeholder.com/60'}
                    alt={firstItem?.name}
                    style={{width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #eee', flexShrink: 0, filter: isCancelled ? 'grayscale(1)' : 'none'}}
                  />
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontWeight: 600, color: '#212121', fontSize: '0.95rem', textDecoration: isCancelled ? 'line-through' : 'none'}}>
                      Order #{order.orderId}
                    </div>
                    <div style={{fontSize: '0.85rem', color: '#555', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                      {firstItem?.name}{order.items.length > 1 ? ` +${order.items.length - 1} more` : ''}
                    </div>
                    <div style={{fontSize: '0.8rem', color: '#878787', marginTop: '2px'}}>
                      {order.paymentMethod} • ₹{order.totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <div style={{fontSize: '0.8rem', color: '#878787', textAlign: 'right', flexShrink: 0}}>
                    {order.date}
                  </div>
                </div>

                {isCancelled ? (
                   <div style={{padding: '20px', textAlign: 'center', background: '#ffebee', color: '#c62828'}}>
                     <h4 style={{margin: '0 0 8px', fontSize: '1.1rem'}}>Order Cancelled</h4>
                     <p style={{margin: 0, fontSize: '0.9rem'}}>Reason: {order.cancelReason || 'User requested cancellation'}</p>
                   </div>
                ) : (
                  <>
                    {/* ── DELIVERY STATUS BAR ── */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '12px 20px',
                      background: currentStep === 3 ? '#e8f5e9' : '#f0faf0',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <span style={{fontSize: '1.3rem'}}>{currentStep === 3 ? '✅' : '📦'}</span>
                      <div>
                        <div style={{fontWeight: 600, color: '#1b5e20', fontSize: '0.95rem'}}>
                          {currentStep === 3 ? 'Delivered' : 'Order Placed'}
                        </div>
                        <div style={{fontSize: '0.8rem', color: '#388e3c'}}>
                          {currentStep === 3 ? `Delivered on ${deliveryDate}` : `Delivery by ${deliveryDate}`}
                        </div>
                      </div>
                    </div>

                    {/* ── SHIPPING SOON BADGE ── */}
                    <div style={{padding: '14px 20px 0'}}>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: '#1a1a1a', color: '#fff', padding: '5px 14px',
                        borderRadius: '20px', fontSize: '0.78rem', fontWeight: 500
                      }}>
                        <span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#4caf50', display: 'inline-block'}}></span>
                        {currentStep === 0 ? 'Shipping Soon!' : currentStep === 1 ? 'Shipped' : currentStep === 2 ? 'Out for Delivery' : 'Delivered ✓'}
                      </div>
                    </div>

                    {/* ── TRACKING TIMELINE ── */}
                    <div style={{padding: '20px 20px 6px'}}>
                      <div style={{position: 'relative', display: 'flex', justifyContent: 'space-between'}}>
                        {/* Background track line */}
                        <div style={{
                          position: 'absolute', top: '14px', left: '24px', right: '24px',
                          height: '4px', background: '#e0e0e0', borderRadius: '2px', zIndex: 0
                        }}></div>
                        {/* Filled progress line */}
                        <div style={{
                          position: 'absolute', top: '14px', left: '24px',
                          width: `calc(${(currentStep / (trackingSteps.length - 1)) * 100}% * (1 - 48px / 100%))`,
                          maxWidth: currentStep === 0 ? '0%' : currentStep === 1 ? '30%' : currentStep === 2 ? '64%' : 'calc(100% - 48px)',
                          height: '4px', background: 'linear-gradient(90deg, #2e7d32, #43a047)', borderRadius: '2px', zIndex: 1,
                          transition: 'max-width 0.6s ease'
                        }}></div>

                        {trackingSteps.map((step, i) => {
                          const stepData = tracking[step.key];
                          const isDone = stepData?.done;
                          const isCurrent = i === currentStep && !tracking.delivered.done;

                          return (
                            <div key={step.key} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, flex: 1}}>
                              {/* Step circle */}
                              <div style={{
                                width: '30px', height: '30px', borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '0.8rem', fontWeight: 'bold',
                                background: isDone ? '#2e7d32' : isCurrent ? '#fff' : '#f5f5f5',
                                border: isDone ? '2px solid #2e7d32' : isCurrent ? '3px solid #2e7d32' : '2px solid #e0e0e0',
                                color: isDone ? '#fff' : isCurrent ? '#2e7d32' : '#bdbdbd',
                                boxShadow: isCurrent ? '0 0 0 4px rgba(46,125,50,0.15)' : 'none',
                                transition: 'all 0.3s ease'
                              }}>
                                {isDone ? '✓' : ''}
                              </div>

                              {/* Label */}
                              <div style={{
                                marginTop: '8px', fontSize: '0.75rem', fontWeight: isDone || isCurrent ? 600 : 400,
                                color: isDone ? '#212121' : isCurrent ? '#2e7d32' : '#9e9e9e',
                                textAlign: 'center', lineHeight: '1.3'
                              }}>
                                {step.label}
                              </div>

                              {/* Date */}
                              <div style={{
                                fontSize: '0.7rem', color: isDone ? '#555' : '#bdbdbd',
                                marginTop: '2px', textAlign: 'center'
                              }}>
                                {stepData?.date || '—'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* ── ITEMS IN ORDER ── */}
                <div style={{padding: '8px 20px 16px'}}>
                  <div style={{
                    border: '1px solid #f0f0f0', borderRadius: '8px', overflow: 'hidden'
                  }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '10px 14px',
                        borderBottom: i < order.items.length - 1 ? '1px solid #f5f5f5' : 'none'
                      }}>
                        <img
                          src={item.imageUrl || 'https://via.placeholder.com/40'}
                          alt={item.name}
                          style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #eee', filter: isCancelled ? 'grayscale(1)' : 'none'}}
                        />
                        <div style={{flex: 1}}>
                          <div style={{fontSize: '0.88rem', fontWeight: 500, color: '#212121', textDecoration: isCancelled ? 'line-through' : 'none'}}>{item.name}</div>
                          <div style={{fontSize: '0.78rem', color: '#777', marginTop: '1px'}}>
                            Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}
                          </div>
                          {/* Star rating */}
                          <div style={{fontSize: '0.75rem', marginTop: '2px'}}>
                            {[...Array(5)].map((_, r) => (
                              <span key={r} style={{color: r < (item.rating || 4) ? '#ffb400' : '#ddd'}}>★</span>
                            ))}
                          </div>
                        </div>
                        <div style={{fontWeight: 600, color: '#212121', fontSize: '0.88rem', flexShrink: 0, textDecoration: isCancelled ? 'line-through' : 'none'}}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── CANCEL + PAYMENT INFO ── */}
                {!isCancelled && currentStep === 0 && (
                  <div style={{
                    padding: '12px 20px', borderTop: '1px solid #f0f0f0',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px'
                  }}>
                    <div style={{fontSize: '0.82rem', color: '#878787'}}>
                      Cancellation available till shipping!
                    </div>
                    <button 
                      onClick={() => setCancellingOrderId(order.orderId || `LOCAL_${idx}`)}
                      style={{
                        padding: '6px 20px', border: '1px solid #ff1744', borderRadius: '4px',
                        background: '#fff', color: '#ff1744', fontWeight: 600, fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel Order
                    </button>
                  </div>
                )}

                {/* ── PAYMENT / ADDRESS FOOTER ── */}
                <div style={{
                  padding: '12px 20px', background: '#fafafa', borderTop: '1px solid #f0f0f0',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px',
                  fontSize: '0.82rem'
                }}>
                  <div>
                    <span style={{color: '#878787'}}>Payment: </span>
                    <strong style={{color: '#333'}}>{order.paymentMethod}</strong>
                    {order.shippingAddress && (
                      <span style={{color: '#878787', marginLeft: '12px'}}>📍 {order.shippingAddress}</span>
                    )}
                  </div>
                  <div>
                    <span style={{color: '#878787'}}>Total: </span>
                    <strong style={{color: '#212121', fontSize: '0.95rem', textDecoration: isCancelled ? 'line-through' : 'none'}}>₹{order.totalAmount.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div style={{textAlign: 'center', padding: '2rem'}}>
        <button
          onClick={() => setCurrentPage('products')}
          style={{padding: '10px 40px', background: '#fff', border: '1px solid #c2c2c2', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold'}}
        >
          Back to Shopping
        </button>
      </div>

      {/* Cancellation Modal */}
      {cancellingOrderId !== null && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', padding: '2rem', borderRadius: '8px', 
            width: '90%', maxWidth: '400px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{margin: '0 0 1rem', color: '#212121'}}>Cancel Order</h3>
            <p style={{margin: '0 0 1.5rem', color: '#555', fontSize: '0.9rem'}}>Please tell us why you are cancelling this order:</p>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '1.5rem'}}>
              {['Size fitting problem', 'Wrong product problem', 'Wrong order placed', 'etc'].map(reason => (
                <label key={reason} style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem'}}>
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value={reason} 
                    checked={cancelReason === reason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                  {reason === 'etc' ? 'Other' : reason}
                </label>
              ))}
              
              {cancelReason === 'etc' && (
                <input 
                  type="text" 
                  placeholder="Please specify..." 
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  style={{
                    padding: '8px', border: '1px solid #ccc', borderRadius: '4px', 
                    marginTop: '4px', fontSize: '0.9rem', width: '100%'
                  }}
                  autoFocus
                />
              )}
            </div>

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}>
              <button 
                onClick={() => { setCancellingOrderId(null); setCancelReason(''); setOtherReason(''); }}
                style={{padding: '8px 16px', background: '#f5f5f5', border: 'none', borderRadius: '4px', cursor: 'pointer'}}
              >
                Go Back
              </button>
              <button 
                onClick={handleCancelSubmit}
                disabled={!cancelReason || (cancelReason === 'etc' && !otherReason.trim())}
                style={{
                  padding: '8px 16px', background: '#ff1744', color: '#fff', border: 'none', 
                  borderRadius: '4px', cursor: 'pointer',
                  opacity: (!cancelReason || (cancelReason === 'etc' && !otherReason.trim())) ? 0.5 : 1
                }}
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

