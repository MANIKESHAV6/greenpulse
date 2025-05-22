import { useState, useEffect } from "react";
import { ProductCard } from "../components/marketplace/ProductCard";
import { ProductFilters } from "../components/marketplace/ProductFilters";
import { ProductSearch } from "../components/marketplace/ProductSearch";
import { FilterState, Product } from "../types/product";
import { mockProducts } from "../data/mockProducts";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Marketplace() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    priceRange: {
      min: 0,
      max: Math.max(...products.map((p) => p.price)),
    },
    searchQuery: "",
    sortBy: "rating",
  });

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Load cart count from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(cart.length);

    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
  };

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...products];

      if (filters.category !== "All") {
        filtered = filtered.filter((p) => p.category === filters.category);
      }

      filtered = filtered.filter(
        (p) => p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
      );

      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }

      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case "price_asc":
            return a.price - b.price;
          case "price_desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "eco_score":
            return b.ecoScore - a.ecoScore;
          default:
            return 0;
        }
      });

      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, products]);

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="relative mb-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-foreground dark:text-foreground-dark"
          >
            Marketplace
          </motion.h1>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs">
                {cartCount}
              </span>
            )}
          </motion.div>
        </div>

        <div className="mb-8">
          <ProductSearch
            onSearch={(query) =>
              setFilters((prev) => ({ ...prev, searchQuery: query }))
            }
            initialQuery={filters.searchQuery}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <ProductFilters
              filters={filters}
              onFilterChange={setFilters}
              maxPrice={Math.max(...products.map((p) => p.price))}
            />
          </div>

          <div className="lg:col-span-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-card dark:bg-card-dark rounded-lg shadow-lg overflow-hidden animate-pulse"
                  >
                    <div className="aspect-square bg-muted"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-6 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-2/3"></div>
                      <div className="h-10 bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground"
              >
                No products found matching your criteria.
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 