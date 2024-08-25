import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarAdmin from './components/admin/NavbarAdmin';
import NavbarUser from './components/user/NavbarUser';
import Dashboard from './pages/admin/Dashboard';
import Evaluation from './pages/admin/Evaluation';
import Policy from './pages/admin/Policy';
import UserManagement from './pages/admin/UserManagement';
import AdminManagement from './pages/admin/AdminManagement';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminRequireAuth } from './middlewares/AdminRequireAuth';
import { UserRequireAuth } from './middlewares/UserRequireAuth';
// import { AdminProvider } from './contexts/AdminContext';

import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister'
import UserHome from './pages/user/UserHome';
import UserEvalution from './pages/user/UserEvalution';
import UserManage from './pages/user/UserManage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        {/* Admin Route */}
        <Route element={
          <AdminRequireAuth><NavbarAdmin /></AdminRequireAuth>}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/evaluation" element={<Evaluation />} />
          <Route path="/admin/policy" element={<Policy />} />
          <Route path="/admin/usermanage" element={<UserManagement />} />
          <Route path="/admin/adminmanage" element={<AdminManagement />} />
        </Route>
        {/* user Route */}
        <Route element={
          <UserRequireAuth><NavbarUser /></UserRequireAuth>}>
          <Route path="/" element={<UserHome/>} />
          <Route path="/evaluation" element={<UserEvalution/>} />
          <Route path="/account" element={<UserManage/>} />
        </Route>

        {/* No Nav and Auth */}
        <Route path="/admin/register" element={<AdminLogin />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
