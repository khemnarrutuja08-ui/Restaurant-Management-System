import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyOrders = () => {
  const { axios } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchMyOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/order/my-orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative py-12 px-4"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/001/485/094/non_2x/blurred-restaurant-background-free-photo.jpg')",
      }}
    >
      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          🧾 My Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">
            You have no orders yet 😔
          </p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white/85 backdrop-blur-md border border-gray-200 
                rounded-xl p-6 shadow-lg hover:shadow-2xl 
                hover:-translate-y-1 transition duration-300"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-md font-semibold text-gray-800">
                    Order ID:{" "}
                    <span className="text-orange-500">
                      {order._id.slice(-6)}
                    </span>
                  </h3>

                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Preparing"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
                  <p>
                    <span className="font-medium">📍 Address:</span>{" "}
                    {order.address}
                  </p>
                  <p>
                    <span className="font-medium">💳 Payment:</span>{" "}
                    {order.paymentMethod}
                  </p>
                  <p>
                    <span className="font-medium">💰 Total:</span> ₹
                    {order.totalAmount}
                  </p>
                  <p>
                    <span className="font-medium">📅 Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Items */}
                <div className="mt-3 text-gray-600 text-sm">
                  <span className="font-medium">🛒 Items:</span>{" "}
                  {order.items.length} product(s)
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
