import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export const AppContext = createContext();

// BASE URL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(localStorage.getItem("admin") === "true");
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);

  // ================= CART =================
  const fetchCartData = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/cart/get");

      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.log("Cart error:", error);
    }
  }, []);

  // ================= TOTAL PRICE =================
  const totalPrice = useMemo(
    () =>
      cart?.items?.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      ) || 0,
    [cart]
  );

  const cartCount =
    cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  // ================= ADD TO CART =================
  const addToCart = async (menuId) => {
    try {
      const { data } = await axios.post("/api/cart/add", {
        menuId,
        quantity: 1,
      });

      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("Add to cart error:", error);
      toast.error("Something went wrong!");
    }
  };

  // ================= CATEGORIES =================
  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/category/all");

      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  }, []);

  // ================= MENUS =================
  const fetchMenus = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/menu/all");

      if (data.success) {
        setMenus(data.menuItems);
      }
    } catch (error) {
      console.log("Error fetching menus:", error);
    }
  }, []);

  // ================= AUTH CHECK (FIXED) =================
  const isAuth = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/auth/profile");

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth error:", error);
      setUser(null);
    }
  }, []);

  const verifyAdminAuth = useCallback(async () => {
    if (!localStorage.getItem("admin")) return;
    try {
      const { data } = await axios.get("/api/auth/admin/me");
      if (data.success) {
        setAdmin(true);
      }
    } catch {
      localStorage.removeItem("admin");
      setAdmin(false);
    }
  }, []);

  // ================= INITIAL LOAD =================
  useEffect(() => {
    const bootstrap = async () => {
      await Promise.all([
        isAuth(),
        fetchCategories(),
        fetchMenus(),
        fetchCartData(),
        verifyAdminAuth(),
      ]);
    };
    bootstrap();
  }, [isAuth, fetchCategories, fetchMenus, fetchCartData, verifyAdminAuth]);

  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    admin,
    setAdmin,
    categories,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    cartCount,
    cart,
    totalPrice,
    fetchCartData,
    axios,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
