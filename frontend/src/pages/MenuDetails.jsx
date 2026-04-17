import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ArrowLeft, CheckCircle, ShoppingCart, XCircle } from "lucide-react";

const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart } = useContext(AppContext);
  const menu = menus.find((item) => item._id === id);

  if (!menu) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Menu not found
          </h2>
          <button
            onClick={() => navigate("/menu")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full"
          >
            Back to menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.eyJYug3GN7crLaJDCee_4AHaE8?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3')",
      }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative z-10">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to menu
          </button>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-2 gap-10">
          
          {/* Image */}
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-white/70 backdrop-blur-md">
            <img
              src={menu.image}
              alt={menu.name}
              className="w-full h-[400px] object-cover"
            />

            {/* Badge */}
            <div className="absolute top-6 right-6">
              {menu.isAvailable ? (
                <div className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <CheckCircle className="w-5 h-5" />
                  Available
                </div>
              ) : (
                <div className="bg-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                  <XCircle className="w-5 h-5" />
                  Unavailable
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {menu.name}
              </h1>
              <p className="text-orange-500 text-3xl font-semibold mt-2">
                ₹{menu.price}
              </p>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-5 shadow-md">
              <h3 className="font-semibold text-gray-800 mb-2">
                Description
              </h3>
              <p className="text-gray-600">{menu.description}</p>
            </div>

            {/* Cart Box */}
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 rounded-2xl p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <span className="text-white font-semibold">
                  Total Amount
                </span>
                <span className="text-white text-2xl font-bold">
                  ₹{menu.price}
                </span>
              </div>

              <button
                disabled={!menu.isAvailable}
                onClick={() => addToCart(menu._id)}
                className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition ${
                  menu.isAvailable
                    ? "bg-white text-orange-500 hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {menu.isAvailable ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuDetails;
