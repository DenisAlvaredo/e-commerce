import { Route, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import CreateCategory from '../categories/Create';
import EditCategory from '../categories/Edit';
import CreateProducts from '../products/Create';
import EditProducts from '../products/Edit';

const AdminRoutes = () => {
  const { isAdmin } =  useContext(AuthContext);

  // Si el usuario no es admin, redirigir a la página de inicio
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <Outlet>
      {/* Rutas protegidas para usuarios admin */}
      <Route path="/products/create" element={<CreateProducts />} />
      <Route path="/products/:id/edit" element={<EditProducts />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/categories/:id/edit" element={<EditCategory />} />
    </Outlet>
  );
};

export default AdminRoutes;
