import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import OrderSuccess from './pages/OrderSuccess';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminOrders from './pages/admin/Orders';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-center" toastOptions={{
        style: { background: '#0f1f3d', color: '#fff', borderLeft: '3px solid #c9a84c' }
      }} />
      <Navbar />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/shop"           element={<Shop />} />
        <Route path="/cart"           element={<Cart />} />
        <Route path="/checkout"       element={<Checkout />} />
        <Route path="/login"          element={<Login />} />
        <Route path="/orders"         element={<Orders />} />
        <Route path="/order-success"  element={<OrderSuccess />} />
        <Route path="/admin"          element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders"   element={<AdminOrders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
