import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/navbar'
import IndexCategories from './components/screens/indexcategories'
import IndexProducts from './components/screens/indexproducts'

function App() {

  return (
    <>
    <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexCategories />} />
          <Route path="/products" element={<IndexProducts />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
