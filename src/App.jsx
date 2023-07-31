import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './components/user/AuthContext';
import { CartProvider } from './components/cart/CartContext';
import NavBar from './components/navbar';
import IndexCategories from './components/screens/indexcategories';
import IndexProducts from './components/screens/indexproducts';
import ProductDetails from './components/products/Details';
import Cart from './components/cart';
import AdminRoutes from './components/user/AdminRoutes';
import Login from './components/user/Login';
import Register from './components/user/Register';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <NavBar />
              <Routes>
                <Route path="/" element={<IndexCategories />} />
                <Route path="/products" element={<IndexProducts />} />
                <Route path="/products/:id" element={<ProductDetails />}/>
                <Route path="/cart-detail" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin/*" element={<AdminRoutes />} />
              </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
