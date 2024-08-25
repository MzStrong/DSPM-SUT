// AdminRequireAuth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAdmin } from '../services/admin/authService';

interface AdminRequireAuthProps {
  children: JSX.Element;
}

interface Admin {
  firstname: string;
  lastname: string;
}

interface AdminContextType {
  Admin: Admin | null;
  setAdmin: (Admin: Admin | null) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);


export const AdminRequireAuth: React.FC<AdminRequireAuthProps> = ({ children }) => {
  // const isAuthenticated = true; // เปลี่ยนเป็น logic ที่ใช้ตรวจสอบการยืนยันตัวตนของคุณ
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // const [admin, setAdmin] = useState({});
  const location = useLocation();
  const [Admin, setAdmin] = useState<Admin | null>(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const adminD = await getAdmin();
        setAdmin(adminD);
        setIsAuthenticated(true)
        // setAdmin({ firstname: adminD.firstname, lastname: adminD.lastname });
      } catch (error) {
        console.error(error);
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, [location.pathname]);

  if (isAuthenticated === null) {
    // ยังไม่ทราบสถานะการตรวจสอบ token
    return;
  }


  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // return React.cloneElement(children, { admin });
  return (
    <AdminContext.Provider value={{ Admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within a AdminProvider');
  }
  return context;
};
