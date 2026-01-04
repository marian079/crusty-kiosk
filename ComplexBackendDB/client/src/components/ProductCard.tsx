import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card
      className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
      data-testid={`card-product-${product.id}`}
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden flex items-center justify-center">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Package className="h-20 w-20 text-primary/30" />
        )}
      </div>
      <CardContent className="p-6">
        <h3
          className="text-xl font-semibold line-clamp-2 mb-2"
          data-testid={`text-product-name-${product.id}`}
        >
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
          {product.description}
        </p>
        <div
          className="text-2xl font-bold text-primary"
          data-testid={`text-product-price-${product.id}`}
        >
          {parseFloat(product.price).toFixed(2)} LEI
        </div>
      </CardContent>
      <CardFooter className="p-3 sm:p-6 pt-0">
        <Button
          size="lg"
          className="w-full py-4 sm:py-6 text-sm sm:text-lg font-semibold rounded-xl gap-2 h-auto whitespace-normal sm:whitespace-nowrap"
          onClick={() => onAddToCart(product)}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <Plus className="h-4 w-4 sm:h-5 sm:u-5 shrink-0" />
          <span className="text-center">Adaugă în Coș</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
