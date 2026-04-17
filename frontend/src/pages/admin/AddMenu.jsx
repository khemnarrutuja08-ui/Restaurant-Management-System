import { Upload, X } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { useState, useContext } from "react";
import toast from "react-hot-toast";

const AddMenu = () => {
  const {
    axios,
    navigate,
    loading,
    setLoading,
    categories,
    fetchMenus,
  } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
    setFormData({ ...formData, image: selectedFile });
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    setFormData({ ...formData, image: null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = new FormData();
      payload.append("name", formData.name.trim());
      payload.append("price", formData.price);
      payload.append("description", formData.description.trim());
      payload.append("category", formData.category);
      payload.append("image", formData.image);

      const { data } = await axios.post("/api/menu/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        await fetchMenus();
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          image: null,
        });
        setFile(null);
        setPreview(null);
        toast.success(data.message);
        navigate("/admin/menus");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative px-4"
      style={{
        backgroundImage:
          "url('https://th.bing.com/th/id/OIP.26hhFulsRRBBJcntmGn7hQHaE7?w=248&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          🍽️ Add Menu
        </h2>

        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="relative group">
            <img
              src={preview}
              alt="preview"
              className="w-full h-44 object-cover rounded-xl shadow-md"
            />

            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl flex items-center justify-center transition">
              <button
                type="button"
                onClick={removeImage}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* NAME */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Menu Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter menu name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
          />
        </div>

        {/* PRICE + CATEGORY */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Price *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            >
              <option value="">Select category</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Description *
          </label>
          <textarea
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none resize-none"
          ></textarea>
        </div>

        {/* COMPACT UPLOAD BOX */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Upload Image *
          </label>

          <input
            type="file"
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
            required={!file}
          />

          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-full h-28 
            rounded-lg border-2 border-dashed border-gray-300 
            bg-gradient-to-br from-orange-50 to-white 
            hover:border-orange-400 hover:shadow-md 
            cursor-pointer transition"
          >
            <Upload className="w-7 h-7 text-orange-400 mb-1" />
            <p className="text-gray-600 text-xs font-medium text-center">
              {file ? file.name : "Click or upload image"}
            </p>
          </label>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] text-white py-3 rounded-xl font-semibold transition shadow-lg"
        >
          {loading ? "Adding..." : "Add Menu"}
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
