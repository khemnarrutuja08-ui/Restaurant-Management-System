import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Orders = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/order/orders");
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success(data.message);
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) fetchOrders();
  }, [admin, fetchOrders]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative py-12 px-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/blurred-coffee-shop-restaurant-with-bokeh-coloful-night-lights-background_63313-2076.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          📦 All Orders
        </h1>

        {/* Orders */}
        <div className="space-y-6">
          {orders.length === 0 ? (
            <p className="text-center text-gray-300">No orders found</p>
          ) : (
            orders.map((item) => (
              <div
                key={item._id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 hover:shadow-2xl transition"
              >
                {/* TOP SECTION */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                  
                  <div>
                    <p className="text-lg font-semibold text-gray-800">
                      {item?.user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item?.address}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 items-center">
                    <p className="text-green-600 font-semibold text-lg">
                      ₹{item?.totalAmount}
                    </p>

                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {item.paymentMethod}
                    </span>

                    {/* STATUS */}
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      disabled={loading}
                      className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>

                {/* ITEMS */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {item.items.map((menu, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition"
                    >
                      <img
                        src={menu?.menuItem?.image}
                        alt={menu?.menuItem?.name}
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {menu?.menuItem?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Qty: {menu?.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          ₹{menu?.menuItem?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
