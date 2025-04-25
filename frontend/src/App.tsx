import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
// import Dashboard from "./pages/Dashboard/Dashboard";
import Clients from "./pages/Clients/Clients";
import Projects from "./pages/Projects/Projects";
import Interactions from "./pages/Interactions/Interactions";
import Reminders from "./pages/Reminders/Reminders";
import EditProject from "./pages/Projects/EditProject";
import NewProject from "./pages/Projects/NewProject";
import EditClientPage from "./pages/Clients/EditClients";
import NewClientPage from "./pages/Clients/NewClients";
import { useTheme } from "./context/ThemeContext";
import Dashboard from "./pages/auth/Dashboard/Dashaboard";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const App = () => {
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 ${
        isDark ? "dark" : ""
      }`}
    >
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="clients"
              element={
                <ProtectedRoute>
                  <Clients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients/new"
              element={
                <ProtectedRoute>
                  <NewClientPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/clients/edit/:id"
              element={
                <ProtectedRoute>
                  <EditClientPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/new"
              element={
                <ProtectedRoute>
                  <NewProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="/projects/edit/:id"
              element={
                <ProtectedRoute>
                  <EditProject />
                </ProtectedRoute>
              }
            />
            <Route
              path="projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />
            <Route
              path="interactions"
              element={
                <ProtectedRoute>
                  <Interactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="reminders"
              element={
                <ProtectedRoute>
                  <Reminders />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
};

export default App;
