import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Upload, X } from "lucide-react";
import { toast } from "react-hot-toast";

const AddCategory = () => {
  const { axios, navigate, loading, setLoading, fetchCategories } =
    useContext(AppContext);

  const [formData, setFormData] = useState({ name: "", image: null });
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
      payload.append("image", formData.image);

      const { data } = await axios.post("/api/category/add", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        await fetchCategories();
        setFormData({ name: "", image: null });
        setFile(null);
        setPreview(null);
        toast.success(data.message);
        navigate("/admin/categories");
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
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-7 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          ➕ Add Category
        </h2>

        {/* IMAGE PREVIEW */}
        {preview && (
          <div className="relative group">
            <img
              src={preview}
              alt="preview"
              className="w-full h-44 object-cover rounded-xl shadow-md"
            />

            {/* Overlay */}
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

        {/* NAME INPUT */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Category Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none transition"
          />
        </div>

        {/* MODERN UPLOAD BOX */}
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
            className="flex flex-col items-center justify-center w-full h-36 rounded-xl border-2 border-dashed border-gray-300 
            bg-gradient-to-br from-orange-50 to-white 
            hover:border-orange-400 hover:shadow-lg 
            cursor-pointer transition-all duration-300"
          >
            <Upload className="w-10 h-10 text-orange-400 mb-2" />
            <p className="text-gray-600 text-sm font-medium">
              {file ? file.name : "Click or Drag image here"}
            </p>
            <span className="text-xs text-gray-400 mt-1">
              PNG, JPG up to 5MB
            </span>
          </label>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:scale-[1.02] text-white py-3 rounded-xl font-semibold transition shadow-lg"
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
