import { create } from 'zustand';

// ── Cart Store ─────────────────────────────────────────────
export const useCartStore = create((set, get) => ({
  items: [],

  addItem: (product) => {
    const items = get().items;
    const existing = items.find(i => i._id === product._id);
    if (existing) {
      set({ items: items.map(i => i._id === product._id ? { ...i, qty: i.qty + 1 } : i) });
    } else {
      set({ items: [...items, { ...product, qty: 1 }] });
    }
  },

  removeItem: (id) => set({ items: get().items.filter(i => i._id !== id) }),

  updateQty: (id, qty) => {
    if (qty <= 0) {
      set({ items: get().items.filter(i => i._id !== id) });
    } else {
      set({ items: get().items.map(i => i._id === id ? { ...i, qty } : i) });
    }
  },

  clearCart: () => set({ items: [] }),

  get total() {
    return get().items.reduce((s, i) => s + i.price * i.qty, 0);
  },

  get count() {
    return get().items.reduce((s, i) => s + i.qty, 0);
  },
}));

// ── Auth Store ─────────────────────────────────────────────
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('vaultpk_user') || 'null'),
  token: localStorage.getItem('vaultpk_token') || null,

  login: (user, token) => {
    localStorage.setItem('vaultpk_user', JSON.stringify(user));
    localStorage.setItem('vaultpk_token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('vaultpk_user');
    localStorage.removeItem('vaultpk_token');
    set({ user: null, token: null });
  },
}));
