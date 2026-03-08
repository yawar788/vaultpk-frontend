import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const count = useCartStore(s => s.items.reduce((a, i) => a + i.qty, 0));
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-display text-2xl text-white">
          Vault<span className="text-gold">PK</span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8">
          {[['/', 'Home'], ['/shop', 'Shop'], ['/about', 'About']].map(([to, label]) => (
            <li key={to}>
              <Link to={to} className="text-white/70 hover:text-gold text-sm font-medium uppercase tracking-widest transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <Link to="/cart" className="relative bg-gold text-navy px-4 py-2 rounded text-sm font-semibold flex items-center gap-2 hover:bg-gold-light transition-colors">
            🛒
            {count > 0 && (
              <span className="bg-navy text-gold text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="relative group">
              <button className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
                👤 {user.name.split(' ')[0]}
              </button>
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-xl w-48 py-2 hidden group-hover:block z-50">
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-navy hover:bg-gray-50">🔐 Admin Panel</Link>
                )}
                <Link to="/orders" className="block px-4 py-2 text-sm text-navy hover:bg-gray-50">📦 My Orders</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50">
                  🚪 Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
              Login
            </Link>
          )}

          {/* Mobile menu */}
          <button className="md:hidden text-white text-xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy border-t border-gold/20 px-6 py-4 flex flex-col gap-4">
          <Link to="/" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link to="/cart" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>Cart ({count})</Link>
          {user ? (
            <button onClick={handleLogout} className="text-left text-red-400 text-sm">Logout</button>
          ) : (
            <Link to="/login" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
