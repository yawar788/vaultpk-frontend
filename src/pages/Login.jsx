import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import API from '../api';
import toast from 'react-hot-toast';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.email || !form.password) return toast.error('Please fill in all fields');
    if (!isLogin && !form.name) return toast.error('Name is required');

    setLoading(true);
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const { data } = await API.post(endpoint, form);
      login(data.user, data.token);
      toast.success(isLogin ? 'Welcome back!' : 'Account created!');
      navigate(data.user.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#f7f8fc] flex items-center justify-center px-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-3xl text-navy">Vault<span className="text-gold">PK</span></Link>
          <p className="text-gray-400 text-sm mt-2">{isLogin ? 'Welcome back!' : 'Create your account'}</p>
        </div>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
          <button onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${isLogin ? 'bg-white text-navy shadow-sm' : 'text-gray-500'}`}>
            Login
          </button>
          <button onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-all ${!isLogin ? 'bg-white text-navy shadow-sm' : 'text-gray-500'}`}>
            Register
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-navy mb-1">Full Name *</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                placeholder="Ahmed Khan"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-navy mb-1">Email *</label>
            <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}
              placeholder="your@email.com"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-xs font-medium text-navy mb-1">Phone</label>
              <input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                placeholder="03XX XXXXXXX"
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
            </div>
          )}
          <div>
            <label className="block text-xs font-medium text-navy mb-1">Password *</label>
            <input type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-navy bg-gray-50" />
          </div>
        </div>

        <button onClick={handleSubmit} disabled={loading}
          className="w-full bg-navy text-white py-3 rounded-lg mt-6 font-semibold hover:bg-gold hover:text-navy transition-colors disabled:opacity-50">
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-navy font-medium hover:text-gold transition-colors">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
