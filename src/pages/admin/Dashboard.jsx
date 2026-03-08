import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store';
import API from '../../api';

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    API.get('/analytics/summary')
      .then(r => setSummary(r.data.summary))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <div className="min-h-screen pt-24 flex items-center justify-center text-gray-400">Loading...</div>;

  const cards = [
    { label: 'Total Revenue', value: `PKR ${(summary?.totalRevenue || 0).toLocaleString()}`, icon: '💰', color: 'bg-green-50 border-green-200' },
    { label: 'Total Orders', value: summary?.totalOrders || 0, icon: '📦', color: 'bg-blue-50 border-blue-200' },
    { label: 'Pending Orders', value: summary?.pendingOrders || 0, icon: '⏳', color: 'bg-yellow-50 border-yellow-200' },
    { label: 'Products', value: summary?.totalProducts || 0, icon: '👜', color: 'bg-purple-50 border-purple-200' },
    { label: 'Customers', value: summary?.totalCustomers || 0, icon: '👥', color: 'bg-pink-50 border-pink-200' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <p className="text-gold text-xs uppercase tracking-widest">Admin Panel</p>
            <h1 className="font-display text-4xl text-navy">Dashboard</h1>
          </div>
          <div className="flex gap-3">
            <Link to="/admin/products" className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold hover:text-navy transition-colors">
              Manage Products
            </Link>
            <Link to="/admin/orders" className="border border-navy text-navy px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-navy hover:text-white transition-colors">
              Manage Orders
            </Link>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {cards.map(card => (
            <div key={card.label} className={`border rounded-xl p-5 ${card.color}`}>
              <div className="text-2xl mb-2">{card.icon}</div>
              <div className="font-display text-navy text-xl font-bold">{card.value}</div>
              <div className="text-gray-500 text-xs mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-xl text-navy">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-navy hover:text-gold transition-colors">View All →</Link>
          </div>
          {summary?.recentOrders?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 text-xs uppercase tracking-wider border-b">
                    <th className="text-left pb-3">Order</th>
                    <th className="text-left pb-3">Customer</th>
                    <th className="text-left pb-3">Amount</th>
                    <th className="text-left pb-3">Status</th>
                    <th className="text-left pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {summary.recentOrders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="py-3 font-medium text-navy">{order.orderNumber}</td>
                      <td className="py-3 text-gray-500">{order.customerInfo?.name}</td>
                      <td className="py-3 font-semibold">PKR {order.total?.toLocaleString()}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>{order.status}</span>
                      </td>
                      <td className="py-3 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
