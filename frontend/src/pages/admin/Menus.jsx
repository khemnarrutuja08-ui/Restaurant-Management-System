import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Menus = () => {
  const { menus, fetchMenus, axios } = useContext(AppContext);

  const deleteMenu = async (id) => {
    try {
      const { data } = await axios.delete(`/api/menu/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchMenus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative py-10 px-4"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-photo/blurred-coffee-shop-restaurant-with-bokeh-coloful-night-lights-background_63313-2076.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          🍽️ All Menus
        </h1>

        {/* TABLE CONTAINER */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          
          {/* HEADER */}
          <div className="grid grid-cols-5 font-semibold text-gray-700 border-b pb-3 mb-4 text-center">
            <div>Image</div>
            <div>Name</div>
            <div>Category</div>
            <div>Price</div>
            <div>Action</div>
          </div>

          {/* DATA */}
          <div className="space-y-4">
            {menus.length === 0 ? (
              <p className="text-center text-gray-500">
                No menus found
              </p>
            ) : (
              menus.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-5 items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center"
                >
                  {/* IMAGE */}
                  <div className="flex justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </div>

                  {/* NAME */}
                  <p className="text-gray-800 font-medium">
                    {item?.name}
                  </p>

                  {/* CATEGORY */}
                  <p className="text-gray-600">
                    {item?.category?.name}
                  </p>

                  {/* PRICE */}
                  <p className="font-semibold text-green-600">
                    ₹{item.price}
                  </p>

                  {/* DELETE */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => deleteMenu(item._id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-500 text-red-600 hover:text-white transition"
                    >
                      <CircleX size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
