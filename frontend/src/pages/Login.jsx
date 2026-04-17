import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const { navigate, loading, setLoading, axios, setUser, setAdmin } =
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

      const { data } = await axios.post("/api/auth/login", formData);

      if (data.success) {
        if (data.user?.role === "admin") {
          setAdmin(true);
          localStorage.setItem("admin", "true");
          setUser(null);
          toast.success(data.message);
          navigate("/admin");
          return;
        }

        localStorage.removeItem("admin");
        setAdmin(false);
        setUser(data.user);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://tse2.mm.bing.net/th/id/OIP.ES9Sei38saHR04XLPbPygwHaE7?w=509&h=339&rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Login Box */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full sm:w-[380px] px-8 py-8 rounded-2xl 
        bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl text-center"
      >
        <h1 className="text-3xl font-semibold text-white">Welcome Back 👋</h1>
        <p className="text-gray-300 text-sm mt-2 mb-6">
          Login to your account
        </p>

        {/* Email */}
        <div className="flex items-center mt-3 bg-white/20 border border-white/30 h-12 rounded-full px-4 gap-2 focus-within:ring-2 ring-orange-400">
          <MailIcon className="text-orange-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            placeholder="Email Address"
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 bg-white/20 border border-white/30 h-12 rounded-full px-4 gap-2 focus-within:ring-2 ring-orange-400">
          <LockIcon className="text-orange-400" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            placeholder="Password"
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-6 w-full h-11 rounded-full bg-orange-500 hover:bg-orange-600 transition duration-300 text-white shadow-lg"
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Footer */}
        <p className="mt-4 text-gray-300 text-sm">
          Don’t have an account?
          <Link to="/signup" className="text-orange-400 ml-1">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
