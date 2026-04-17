import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const AdminLogin = () => {
  const { navigate, loading, setLoading, axios, setAdmin } =
    useContext(AppContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/auth/admin/login",
        formData
      );

      if (data.success) {
        localStorage.setItem("admin", "true"); // ✅ FIXED
        setAdmin(true);
        toast.success(data.message);
        navigate("/admin");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[350px] text-center">
        <h1 className="text-3xl mb-4">Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChangeHandler}
          className="w-full p-2 border mb-3"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={onChangeHandler}
          className="w-full p-2 border mb-3"
          required
        />

        <button className="w-full bg-orange-500 text-white p-2">
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
