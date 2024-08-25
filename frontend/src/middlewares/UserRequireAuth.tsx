// UserRequireAuth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../services/user/authService';

interface UserRequireAuthProps {
  children: JSX.Element;
}

interface User {
  firstname: string;
  lastname: string;
}

interface UserContextType {
  User: User | null;
  setUser: (User: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserRequireAuth: React.FC<UserRequireAuthProps> = ({ children }) => {
  // const isAuthenticated = true; // เปลี่ยนเป็น logic ที่ใช้ตรวจสอบการยืนยันตัวตนของคุณ
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const [User, setUser] = useState<User | null>(null);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userD = await getUser();
        setUser(userD);
        setIsAuthenticated(true)
        
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <UserContext.Provider value={{ User, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
