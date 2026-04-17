import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Calendar,
  LogOut,
  Package,
  ShoppingCart,
  UserCircle,
  Home,
  Utensils,
  Phone,
  Menu as MenuIcon,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, user, setUser, setAdmin, axios, cartCount } =
    useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        setAdmin(false);
        localStorage.removeItem("admin");
        toast.success(data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-orange-50 via-white to-yellow-50 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="./logo.png" alt="" className="w-28" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">

            <Link to="/" className="flex items-center gap-2 hover:text-orange-500 transition">
              <Home size={18} /> Home
            </Link>

            <Link to="/menu" className="flex items-center gap-2 hover:text-orange-500 transition">
              <Utensils size={18} /> Menu
            </Link>

            <Link to="/book-table" className="flex items-center gap-2 hover:text-orange-500 transition">
              <Calendar size={18} /> Book
            </Link>

            <Link to="/contact" className="flex items-center gap-2 hover:text-orange-500 transition">
              <Phone size={18} /> Contact
            </Link>

          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 bg-white rounded-lg shadow"
          >
            {isMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 bg-white rounded-full shadow hover:scale-105 transition"
            >
              <ShoppingCart size={22} />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount || 0}
              </span>
            </button>

            {/* Profile */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="p-2 bg-white rounded-full shadow hover:scale-105 transition"
                  >
                    <UserCircle size={30} />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-lg py-2 border">

                      <Link
                        to="/my-bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 hover:bg-orange-50"
                      >
                        <Calendar size={18} className="mr-2 text-orange-500" />
                        My Bookings
                      </Link>

                      <Link
                        to="/my-orders"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center px-4 py-2 hover:bg-orange-50"
                      >
                        <Package size={18} className="mr-2 text-orange-500" />
                        My Orders
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setIsProfileOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-red-50"
                      >
                        <LogOut size={18} className="mr-2" />
                        Logout
                      </button>

                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full shadow transition"
                >
                  Login
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 flex flex-col gap-4 text-gray-700 font-medium">

            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Home size={18} /> Home
            </Link>

            <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Utensils size={18} /> Menu
            </Link>

            <Link to="/book-table" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Calendar size={18} /> Book Table
            </Link>

            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2">
              <Phone size={18} /> Contact
            </Link>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
