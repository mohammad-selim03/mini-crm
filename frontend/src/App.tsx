import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/auth/Dashboard/Dashaboard";
import NewClientPage from "./pages/Clients/NewClients";
import EditClientPage from "./pages/Clients/EditClients";
import ClientsPage from "./pages/Clients/Clients";
import Interactions from "./pages/Interactions/Interactions";
import Reminders from "./pages/Reminders/Reminders";
import Projects from "./pages/Projects/Projects";
import NewProject from "./pages/Projects/NewProject";
import EditProject from "./pages/Projects/EditProject";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <ClientsPage />
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
        path="/interactions"
        element={
          <ProtectedRoute>
            <Interactions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reminders"
        element={
          <ProtectedRoute>
            <Reminders />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
