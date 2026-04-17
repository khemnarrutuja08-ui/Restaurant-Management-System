import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShoppingCart } from "lucide-react";

const MenuCard = ({ menu }) => {
  const { navigate, addToCart } = useContext(AppContext);

  return (
    <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      
      {/* Image */}
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-52 overflow-hidden cursor-pointer"
      >
        <img
          src={menu.image}
          alt={menu.name}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
        />

        {!menu.isAvailable && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Unavailable
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
          {menu.name}
        </h3>

        {/* ✅ Category show */}
        <p className="text-xs text-gray-400 mb-1">
          {menu?.category?.name}
        </p>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {menu.description}
        </p>

        {/* Price + Button */}
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-gray-900">
            ₹{menu.price}
          </p>

          <button
            onClick={() => addToCart(menu._id)}
            disabled={!menu.isAvailable}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition ${
              menu.isAvailable
                ? "bg-orange-500 hover:bg-orange-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
