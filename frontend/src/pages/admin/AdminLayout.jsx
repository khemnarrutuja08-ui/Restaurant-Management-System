import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  LayoutDashboard,
  Plus,
  Package,
  Grid3X3,
  ShoppingCart,
  BookAIcon,
  X,
  Menu,
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const AdminLayout = () => {
  const { setAdmin, navigate, axios } = useContext(AppContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: LayoutDashboard, exact: true },
    { path: "/admin/add-category", name: "Add Category", icon: Plus },
    { path: "/admin/add-menu", name: "Add Menu", icon: Package },
    { path: "/admin/categories", name: "All Categories", icon: Grid3X3 },
    { path: "/admin/menus", name: "All Menus", icon: Grid3X3 },
    { path: "/admin/orders", name: "Orders", icon: ShoppingCart },
    { path: "/admin/bookings", name: "Bookings", icon: BookAIcon },
  ];

  const isActive = (path, exact = false) => {
    return exact
      ? location.pathname === path
      : location.pathname === path;
  };

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setAdmin(false);
        localStorage.removeItem("admin");
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 🌈 BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100"></div>

      {/* Mobile Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-lg"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 backdrop-blur-xl bg-white/70 shadow-xl transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 text-white font-bold text-lg bg-gradient-to-r from-orange-400 to-pink-500">
            Admin Panel
          </div>

          {/* MENU */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    active
                      ? "bg-gradient-to-r from-orange-400 to-pink-400 text-white shadow-md"
                      : "text-gray-700 hover:bg-white/60 hover:shadow-sm"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* USER */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY MOBILE */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
        ></div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* TOPBAR */}
        <header className="backdrop-blur-md bg-white/60 border-b border-white/40 shadow-sm pl-16 lg:pl-6">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => isActive(item.path, item.exact))
                ?.name || "Admin Panel"}
            </h2>

            <button
              onClick={logout}
              className="text-red-500 font-semibold hover:underline"
            >
              Logout
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
