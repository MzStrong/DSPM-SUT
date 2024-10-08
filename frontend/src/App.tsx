import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarAdmin from './components/admin/NavbarAdmin';
import NavbarUser from './components/user/NavbarUser';
import Dashboard from './pages/admin/Dashboard';
import Evaluation from './pages/admin/Evaluation/Evaluation';
import Policy from './pages/admin/Policy/Policy';
import UserManagement from './pages/admin/UserManagement/UserManagement';
import AdminManagement from './pages/admin/AdminManagement/AdminManagement';
import AdminLogin from './pages/admin/AdminLogin';
import { AdminRequireAuth } from './middlewares/AdminRequireAuth';
import { UserRequireAuth } from './middlewares/UserRequireAuth';
// import { AdminProvider } from './contexts/AdminContext';

import UserLogin from './pages/user/UserLogin';
import UserRegister from './pages/user/UserRegister'
import UserHome from './pages/user/UserHome';
import UserEvalution from './pages/user/UserEvaluation/UserEvaluation';
import UserManage from './pages/user/UserManage';
import UserChildren from './pages/user/UserChildren/UserChildren';
import ChildrenManager from './pages/admin/ChildrenManager/ChildrenManager';

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
          <Route path="/admin/usermanage/children" element={<ChildrenManager />} />
        </Route>
        {/* user Route */}
        <Route element={
          <UserRequireAuth><NavbarUser /></UserRequireAuth>}>
          <Route path="/" element={<UserHome/>} />
          <Route path="/evaluation" element={<UserEvalution/>} />
          <Route path="/account" element={<UserManage/>} />
          <Route path="/children" element={<UserChildren/>} />
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
