import { useLocation, Link } from 'react-router-dom';

export default function OrderSuccess() {
  const { state } = useLocation();
  const order = state?.order;

  return (
    <div className="min-h-screen pt-24 flex items-center justify-center bg-[#f7f8fc] px-6">
      <div className="bg-white rounded-2xl border border-gray-100 p-10 max-w-md w-full text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="font-display text-3xl text-navy mb-2">Order Placed!</h1>
        {order && (
          <p className="text-gold font-semibold mb-2">Order #{order.orderNumber}</p>
        )}
        <p className="text-gray-400 leading-relaxed mb-6">
          Thank you! We'll call you to confirm delivery.<br />
          Expected delivery: <strong className="text-navy">2–4 business days</strong>
        </p>
        {order && (
          <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 text-sm space-y-2">
            <div className="flex justify-between text-gray-500"><span>Name</span><span className="text-navy font-medium">{order.customerInfo?.name}</span></div>
            <div className="flex justify-between text-gray-500"><span>Phone</span><span className="text-navy font-medium">{order.customerInfo?.phone}</span></div>
            <div className="flex justify-between text-gray-500"><span>City</span><span className="text-navy font-medium">{order.shippingAddress?.city}</span></div>
            <div className="flex justify-between text-gray-500"><span>Payment</span><span className="text-navy font-medium uppercase">{order.paymentMethod}</span></div>
            <div className="flex justify-between font-bold border-t pt-2"><span>Total</span><span className="text-gold">PKR {order.total?.toLocaleString()}</span></div>
          </div>
        )}
        <div className="flex gap-3">
          <Link to="/shop" className="flex-1 border border-navy text-navy py-3 rounded-lg text-sm font-medium hover:bg-navy hover:text-white transition-colors">
            Continue Shopping
          </Link>
          <Link to="/orders" className="flex-1 bg-navy text-white py-3 rounded-lg text-sm font-medium hover:bg-gold hover:text-navy transition-colors">
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
