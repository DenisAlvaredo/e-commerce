import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query';
import NavBar from './components/navbar'
import IndexCategories from './components/screens/indexcategories'
import IndexProducts from './components/screens/indexproducts'

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexCategories />} />
          <Route path="/products" element={<IndexProducts />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
