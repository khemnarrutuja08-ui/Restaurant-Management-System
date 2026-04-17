import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { X } from "lucide-react";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, totalPrice, navigate, axios, fetchCartData } =
    useContext(AppContext);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/mans-hand-holding-shopping-cart-icon-consumer-society-shopaholism-concept-shopping_1071931-40024.jpg')",
        }}
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-md"></div>

        {/* Big Text */}
        <h2 className="relative z-10 text-4xl sm:text-5xl font-bold text-gray-800 text-center drop-shadow-md">
          🛒 Your Cart is Empty
        </h2>
      </div>
    );
  }

  const removeFromCart = async (menuId) => {
    try {
      const { data } = await axios.delete(`/api/cart/remove/${menuId}`);
      if (data.success) {
        toast.success(data.message);
        fetchCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative py-12 px-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/mans-hand-holding-shopping-cart-icon-consumer-society-shopaholism-concept-shopping_1071931-40024.jpg')",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/50 backdrop-blur-md"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Card */}
        <div className="bg-white/85 backdrop-blur-lg shadow-2xl rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            🛒 Your Cart
          </h2>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg overflow-hidden">
              <thead className="bg-orange-100">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700">Item</th>
                  <th className="py-3 px-4 text-center text-gray-700">Qty</th>
                  <th className="py-3 px-4 text-center text-gray-700">Price</th>
                  <th className="py-3 px-4 text-center text-gray-700">Total</th>
                  <th className="py-3 px-4 text-center text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cart.items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-orange-50 transition"
                  >
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-12 h-12 rounded-lg object-cover shadow"
                      />
                      <span className="font-medium text-gray-800">
                        {item.menuItem.name}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center text-gray-700">
                      {item.quantity}
                    </td>

                    <td className="py-3 px-4 text-center text-gray-700">
                      ₹{item.menuItem.price}
                    </td>

                    <td className="py-3 px-4 text-center font-semibold text-gray-800">
                      ₹{item.menuItem.price * item.quantity}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() =>
                          removeFromCart(item.menuItem._id)
                        }
                        className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition"
                      >
                        <X className="text-red-500 w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Total:{" "}
              <span className="text-orange-500 font-bold">
                ₹{totalPrice}
              </span>
            </h3>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition shadow"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
