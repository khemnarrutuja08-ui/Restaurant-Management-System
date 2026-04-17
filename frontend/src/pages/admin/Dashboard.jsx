import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { admin, axios, categories, menus, fetchCategories, fetchMenus } =
    useContext(AppContext);

  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchDashboardData = useCallback(async () => {
    if (!admin) return;
    try {
      const [{ data: orderData }, { data: bookingData }] = await Promise.all([
        axios.get("/api/order/orders"),
        axios.get("/api/booking/bookings"),
      ]);

      if (orderData?.success) setOrders(orderData.orders || []);
      if (bookingData?.success) setBookings(bookingData.bookings || []);
    } catch (error) {
      console.log(error);
    }
  }, [admin, axios]);

  useEffect(() => {
    if (!admin) return;
    fetchCategories();
    fetchMenus();
    fetchDashboardData();
  }, [admin, fetchCategories, fetchMenus, fetchDashboardData]);

  const orderRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
    [orders]
  );

  const pendingOrders = useMemo(
    () => orders.filter((item) => item.status === "Pending").length,
    [orders]
  );

  const pendingBookings = useMemo(
    () => bookings.filter((item) => item.status === "Pending").length,
    [bookings]
  );

  const recentOrders = orders.slice(0, 5);
  const recentBookings = bookings.slice(0, 5);

  const cards = [
    { label: "Total Categories", value: categories.length },
    { label: "Total Menus", value: menus.length },
    { label: "Total Orders", value: orders.length },
    { label: "Pending Orders", value: pendingOrders },
    { label: "Total Bookings", value: bookings.length },
    { label: "Pending Bookings", value: pendingBookings },
    { label: "Revenue", value: `₹${orderRevenue}` },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center relative p-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/blurred-coffee-shop-restaurant-with-bokeh-coloful-night-lights-background_63313-2076.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Dashboard
        </h1>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div
              key={card.label}
              className="bg-white/90 rounded-xl p-5 shadow-lg hover:shadow-2xl transition"
            >
              <p className="text-sm text-gray-500">{card.label}</p>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* TABLES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          
          {/* Orders */}
          <div className="bg-white/90 rounded-xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Recent Orders
            </h2>

            {recentOrders.length === 0 ? (
              <p className="text-gray-500">No orders yet</p>
            ) : (
              <ul className="space-y-3">
                {recentOrders.map((order) => (
                  <li key={order._id} className="flex justify-between text-gray-700">
                    <span>{order.user?.name || "User"}</span>
                    <span className="font-semibold text-green-600">
                      ₹{order.totalAmount}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Bookings */}
          <div className="bg-white/90 rounded-xl p-5 shadow-lg">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Recent Bookings
            </h2>

            {recentBookings.length === 0 ? (
              <p className="text-gray-500">No bookings yet</p>
            ) : (
              <ul className="space-y-3">
                {recentBookings.map((booking) => (
                  <li key={booking._id} className="flex justify-between text-gray-700">
                    <span>{booking.name}</span>
                    <span
                      className={`text-sm px-2 py-1 rounded-full ${
                        booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
