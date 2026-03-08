import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="font-display text-2xl text-white mb-3">Vault<span className="text-gold">PK</span></div>
            <p className="text-sm leading-relaxed max-w-xs">Pakistan's premium wallet brand. Quality, style, and trust delivered to every doorstep across the country.</p>
          </div>
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4">Shop</h4>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/shop" className="hover:text-gold transition-colors">All Wallets</Link>
              <Link to="/shop?category=mens" className="hover:text-gold transition-colors">Men's</Link>
              <Link to="/shop?category=womens" className="hover:text-gold transition-colors">Women's</Link>
              <Link to="/shop?category=slim" className="hover:text-gold transition-colors">Slim</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs uppercase tracking-widest font-semibold mb-4">Help</h4>
            <div className="flex flex-col gap-2 text-sm">
              <a href="https://wa.me/923001234567" className="hover:text-gold transition-colors">WhatsApp Us</a>
              <Link to="/orders" className="hover:text-gold transition-colors">Track Order</Link>
              <Link to="/login" className="hover:text-gold transition-colors">My Account</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 VaultPK. All rights reserved.</p>
          <p>🇵🇰 Proudly Pakistani</p>
        </div>
      </div>
    </footer>
  );
}
