import { FileText, Home, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FileText size={28} className="mr-2 inline-block" />
              InvoiceApp
            </Link>

            {isAuthenticated && (
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <Home size={18} className="mr-1" />
                  Dashboard
                </Link>
                <Link
                  to="/invoices"
                  className="flex items-center px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FileText size={18} className="mr-1" />
                  Invoices
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-700 hidden md:block">
                  Welcome, {user?.name}
                </span>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <div className="space-x-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
