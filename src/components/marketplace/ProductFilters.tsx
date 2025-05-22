import { FilterState, ProductCategory } from "../../types/product";
import { Slider } from "../ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  maxPrice: number;
}

export function ProductFilters({
  filters,
  onFilterChange,
  maxPrice,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categories: (ProductCategory | "All")[] = [
    "All",
    "Solar",
    "Smart Home",
    "Energy Storage",
    "LED Lighting",
    "Water Conservation",
    "Home Insulation",
    "EV Charging",
    "Smart Appliances",
  ];

  const sortOptions = [
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "rating", label: "Best Rated" },
    { value: "eco_score", label: "Eco Score" },
  ];

  return (
    <div className="space-y-6 p-4 bg-card dark:bg-card-dark rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Filters</h3>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-accent rounded-full transition-colors"
        >
          <MoreVertical className="w-5 h-5" />
        </motion.button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
          Price Range
        </label>
        <div className="pt-2">
          <Slider
            min={0}
            max={maxPrice}
            step={1000}
            value={[filters.priceRange.min, filters.priceRange.max]}
            onValueChange={([min, max]) =>
              onFilterChange({
                ...filters,
                priceRange: { min, max },
              })
            }
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>₹{filters.priceRange.min.toLocaleString('en-IN')}</span>
            <span>₹{filters.priceRange.max.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6 overflow-hidden"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                Category
              </label>
              <Select
                value={filters.category}
                onValueChange={(value: ProductCategory | "All") =>
                  onFilterChange({ ...filters, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground dark:text-foreground-dark">
                Sort By
              </label>
              <Select
                value={filters.sortBy}
                onValueChange={(value: FilterState["sortBy"]) =>
                  onFilterChange({ ...filters, sortBy: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select sorting" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 