import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const count = useCartStore(s => s.items.reduce((a, i) => a + i.qty, 0));
  const { user, logout } = useAuthStore();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay so user can move mouse to dropdown without it closing
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
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
            <div
              className="relative"
              ref={dropdownRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Click also toggles */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white/80 hover:text-gold text-sm font-medium transition-colors px-2 py-2 flex items-center gap-1"
              >
                👤 {user.name.split(' ')[0]}
                <span className="text-xs ml-1 opacity-60">{dropdownOpen ? '▲' : '▼'}</span>
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 top-10 w-52 z-50">
                  {/* Invisible bridge — fills the gap between button and menu */}
                  <div className="h-2 w-full" />
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                    {/* User info */}
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs text-gray-400">Signed in as</p>
                      <p className="text-sm font-semibold text-navy truncate">{user.email}</p>
                    </div>

                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-gray-50 transition-colors"
                      >
                        🔐 <span>Admin Panel</span>
                      </Link>
                    )}

                    <Link
                      to="/orders"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-navy hover:bg-gray-50 transition-colors"
                    >
                      📦 <span>My Orders</span>
                    </Link>

                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        🚪 <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="text-white/80 hover:text-gold text-sm font-medium transition-colors">
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
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
            <>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>🔐 Admin Panel</Link>
              )}
              <Link to="/orders" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
              <button onClick={handleLogout} className="text-left text-red-400 text-sm">🚪 Logout</button>
            </>
          ) : (
            <Link to="/login" className="text-white/80 hover:text-gold text-sm" onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
