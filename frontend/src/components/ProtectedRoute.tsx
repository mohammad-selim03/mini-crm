// src/components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
