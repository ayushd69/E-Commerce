import React, { useState } from 'react';

const AdminDashboard = ({ users, deleteUser, orders, cancelOrder }) => {
  const [expandedUser, setExpandedUser] = useState(null);

  const toggleUser = (email) => {
    setExpandedUser(expandedUser === email ? null : email);
  };

  return (
    <div style={{maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem'}}>
      <div style={{marginBottom: '2rem'}}>
        <h1 style={{fontSize: '2rem', color: '#212121', margin: 0}}>Admin Dashboard</h1>
        <p style={{color: '#777', marginTop: '8px'}}>Click on a user to view and manage their orders.</p>
      </div>

      <div style={{background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', overflow: 'hidden'}}>
        <div style={{padding: '1.5rem', borderBottom: '1px solid #eee', background: '#f8f9fa'}}>
          <h2 style={{margin: 0, fontSize: '1.25rem', color: '#333'}}>Manage Users ({users.length})</h2>
        </div>
        
        {users.length === 0 ? (
          <div style={{padding: '3rem', textAlign: 'center', color: '#888'}}>No users found.</div>
        ) : (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            {/* Header */}
            <div style={{display: 'flex', background: '#f1f3f6', color: '#555', fontSize: '0.9rem', fontWeight: 600, padding: '12px 24px'}}>
              <div style={{flex: 1}}>Name</div>
              <div style={{flex: 1}}>Email</div>
              <div style={{flex: 1}}>Joined</div>
              <div style={{width: '120px', textAlign: 'right'}}>Actions</div>
            </div>

            {/* User List */}
            {users.map(user => {
              const isExpanded = expandedUser === user.email;
              const userOrders = orders.filter(o => o.userEmail === user.email);

              return (
                <div key={user.email} style={{borderBottom: '1px solid #eee'}}>
                  {/* User Row */}
                  <div 
                    onClick={() => toggleUser(user.email)}
                    style={{
                      display: 'flex', alignItems: 'center', padding: '16px 24px', 
                      cursor: 'pointer', background: isExpanded ? '#fafafa' : '#fff',
                      transition: 'background 0.2s'
                    }}
                  >
                    <div style={{flex: 1, fontWeight: 500, color: '#333', display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '24px', height: '24px', borderRadius: '50%', background: '#e3f2fd', color: '#1976d2',
                        fontSize: '0.75rem', fontWeight: 'bold'
                      }}>
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      {user.name}
                    </div>
                    <div style={{flex: 1, color: '#666'}}>{user.email}</div>
                    <div style={{flex: 1, color: '#666'}}>{user.joinDate}</div>
                    <div style={{width: '120px', textAlign: 'right'}} onClick={e => e.stopPropagation()}>
                      <button 
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${user.name}? This will remove them from the system.`)) {
                            deleteUser(user.email);
                          }
                        }}
                        style={{
                          padding: '6px 16px', background: '#ffebee', color: '#d32f2f', 
                          border: '1px solid #ef9a9a', borderRadius: '4px', cursor: 'pointer',
                          fontWeight: 600, fontSize: '0.85rem'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Expanded Orders Area */}
                  {isExpanded && (
                    <div style={{padding: '24px', background: '#fafafa', borderTop: '1px dashed #e0e0e0'}}>
                      <h4 style={{margin: '0 0 16px', color: '#333', fontSize: '1.1rem'}}>
                        Orders for {user.name} ({userOrders.length})
                      </h4>
                      
                      {userOrders.length === 0 ? (
                        <div style={{padding: '2rem', textAlign: 'center', color: '#888', background: '#fff', borderRadius: '8px', border: '1px solid #eee'}}>
                          This user has no orders.
                        </div>
                      ) : (
                        <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                          {userOrders.map((order, idx) => {
                            const isCancelled = order.status === 'Cancelled';
                            return (
                              <div key={idx} style={{
                                background: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '16px',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                opacity: isCancelled ? 0.7 : 1
                              }}>
                                <div>
                                  <div style={{fontWeight: 600, color: '#333'}}>Order {order.orderId || `LOCAL_${idx}`}</div>
                                  <div style={{fontSize: '0.85rem', color: '#777', marginTop: '4px'}}>
                                    {order.items.length} items • Placed on {order.date}
                                  </div>
                                </div>
                                
                                <div style={{fontWeight: 600, color: '#333', textAlign: 'right'}}>
                                  ₹{order.totalAmount.toLocaleString('en-IN')}
                                </div>

                                <div>
                                  <span style={{
                                    padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600,
                                    background: isCancelled ? '#ffebee' : '#e8f5e9',
                                    color: isCancelled ? '#c62828' : '#2e7d32'
                                  }}>
                                    {order.status || 'Ordered'}
                                  </span>
                                </div>

                                <div>
                                  {!isCancelled ? (
                                    <button 
                                      onClick={() => {
                                        const reason = window.prompt("Enter cancellation reason for " + user.name + "'s order:");
                                        if (reason) {
                                          cancelOrder(order.orderId || `LOCAL_${idx}`, reason);
                                        }
                                      }}
                                      style={{
                                        padding: '6px 16px', background: '#fff', color: '#ff1744', 
                                        border: '1px solid #ff1744', borderRadius: '4px', cursor: 'pointer',
                                        fontWeight: 600, fontSize: '0.85rem'
                                      }}
                                    >
                                      Cancel Order
                                    </button>
                                  ) : (
                                    <span style={{fontSize: '0.85rem', color: '#888', fontStyle: 'italic'}}>Cancelled</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
