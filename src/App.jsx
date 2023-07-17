import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
<<<<<<< HEAD
import { AuthProvider } from './components/user/AuthContext';
=======
>>>>>>> 2d4f62bfda9e00f8058e70c3202c15a3a003ce7a
import NavBar from './components/navbar'
import IndexCategories from './components/screens/indexcategories'
import IndexProducts from './components/screens/indexproducts'
import Login from './components/user/Login';
import Register from './components/user/Register';

const queryClient = new QueryClient();

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
            <Routes>
              <Route path="/" element={<IndexCategories />} />
              <Route path="/products" element={<IndexProducts />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
      </AuthProvider>
=======
    <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexCategories />} />
          <Route path="/products" element={<IndexProducts />} />
        </Routes>
      </BrowserRouter>
>>>>>>> 2d4f62bfda9e00f8058e70c3202c15a3a003ce7a
    </QueryClientProvider>
  )
}

export default App
