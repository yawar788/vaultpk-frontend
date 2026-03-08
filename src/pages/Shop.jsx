import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import API from '../api';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'mens', label: "Men's" },
  { value: 'womens', label: "Women's" },
  { value: 'slim', label: 'Slim' },
  { value: 'rfid', label: 'RFID' },
  { value: 'gift', label: 'Gift' },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (category !== 'all') params.set('category', category);
    if (search) params.set('search', search);

    API.get(`/products?${params}`)
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="min-h-screen bg-[#f7f8fc] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8">
          <p className="text-gold text-xs uppercase tracking-widest font-medium mb-1">Browse</p>
          <h1 className="font-display text-4xl text-navy">Our Wallets</h1>
          <p className="text-gray-400 mt-1">{total} products found</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c.value}
                onClick={() => setSearchParams(c.value === 'all' ? {} : { category: c.value })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                  category === c.value
                    ? 'bg-navy text-white border-navy'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-navy hover:text-navy'
                }`}>
                {c.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="🔍 Search wallets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-navy bg-white w-full md:w-64"
          />
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl aspect-[4/3] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">👜</div>
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-2">Try a different category or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
