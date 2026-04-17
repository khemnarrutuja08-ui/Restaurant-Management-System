import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { axios } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/booking/my-bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  }, [axios]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div
      className="min-h-screen bg-cover bg-center relative py-12 px-4"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/002/229/668/small_2x/abstract-blur-restaurant-free-photo.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white tracking-wide">
          🍽️ My Bookings
        </h2>

        <div className="space-y-6">
          {bookings.length === 0 && (
            <p className="text-center text-gray-300">
              No bookings found 😔
            </p>
          )}

          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-[#3b2f2f]/70 backdrop-blur-lg border border-[#ffffff20] 
              rounded-2xl p-6 shadow-xl hover:scale-[1.02] 
              hover:bg-[#4a3838]/80 transition duration-300"
            >
              {/* Top */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {booking.name}
                </h3>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    booking.status === "Pending"
                      ? "bg-yellow-400/20 text-yellow-300"
                      : booking.status === "Approved"
                      ? "bg-green-400/20 text-green-300"
                      : "bg-red-400/20 text-red-300"
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              {/* Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-200">
                <p>
                  <span className="font-medium text-white">📞 Phone:</span>{" "}
                  {booking.phone}
                </p>
                <p>
                  <span className="font-medium text-white">📅 Date:</span>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium text-white">⏰ Time:</span>{" "}
                  {booking.time}
                </p>
                <p>
                  <span className="font-medium text-white">👥 Guests:</span>{" "}
                  {booking.numberOfPeople}
                </p>
              </div>

              {/* Note */}
              {booking.note && (
                <div className="mt-3 text-gray-200">
                  <span className="font-medium text-white">📝 Note:</span>{" "}
                  {booking.note}
                </div>
              )}

              {/* Footer */}
              <div className="mt-4 text-gray-300 text-sm">
                Booked on:{" "}
                {new Date(booking.createdAt).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
