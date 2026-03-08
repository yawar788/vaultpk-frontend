import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1a0e09] text-[#f5f0e8]/60">
      {/* Top bar */}
      <div className="border-b border-[#c9a84c]/10 py-4">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-3 text-xs uppercase tracking-widest">
          <span className="text-[#c9a84c]/60">📦 Free shipping on orders above PKR 2,000</span>
          <span className="text-[#c9a84c]/60">💵 Cash on Delivery Available Nationwide</span>
          <span className="text-[#c9a84c]/60">🔄 7-Day Easy Returns</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="font-display text-3xl text-[#f5f0e8] mb-4 block">
              Vault<span className="text-[#c9a84c]">PK</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Pakistan's premium leather wallet brand. Crafted with passion, delivered with pride — to every doorstep across the country.
            </p>
            <a href="https://wa.me/923001234567"
              className="inline-flex items-center gap-2 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] text-xs uppercase tracking-widest px-5 py-2.5 hover:bg-[#25d366]/20 transition-colors">
              💬 WhatsApp Us
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-[#f5f0e8] text-xs uppercase tracking-[0.2em] font-semibold mb-5">Shop</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link to="/shop" className="hover:text-[#c9a84c] transition-colors">All Wallets</Link>
              <Link to="/shop?category=mens" className="hover:text-[#c9a84c] transition-colors">Men's Wallets</Link>
              <Link to="/shop?category=womens" className="hover:text-[#c9a84c] transition-colors">Women's Wallets</Link>
              <Link to="/shop?category=slim" className="hover:text-[#c9a84c] transition-colors">Slim Wallets</Link>
              <Link to="/shop?category=gift" className="hover:text-[#c9a84c] transition-colors">Gift Sets</Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[#f5f0e8] text-xs uppercase tracking-[0.2em] font-semibold mb-5">Help</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a href="https://wa.me/923001234567" className="hover:text-[#c9a84c] transition-colors">Contact Us</a>
              <Link to="/orders" className="hover:text-[#c9a84c] transition-colors">Track Order</Link>
              <Link to="/login" className="hover:text-[#c9a84c] transition-colors">My Account</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[#c9a84c]/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 VaultPK. All rights reserved.</p>
          <p className="text-[#c9a84c]/60">🇵🇰 Proudly Pakistani — Made with ❤️</p>
        </div>
      </div>
    </footer>
  );
}
