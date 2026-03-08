import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import API from '../../api';
import toast from 'react-hot-toast';

const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled'];
const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrders() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchOrders();
  }, [user, filter]);

  const fetchOrders = () => {
    const params = filter ? `?status=${filter}` : '';
    API.get(`/orders${params}`)
      .then(r => setOrders(r.data.orders))
      .finally(() => setLoading(false));
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, { status });
      toast.success(`Order marked as ${status}`);
      fetchOrders();
    } catch {
      toast.error('Failed to update status');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-gold text-xs uppercase tracking-widest">Admin</p>
          <h1 className="font-display text-4xl text-navy">Orders</h1>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button onClick={() => setFilter('')}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${!filter ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy'}`}>
            All
          </button>
          {STATUSES.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium border capitalize transition-all ${filter === s ? 'bg-navy text-white border-navy' : 'bg-white text-gray-500 border-gray-200 hover:border-navy'}`}>
              {s}
            </button>
          ))}
        </div>

        {/* Orders */}
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">📦</div>
            <p>No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order._id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className="p-5 flex flex-wrap gap-4 items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                  <div>
                    <p className="font-semibold text-navy">{order.orderNumber}</p>
                    <p className="text-gray-400 text-sm">{order.customerInfo?.name} • {order.customerInfo?.phone}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-display text-navy font-bold">PKR {order.total?.toLocaleString()}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                    <span className="text-gray-400 text-xs">{new Date(order.createdAt).toLocaleDateString()}</span>
                    <span className="text-gray-400">{expanded === order._id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanded */}
                {expanded === order._id && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-navy mb-3 text-sm">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-gray-600">{item.name} ×{item.quantity}</span>
                              <span className="font-medium text-navy">PKR {(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t text-sm space-y-1">
                          <div className="flex justify-between text-gray-500"><span>Shipping</span><span>PKR 200</span></div>
                          <div className="flex justify-between font-bold text-navy"><span>Total</span><span>PKR {order.total?.toLocaleString()}</span></div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-navy mb-3 text-sm">Delivery Info</h4>
                        <div className="text-sm text-gray-500 space-y-1">
                          <p>{order.shippingAddress?.street}</p>
                          <p>{order.shippingAddress?.city}, {order.shippingAddress?.province}</p>
                          <p className="mt-2">Payment: <span className="uppercase font-medium text-navy">{order.paymentMethod}</span></p>
                        </div>
                        <h4 className="font-medium text-navy mt-4 mb-2 text-sm">Update Status</h4>
                        <div className="flex gap-2 flex-wrap">
                          {STATUSES.map(s => (
                            <button key={s} onClick={() => updateStatus(order._id, s)}
                              disabled={order.status === s}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all border ${
                                order.status === s
                                  ? 'bg-navy text-white border-navy'
                                  : 'bg-white text-gray-500 border-gray-200 hover:border-navy hover:text-navy'
                              }`}>
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
