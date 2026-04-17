import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LockIcon, MailIcon, User2Icon } from "lucide-react";
import { toast } from "react-hot-toast";
import { AppContext } from "../context/AppContext";

const Signup = () => {
  const { navigate, axios, loading, setLoading } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
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
      const { data } = await axios.post("/api/auth/register", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/012/811/592/small_2x/restaurant-cafe-or-coffee-shop-interior-with-customer-blur-abstract-vintage-style-bokeh-light-for-montage-product-display-background-photo.jpg')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full sm:w-[380px] text-center rounded-2xl px-8 py-6 
        bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl"
      >
        <h1 className="text-white text-3xl mt-4 font-semibold">
          Create Account
        </h1>
        <p className="text-gray-300 text-sm mt-2 pb-4">
          Please sign up to continue
        </p>

        {/* Name */}
        <div className="flex items-center mt-4 bg-white/20 border border-white/30 h-12 rounded-full px-4 gap-2 focus-within:ring-2 ring-orange-400">
          <User2Icon className="text-orange-400" />
          <input
            type="text"
            placeholder="Full Name"
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center mt-4 bg-white/20 border border-white/30 h-12 rounded-full px-4 gap-2 focus-within:ring-2 ring-orange-400">
          <MailIcon className="text-orange-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 bg-white/20 border border-white/30 h-12 rounded-full px-4 gap-2 focus-within:ring-2 ring-orange-400">
          <LockIcon className="text-orange-400" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-white placeholder-gray-300 outline-none w-full"
            name="password"
            value={formData.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full text-white bg-orange-500 hover:bg-orange-600 transition duration-300 shadow-lg"
        >
          {loading ? "Loading..." : "Register"}
        </button>

        <p className="text-gray-300 text-sm mt-4">
          Already have an account?
          <Link to="/login" className="text-orange-400 ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
