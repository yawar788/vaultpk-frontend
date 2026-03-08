import { useCartStore } from '../store';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const addItem = useCartStore(s => s.addItem);

  const handleAdd = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="aspect-[4/3] bg-gradient-to-br from-navy to-navy-light flex items-center justify-center relative overflow-hidden">
          {product.images?.[0]?.url ? (
            <img src={product.images[0].url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <span className="text-6xl">👜</span>
          )}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-gold text-navy text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
              {product.badge}
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-display text-navy font-semibold mb-1 hover:text-gold transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-display text-navy font-bold text-lg">PKR {product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-gray-400 text-sm line-through ml-2">PKR {product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock === 0}
            className="bg-navy text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gold hover:text-navy transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
