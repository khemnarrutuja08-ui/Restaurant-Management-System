import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCard from "./MenuCard";

const Menus = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  // 🔥 Search (Name + Category + Description)
  const filteredMenus = useMemo(() => {
    if (!searchQuery) return menus;

    return menus.filter((menu) => {
      const query = searchQuery.toLowerCase();

      return (
        menu.name.toLowerCase().includes(query) ||
        menu.description.toLowerCase().includes(query) ||
        menu?.category?.name?.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, menus]);

  const handleClearSearch = () => setSearchQuery("");

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-orange-50 via-yellow-50 to-pink-50">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Our <span className="text-orange-500">Menu</span>
        </h1>
        <p className="text-gray-600">
          Discover delicious food from every category 🍽️
        </p>
      </div>

      {/* Search */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative bg-white rounded-full shadow-md border">
          
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Search by dish or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 rounded-full outline-none"
          />

          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <X />
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      <p className="text-center text-gray-600 mb-6">
        Showing{" "}
        <span className="font-semibold text-orange-500">
          {filteredMenus.length}
        </span>{" "}
        items
      </p>

      {/* Grid */}
      {filteredMenus.length > 0 ? (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMenus.map((menu) => (
            <MenuCard key={menu._id} menu={menu} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500 mb-4">No results found 😔</p>
          <button
            onClick={handleClearSearch}
            className="px-5 py-2 bg-orange-500 text-white rounded-full"
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Menus;
