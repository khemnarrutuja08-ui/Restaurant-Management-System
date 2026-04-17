import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const BookTable = () => {
  const { axios, navigate } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/booking/create", formData);
      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative max-w-3xl w-full bg-black/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-gray-700">
        
        <h2 className="text-3xl font-bold text-center mb-6 text-green-400">
          Book a Table
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="number"
              name="numberOfPeople"
              value={formData.numberOfPeople}
              onChange={handleChange}
              placeholder="Number of Guests"
              min="1"
              className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none"
              required
            />
          </div>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Special Requests (optional)"
            rows="3"
            className="border border-gray-600 rounded-xl p-3 w-full bg-gray-800/80 text-white placeholder-gray-400 focus:border-green-400 focus:ring-2 focus:ring-green-500 outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-green-500 text-black py-3 rounded-xl hover:bg-green-600 font-semibold shadow-lg"
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
};

export default BookTable;
