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
    <div>
      {/* ── Hero ── */}
      <section className="min-h-screen bg-gradient-to-br from-navy via-navy-light to-[#1e3a6e] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c9a84c' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-block bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest px-4 py-2 rounded mb-6">
              🇵🇰 Made for Pakistan
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-white leading-tight mb-6">
              Carry What <span className="text-gold">Matters</span> Most
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg">
              Premium wallets crafted for the modern Pakistani. Slim, stylish, and built to last — delivered with Cash on Delivery.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/shop" className="bg-gold text-navy px-8 py-4 rounded font-semibold hover:bg-gold-light transition-all hover:-translate-y-1">
                Shop Now
              </Link>
              <a href="https://wa.me/923001234567" className="border border-white/30 text-white px-8 py-4 rounded font-medium hover:border-gold hover:text-gold transition-all">
                💬 WhatsApp Us
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[['500+', 'Happy Customers'], ['4.9★', 'Avg Rating'], ['COD', 'Available']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-gold text-2xl font-bold">{num}</div>
                  <div className="text-white/40 text-xs uppercase tracking-wider mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="py-20 bg-[#f7f8fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div>
              <p className="text-gold text-xs uppercase tracking-widest font-medium mb-2">Our Collection</p>
              <h2 className="font-display text-4xl text-navy">Featured Wallets</h2>
            </div>
            <Link to="/shop" className="text-navy border-b border-navy hover:text-gold hover:border-gold transition-colors text-sm font-medium">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <div className="text-6xl mb-4">👜</div>
              <p>Products coming soon!</p>
              <p className="text-sm mt-2">Check back after adding products in the admin panel.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-gold text-xs uppercase tracking-widest font-medium mb-2">Why Choose Us</p>
            <h2 className="font-display text-4xl text-navy">The VaultPK Promise</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['💵', 'Cash on Delivery', 'Pay when your wallet arrives at your door'],
              ['🚚', 'Nationwide Delivery', 'We deliver to all major cities in Pakistan'],
              ['🎁', 'Gift Packaging', 'Beautifully packaged for every occasion'],
              ['🔄', 'Easy Returns', 'Hassle-free returns within 7 days'],
            ].map(([icon, title, desc]) => (
              <div key={title} className="border border-gray-100 rounded-xl p-6 text-center hover:border-gold transition-colors hover:-translate-y-1 duration-300">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-display text-navy font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-display text-4xl text-white mb-4">Still Have Questions?</h2>
          <p className="text-white/60 mb-8">Chat with us on WhatsApp — we reply within minutes!</p>
          <a href="https://wa.me/923001234567?text=Hi VaultPK! I want to know more about your wallets."
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25d366] text-white px-8 py-4 rounded font-semibold hover:bg-[#20bc5a] transition-all hover:-translate-y-1">
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* WhatsApp Float */}
      <a href="https://wa.me/923001234567" target="_blank" rel="noreferrer"
        className="fixed bottom-8 right-8 bg-[#25d366] text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg hover:scale-110 transition-transform z-40">
        💬
      </a>
    </div>
  );
}
