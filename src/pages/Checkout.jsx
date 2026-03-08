import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';
import API from '../api';
import toast from 'react-hot-toast';

const CITIES = ['Karachi','Lahore','Islamabad','Rawalpindi','Peshawar','Quetta','Faisalabad','Multan','Hyderabad','Sukkur','Other'];
const PAYMENT_METHODS = [
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { value: 'easypaisa', label: 'EasyPaisa', icon: '📱' },
  { value: 'jazzcash', label: 'JazzCash', icon: '💳' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: '',
    email: user?.email || '',
    street: '',
    city: '',
    province: '',
  });

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 200;
  const total = subtotal + shipping;

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.street || !form.city)
      return toast.error('Please fill in all required fields');
    if (items.length === 0)
      return toast.error('Your cart is empty');

    setLoading(true);
    try {
      const { data } = await API.post('/orders', {
        customerInfo: { name: form.name, phone: form.phone, email: form.email },
        shippingAddress: { street: form.street, city: form.city, province: form.province },
        items: items.map(i => ({ productId: i._id, quantity: i.qty })),
        paymentMethod,
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/order-success', { state: { order: data.order } });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc]">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-display text-4xl text-navy mb-8">Checkout</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2 space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-display text-xl text-navy mb-4">Your Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-navy mb-1">Full Name *</label>
                  <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="Ahmed Khan"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-xs font-medium text-navy mb-1">Phone Number *</label>
                  <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                    placeholder="03XX XXXXXXX"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-navy mb-1">Email (optional)</label>
                  <input value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    placeholder="your@email.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-display text-xl text-navy mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-navy mb-1">Street Address *</label>
                  <input value={form.street} onChange={e => setForm({...form, street: e.target.value})}
                    placeholder="House no., Street, Area"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1">City *</label>
                    <select value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50">
                      <option value="">Select City</option>
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy mb-1">Province</label>
                    <input value={form.province} onChange={e => setForm({...form, province: e.target.value})}
                      placeholder="e.g. Punjab"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <h2 className="font-display text-xl text-navy mb-4">Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {PAYMENT_METHODS.map(m => (
                  <button key={m.value} onClick={() => setPaymentMethod(m.value)}
                    className={`border-2 rounded-xl p-4 text-center transition-all ${
                      paymentMethod === m.value ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <div className="text-2xl mb-1">{m.icon}</div>
                    <div className="text-xs font-medium text-navy">{m.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 h-fit">
            <h2 className="font-display text-xl text-navy mb-4">Order Summary</h2>
            <div className="space-y-3 mb-4">
              {items.map(i => (
                <div key={i._id} className="flex justify-between text-sm text-gray-500">
                  <span>{i.name} ×{i.qty}</span>
                  <span>PKR {(i.price * i.qty).toLocaleString()}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                <span>Shipping</span><span>PKR 200</span>
              </div>
              <div className="flex justify-between font-bold text-navy pt-2 border-t">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-lg">PKR {total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handleSubmit} disabled={loading}
              className="w-full bg-navy text-white py-4 rounded-lg font-semibold hover:bg-gold hover:text-navy transition-colors disabled:opacity-50">
              {loading ? 'Placing Order...' : `🎉 Place Order — PKR ${total.toLocaleString()}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
