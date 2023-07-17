import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './components/user/AuthContext';
import NavBar from './components/navbar'
import IndexCategories from './components/screens/indexcategories'
import IndexProducts from './components/screens/indexproducts'
import Login from './components/user/Login';
import Register from './components/user/Register';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
