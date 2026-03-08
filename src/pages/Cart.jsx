import { useCartStore } from '../store';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, removeItem, updateQty } = useCartStore();
  const navigate = useNavigate();
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = 200;
  const total = subtotal + shipping;

  if (items.length === 0) return (
    <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-gray-400">
      <div className="text-7xl mb-4">🛒</div>
      <h2 className="font-display text-2xl text-navy mb-2">Your cart is empty</h2>
      <p className="mb-6">Add some wallets to get started!</p>
      <Link to="/shop" className="bg-navy text-white px-8 py-3 rounded font-medium hover:bg-gold hover:text-navy transition-colors">
        Browse Wallets
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc]">
      <div className="max-w-5xl mx-auto px-6">
        <h1 className="font-display text-4xl text-navy mb-8">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Items */}
          <div className="md:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item._id} className="bg-white rounded-xl p-4 flex gap-4 items-center border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-navy to-navy-light rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {item.images?.[0]?.url
                    ? <img src={item.images[0].url} alt={item.name} className="w-full h-full object-cover" />
                    : <span className="text-3xl">👜</span>
                  }
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-navy font-semibold">{item.name}</h3>
                  <p className="text-gold font-bold mt-1">PKR {(item.price * item.qty).toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item._id, item.qty - 1)} className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-navy hover:text-white transition-colors text-sm">−</button>
                    <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                    <button onClick={() => updateQty(item._id, item.qty + 1)} className="w-7 h-7 border border-gray-200 rounded flex items-center justify-center hover:bg-navy hover:text-white transition-colors text-sm">+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item._id)} className="text-red-400 hover:text-red-600 text-xl transition-colors">🗑️</button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 h-fit">
            <h2 className="font-display text-xl text-navy mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>PKR {subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span>PKR {shipping}</span></div>
              <div className="border-t pt-3 flex justify-between font-bold text-navy">
                <span className="font-display text-lg">Total</span>
                <span className="font-display text-lg">PKR {total.toLocaleString()}</span>
              </div>
            </div>
            <div className="bg-gold/10 border border-gold/30 rounded-lg p-3 mt-4 text-sm text-navy">
              💵 Cash on Delivery available!
            </div>
            <button onClick={() => navigate('/checkout')} className="w-full bg-navy text-white py-3 rounded-lg mt-4 font-semibold hover:bg-gold hover:text-navy transition-colors">
              Proceed to Checkout →
            </button>
            <Link to="/shop" className="block text-center text-sm text-gray-400 hover:text-navy mt-3 transition-colors">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
