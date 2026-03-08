import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/products?limit=4')
      .then(r => setFeatured(r.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#faf7f2]">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f5f0e8]">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5z' fill='%23614E3A' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center py-32">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 border border-[#c9a84c]/40 text-[#8B6914] text-xs uppercase tracking-[0.2em] px-4 py-2 rounded-sm mb-8 bg-[#c9a84c]/5">
              <span className="w-4 h-px bg-[#c9a84c]"></span>
              Handcrafted in Pakistan
              <span className="w-4 h-px bg-[#c9a84c]"></span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-[#2C1810] leading-[1.05] mb-6">
              The Art of<br />
              <span className="italic text-[#614E3A]">Fine Leather</span>
            </h1>

            <p className="text-[#8B7355] text-lg leading-relaxed mb-10 max-w-md">
              Premium wallets crafted for the discerning Pakistani gentleman. Where heritage meets modern elegance — delivered with Cash on Delivery.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link to="/shop"
                className="bg-[#2C1810] text-[#f5f0e8] px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#614E3A] transition-all duration-300 hover:-translate-y-0.5">
                Explore Collection
              </Link>
              <Link to="/shop?category=gift"
                className="border border-[#2C1810] text-[#2C1810] px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#2C1810] hover:text-[#f5f0e8] transition-all duration-300">
                Gift Sets
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-10 mt-14 pt-10 border-t border-[#c9a84c]/20">
              {[['500+', 'Happy Customers'], ['4.9★', 'Avg Rating'], ['COD', 'Nationwide']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-[#2C1810] text-2xl font-bold">{num}</div>
                  <div className="text-[#8B7355] text-xs uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Decorative Visual */}
          <div className="hidden md:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Outer ring */}
              <div className="absolute inset-0 rounded-full border border-[#c9a84c]/20" />
              <div className="absolute inset-4 rounded-full border border-[#c9a84c]/15" />
              {/* Main card */}
              <div className="absolute inset-8 bg-[#2C1810] rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '12px 12px' }}
                />
                <div className="text-center z-10 p-8">
                  <div className="text-8xl mb-6">👜</div>
                  <div className="font-display text-[#c9a84c] text-2xl mb-2">VaultPK</div>
                  <div className="text-[#f5f0e8]/50 text-xs uppercase tracking-widest">Premium Leather Goods</div>
                </div>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#c9a84c] text-[#2C1810] px-5 py-3 rounded-lg shadow-lg">
                <div className="font-display text-lg font-bold">COD</div>
                <div className="text-xs font-medium uppercase tracking-wide">Available</div>
              </div>
              {/* Floating badge 2 */}
              <div className="absolute -top-4 -left-4 bg-white text-[#2C1810] px-5 py-3 rounded-lg shadow-lg border border-[#e8e0d0]">
                <div className="font-display text-lg font-bold">500+</div>
                <div className="text-xs text-[#8B7355] uppercase tracking-wide">Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B7355]">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#8B7355] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <div className="bg-[#2C1810] py-4 overflow-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12 flex-shrink-0">
              {['Premium Leather', 'Cash on Delivery', 'Nationwide Shipping', 'Gift Packaging', 'Easy Returns', 'Made in Pakistan'].map(t => (
                <span key={t} className="text-[#c9a84c] text-xs uppercase tracking-[0.2em] flex items-center gap-4">
                  {t} <span className="text-[#c9a84c]/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="py-24 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[#8B6914] text-xs uppercase tracking-[0.2em] mb-3">Browse By</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#2C1810]">Our Collections</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Men's Wallets", cat: 'mens', emoji: '👔', bg: '#2C1810' },
              { label: "Women's Wallets", cat: 'womens', emoji: '👛', bg: '#614E3A' },
              { label: 'Slim Wallets', cat: 'slim', emoji: '💳', bg: '#8B6914' },
              { label: 'Gift Sets', cat: 'gift', emoji: '🎁', bg: '#4A3728' },
            ].map(item => (
              <Link key={item.cat} to={`/shop?category=${item.cat}`}
                className="group relative aspect-square overflow-hidden rounded-sm"
                style={{ background: item.bg }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
                  <span className="font-display text-[#f5f0e8] text-lg text-center">{item.label}</span>
                  <span className="text-[#c9a84c] text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Shop Now →
                  </span>
                </div>
                <div className="absolute inset-0 border-2 border-[#c9a84c]/0 group-hover:border-[#c9a84c]/40 transition-all duration-300 rounded-sm" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-14 flex-wrap gap-4">
            <div>
              <p className="text-[#8B6914] text-xs uppercase tracking-[0.2em] mb-3">Handpicked For You</p>
              <h2 className="font-display text-4xl md:text-5xl text-[#2C1810]">Featured Wallets</h2>
            </div>
            <Link to="/shop"
              className="text-[#2C1810] text-sm uppercase tracking-widest border-b border-[#2C1810] pb-0.5 hover:text-[#8B6914] hover:border-[#8B6914] transition-colors">
              View All Collection
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-[#f5f0e8] animate-pulse rounded-sm" />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-24 text-[#8B7355]">
              <div className="text-6xl mb-4">👜</div>
              <p className="font-display text-xl">Products coming soon</p>
              <p className="text-sm mt-2">Add your first wallet from the admin panel</p>
            </div>
          )}
        </div>
      </section>

      {/* ── WHY VAULTPK ── */}
      <section className="py-24 bg-[#2C1810]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs uppercase tracking-[0.2em] mb-3">Our Promise</p>
            <h2 className="font-display text-4xl md:text-5xl text-[#f5f0e8]">Why Choose VaultPK</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#c9a84c]/10">
            {[
              ['💵', 'Cash on Delivery', 'Pay when your order arrives at your doorstep. No advance payment needed.'],
              ['🚚', 'Nationwide Delivery', 'We deliver to all major cities across Pakistan in 2–4 business days.'],
              ['🎁', 'Gift Packaging', 'Every order comes beautifully packaged — perfect for Eid and special occasions.'],
              ['🔄', 'Easy Returns', 'Not satisfied? Return within 7 days. No questions asked.'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="bg-[#2C1810] p-8 text-center group hover:bg-[#3d2415] transition-colors duration-300">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="font-display text-[#c9a84c] text-lg mb-3">{title}</h3>
                <p className="text-[#f5f0e8]/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HERITAGE STRIP ── */}
      <section className="py-24 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          <div className="w-16 h-px bg-[#c9a84c] mx-auto mb-8" />
          <h2 className="font-display text-3xl md:text-4xl text-[#2C1810] mb-6 italic">
            "Crafted with passion, delivered with pride"
          </h2>
          <p className="text-[#8B7355] leading-relaxed max-w-2xl mx-auto mb-10">
            At VaultPK, every wallet tells a story. We source the finest materials and bring them together
            to create accessories that last a lifetime — because you deserve nothing less.
          </p>
          <div className="w-16 h-px bg-[#c9a84c] mx-auto" />
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#614E3A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}
        />
        <div className="max-w-xl mx-auto px-6 text-center relative z-10">
          <p className="text-[#c9a84c] text-xs uppercase tracking-[0.2em] mb-4">Get in Touch</p>
          <h2 className="font-display text-4xl text-[#f5f0e8] mb-4">Have Questions?</h2>
          <p className="text-[#f5f0e8]/60 mb-10">Chat with us on WhatsApp — we reply within minutes!</p>
          <a href="https://wa.me/923001234567?text=Hi VaultPK! I want to know more about your wallets."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#25d366] text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#20bc5a] transition-all hover:-translate-y-0.5 shadow-lg">
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer"
        className="fixed bottom-8 right-8 bg-[#25d366] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-transform z-40 animate-pulse">
        💬
      </a>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
