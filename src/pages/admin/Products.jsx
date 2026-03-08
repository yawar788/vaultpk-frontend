import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store';
import API from '../../api';
import toast from 'react-hot-toast';

const EMPTY_FORM = { name: '', description: '', price: '', oldPrice: '', category: 'mens', stock: '', badge: '' };

export default function AdminProducts() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [images, setImages] = useState([]);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/'); return; }
    fetchProducts();
  }, [user]);

  const fetchProducts = () => {
    API.get('/products?limit=50')
      .then(r => setProducts(r.data.products))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.stock) return toast.error('Fill in required fields');
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => v && fd.append(k, v));
      images.forEach(img => fd.append('images', img));

      if (editId) {
        await API.put(`/products/${editId}`, fd);
        toast.success('Product updated!');
      } else {
        await API.post('/products', fd);
        toast.success('Product added!');
      }
      setShowForm(false);
      setForm(EMPTY_FORM);
      setImages([]);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await API.delete(`/products/${id}`);
      toast.success('Product deleted');
      fetchProducts();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price, oldPrice: p.oldPrice || '', category: p.category, stock: p.stock, badge: p.badge || '' });
    setEditId(p._id);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-gold text-xs uppercase tracking-widest">Admin</p>
            <h1 className="font-display text-4xl text-navy">Products</h1>
          </div>
          <button onClick={() => { setShowForm(true); setEditId(null); setForm(EMPTY_FORM); }}
            className="bg-navy text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gold hover:text-navy transition-colors">
            + Add Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6">
            <h2 className="font-display text-xl text-navy mb-4">{editId ? 'Edit Product' : 'Add New Product'}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[['name','Product Name *','text'],['price','Price (PKR) *','number'],['oldPrice','Old Price','number'],['stock','Stock *','number'],['badge','Badge (e.g. New)','text']].map(([key, label, type]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-navy mb-1">{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({...form, [key]: e.target.value})}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-navy bg-gray-50" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-navy mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-navy bg-gray-50">
                  {['mens','womens','slim','rfid','gift'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-2 md:col-span-3">
                <label className="block text-xs font-medium text-navy mb-1">Description *</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-navy bg-gray-50 resize-none" />
              </div>
              <div className="col-span-2 md:col-span-3">
                <label className="block text-xs font-medium text-navy mb-1">Product Images</label>
                <input type="file" multiple accept="image/*" onChange={e => setImages([...e.target.files])}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-gray-50" />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button onClick={handleSubmit} disabled={saving}
                className="bg-navy text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gold hover:text-navy transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : editId ? 'Update Product' : 'Add Product'}
              </button>
              <button onClick={() => { setShowForm(false); setEditId(null); }}
                className="border border-gray-200 text-gray-500 px-6 py-2.5 rounded-lg text-sm font-medium hover:border-navy hover:text-navy transition-colors">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <div className="text-5xl mb-3">👜</div>
              <p>No products yet. Add your first wallet!</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr className="text-gray-400 text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-4">Product</th>
                  <th className="text-left px-6 py-4">Category</th>
                  <th className="text-left px-6 py-4">Price</th>
                  <th className="text-left px-6 py-4">Stock</th>
                  <th className="text-left px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(p => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center text-lg overflow-hidden">
                          {p.images?.[0]?.url ? <img src={p.images[0].url} className="w-full h-full object-cover" /> : '👜'}
                        </div>
                        <div>
                          <p className="font-medium text-navy">{p.name}</p>
                          {p.badge && <span className="text-xs text-gold">{p.badge}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 capitalize text-gray-500">{p.category}</td>
                    <td className="px-6 py-4 font-semibold text-navy">PKR {p.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(p)} className="text-navy hover:text-gold text-xs font-medium transition-colors">Edit</button>
                        <button onClick={() => handleDelete(p._id)} className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
