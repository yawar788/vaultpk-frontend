import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore, useAuthStore } from '../store';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const count = useCartStore(s => s.items.reduce((a, i) => a + i.qty, 0));
  const { user, logout } = useAuthStore();

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    timeoutRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#2C1810] text-[#c9a84c] text-xs text-center py-2 px-4 uppercase tracking-widest z-50 relative">
        🚚 Free Shipping on Orders Above PKR 2,000 &nbsp;|&nbsp; Cash on Delivery Available
      </div>

      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur shadow-sm border-b border-[#e8e0d0]'
          : 'bg-[#faf7f2] border-b border-[#e8e0d0]'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="font-display text-2xl text-[#2C1810]">
            Vault<span className="text-[#c9a84c]">PK</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-10">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/shop?category=mens', "Men's"], ['/shop?category=womens', "Women's"], ['/shop?category=gift', 'Gift Sets']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-[#614E3A] hover:text-[#2C1810] text-xs font-medium uppercase tracking-widest transition-colors relative group">
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#c9a84c] group-hover:w-full transition-all duration-300" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative text-[#2C1810] hover:text-[#c9a84c] transition-colors flex items-center gap-1.5 text-sm font-medium">
              <span className="text-lg">🛒</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#2C1810] text-[#c9a84c] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-[#614E3A] hover:text-[#2C1810] text-xs font-medium uppercase tracking-widest transition-colors flex items-center gap-1.5"
                >
                  👤 {user.name.split(' ')[0]}
                  <span className="text-[10px] opacity-50">{dropdownOpen ? '▲' : '▼'}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-10 w-56 z-50">
                    <div className="h-2 w-full" />
                    <div className="bg-white rounded-none shadow-2xl border border-[#e8e0d0] py-2 overflow-hidden">
                      <div className="px-4 py-3 border-b border-[#f5f0e8] mb-1 bg-[#faf7f2]">
                        <p className="text-xs text-[#8B7355]">Signed in as</p>
                        <p className="text-sm font-semibold text-[#2C1810] truncate">{user.email}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setDropdownOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#2C1810] hover:bg-[#faf7f2] transition-colors">
                          🔐 <span>Admin Panel</span>
                        </Link>
                      )}
                      <Link to="/orders" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#2C1810] hover:bg-[#faf7f2] transition-colors">
                        📦 <span>My Orders</span>
                      </Link>
                      <div className="border-t border-[#f5f0e8] mt-1 pt-1">
                        <button onClick={handleLogout}
                          className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                          🚪 <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-[#614E3A] hover:text-[#2C1810] text-xs font-medium uppercase tracking-widest transition-colors">
                Login
              </Link>
            )}

            {/* Mobile toggle */}
            <button className="md:hidden text-[#2C1810] text-xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-[#faf7f2] border-t border-[#e8e0d0] px-6 py-5 flex flex-col gap-4">
            {[['/', 'Home'], ['/shop', 'Shop'], ['/shop?category=mens', "Men's Wallets"], ['/shop?category=womens', "Women's Wallets"], ['/shop?category=gift', 'Gift Sets']].map(([to, label]) => (
              <Link key={to} to={to} className="text-[#614E3A] hover:text-[#2C1810] text-sm uppercase tracking-widest" onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
            <div className="border-t border-[#e8e0d0] pt-4 flex flex-col gap-3">
              {user ? (
                <>
                  {user.role === 'admin' && <Link to="/admin" className="text-sm text-[#614E3A]" onClick={() => setMenuOpen(false)}>🔐 Admin Panel</Link>}
                  <Link to="/orders" className="text-sm text-[#614E3A]" onClick={() => setMenuOpen(false)}>📦 My Orders</Link>
                  <button onClick={handleLogout} className="text-left text-sm text-red-400">🚪 Logout</button>
                </>
              ) : (
                <Link to="/login" className="text-sm text-[#614E3A] uppercase tracking-widest" onClick={() => setMenuOpen(false)}>Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
