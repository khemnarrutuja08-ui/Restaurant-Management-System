import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const { totalPrice, axios, navigate } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Pay at hotel");

  const handleCheckout = async () => {
    if (!address) {
      toast.error("Please enter your address");
      return;
    }
    try {
      const { data } = await axios.post("/api/order/place", {
        address,
        paymentMethod,
      });
      if (data.success) {
        toast.success(data.message);
        navigate("/my-orders");
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
      className="min-h-screen bg-cover bg-center relative flex items-center justify-center px-4 py-10"
      style={{
        backgroundImage:
          "url('https://tse1.mm.bing.net/th/id/OIP.g5WMqko3kxhLDmOGup15HwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md"></div>

      {/* Main Card */}
      <div className="relative z-10 max-w-5xl w-full grid md:grid-cols-2 gap-8 p-8 bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl">
        
        {/* LEFT - Address */}
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📍 Delivery Address
          </h2>

          <textarea
            rows={5}
            value={address}
            placeholder="Enter your full address..."
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-400 focus:outline-none resize-none bg-white/90"
          ></textarea>
        </div>

        {/* RIGHT - Summary */}
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🧾 Order Summary
            </h2>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4 shadow-sm">
              <p className="flex justify-between text-lg font-medium text-gray-700">
                <span>Total Amount:</span>
                <span className="text-orange-500 font-bold">
                  ₹{totalPrice}
                </span>
              </p>
            </div>

            {/* Payment */}
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              💳 Payment Method
            </h3>

            <div className="space-y-3">
              <label className="flex items-center gap-3 bg-white/70 p-3 rounded-lg border hover:bg-orange-50 transition cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Pay at hotel"
                  checked={paymentMethod === "Pay at hotel"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Pay at hotel</span>
              </label>

              <label className="flex items-center gap-3 bg-white/70 p-3 rounded-lg border hover:bg-orange-50 transition cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="Online Payment"
                  checked={paymentMethod === "Online Payment"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Online Payment</span>
              </label>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={handleCheckout}
            className="mt-6 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition font-semibold shadow-lg"
          >
            Confirm Order 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
