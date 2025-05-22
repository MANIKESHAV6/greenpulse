import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/button";

interface ProductSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function ProductSearch({ onSearch, initialQuery = "" }: ProductSearchProps) {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search eco-friendly products..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-input bg-background dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow duration-200"
          />
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            type="submit"
            className="rounded-full px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Search
          </Button>
        </motion.div>
      </div>
    </motion.form>
  );
} 