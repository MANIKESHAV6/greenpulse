import { Product } from "../../types/product";
import { motion } from "framer-motion";
import { ShoppingCart, Leaf } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="bg-card dark:bg-card-dark rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-green-100 text-green-800 text-sm font-semibold px-2 py-0.5 rounded">
          {product.ecoScore}/5
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground dark:text-foreground-dark line-clamp-1">
            {product.title}
          </h3>
          <span className="text-sm bg-primary/10 text-primary px-2 py-1 rounded">
            {product.energyEfficiencyRating}
          </span>
        </div>

        <p className="text-muted-foreground dark:text-muted-foreground-dark text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-bold text-foreground dark:text-foreground-dark">
            {formatPrice(product.price)}
          </span>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(Math.floor(product.rating))].map((_, i) => (
                <Leaf
                  key={i}
                  className="w-4 h-4 text-green-400 fill-green-400"
                  aria-label={`Rating ${product.rating} out of 5`}
                />
              ))}
              {product.rating % 1 > 0 && (
                <Leaf
                  className="w-4 h-4 text-green-400/50 fill-green-400/50"
                  aria-label="Half rating"
                />
              )}
            </div>
            <span className="text-sm text-muted-foreground dark:text-muted-foreground-dark">
              {product.rating}
            </span>
          </div>
        </div>

        <motion.button
          onClick={() => onAddToCart(product)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-colors duration-200"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
