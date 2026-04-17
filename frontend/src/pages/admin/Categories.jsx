import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { CircleX } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
  const { categories, fetchCategories, axios } = useContext(AppContext);

  const deleteCategory = async (id) => {
    try {
      const { data } = await axios.delete(`/api/category/delete/${id}`);
      if (data.success) {
        toast.success(data.message);
        fetchCategories();
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

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          📂 All Categories
        </h1>

        {/* TABLE CONTAINER */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
          
          {/* HEADER */}
          <div className="grid grid-cols-3 font-semibold text-gray-700 border-b pb-3 mb-4">
            <div>Image</div>
            <div>Name</div>
            <div className="text-center">Action</div>
          </div>

          {/* DATA */}
          <div className="space-y-4">
            {categories.length === 0 ? (
              <p className="text-center text-gray-500">
                No categories found
              </p>
            ) : (
              categories.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-3 items-center bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition"
                >
                  {/* IMAGE */}
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  </div>

                  {/* NAME */}
                  <p className="text-gray-800 font-medium">
                    {item.name}
                  </p>

                  {/* DELETE BUTTON */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => deleteCategory(item._id)}
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

export default Categories;
