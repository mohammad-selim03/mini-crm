import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useTheme } from "../context/ThemeContext";

const Layout = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200 max-w-7xl mx-auto">
      <Navbar />
      <main className="flex-grow bg-white dark:bg-gray-900 transition-colors duration-200">
        <Outlet />
      </main>
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Tech CRM. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
