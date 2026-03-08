import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import API from '../api';

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-indigo-100 text-indigo-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
};

export default function Orders() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    API.get('/orders/my')
      .then(r => setOrders(r.data.orders))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="text-gray-400">Loading orders...</div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="font-display text-4xl text-navy mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg">No orders yet</p>
            <Link to="/shop" className="inline-block mt-4 bg-navy text-white px-8 py-3 rounded font-medium hover:bg-gold hover:text-navy transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl border border-gray-100 p-6">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-3">
                  <div>
                    <p className="font-semibold text-navy">Order #{order.orderNumber}</p>
                    <p className="text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                    <span className="font-display text-navy font-bold">PKR {order.total?.toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm flex-shrink-0">
                      <span>👜</span>
                      <span className="text-navy">{item.name}</span>
                      <span className="text-gray-400">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
                {order.trackingNumber && (
                  <p className="text-sm text-gray-400 mt-3">Tracking: <span className="text-navy font-medium">{order.trackingNumber}</span></p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
