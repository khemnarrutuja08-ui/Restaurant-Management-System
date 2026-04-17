import { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Search, X } from "lucide-react";
import MenuCard from "../components/MenuCard";

const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMenus = useMemo(() => {
    if (!searchQuery) return menus;
    return menus.filter((menu) =>
      menu.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, menus]);

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div
      className="min-h-screen py-12 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
      }}
    >
      {/* Blur + Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <div className="relative container mx-auto px-4">
        {/* Header Section */}

        <div>
          <h1>
            Our <span className="text-yellow-500">Menu</span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for your favorite dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-300 bg-white text-gray-700 placeholder-gray-400 focus:border-yellow-500 focus:outline-none shadow-md"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-300 text-center">
            {searchQuery ? (
              <>
                Found{" "}
                <span className="font-semibold text-yellow-400">
                  {filteredMenus.length}
                </span>
                {filteredMenus.length === 1 ? " result" : " results"} for{" "}
                {searchQuery}
              </>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-yellow-400">
                  {filteredMenus.length}
                </span>{" "}
                {filteredMenus.length === 1 ? "dish" : "dishes"}
              </>
            )}
          </p>
        </div>

        {/* Menu Grid */}
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMenus.map((menu) => (
              <MenuCard menu={menu} key={menu._id} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-300">
              No results found for "{searchQuery}"
            </p>
            <button
              onClick={handleClearSearch}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-semibold"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
