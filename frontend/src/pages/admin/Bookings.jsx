import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-hot-toast";

const Bookings = () => {
  const { admin, axios, loading, setLoading } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/booking/bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.put(
        `/api/booking/update-status/${bookingId}`,
        { status: newStatus }
      );

      if (data.success) {
        toast.success(data.message);
        fetchBookings();
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
    if (admin) fetchBookings();
  }, [admin, fetchBookings]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative py-12 px-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/blurred-coffee-shop-restaurant-with-bokeh-coloful-night-lights-background_63313-2076.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          📅 Table Bookings
        </h1>

        {/* BOOKINGS */}
        <div className="space-y-6">
          {bookings.length === 0 ? (
            <p className="text-center text-gray-300">No bookings found</p>
          ) : (
            bookings.map((item) => (
              <div
                key={item._id}
                className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                {/* TOP */}
                <div className="flex flex-col md:flex-row md:justify-between gap-4">
                  
                  {/* LEFT INFO */}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      📞 {item?.phone}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div className="flex items-center gap-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        handleStatusChange(item._id, e.target.value)
                      }
                      disabled={loading}
                      className="px-3 py-2 rounded-lg border focus:ring-2 focus:ring-orange-400 outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* DETAILS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                  
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500">Guests</p>
                    <p className="font-semibold text-gray-800">
                      {item?.numberOfPeople}
                    </p>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-semibold text-gray-800">
                      {new Date(item?.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-semibold text-gray-800">
                      {item?.time}
                    </p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-3 text-center">
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-gray-800">
                      {item?.status}
                    </p>
                  </div>
                </div>

                {/* NOTE */}
                {item?.note && (
                  <div className="mt-4 bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
                    📝 {item.note}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
