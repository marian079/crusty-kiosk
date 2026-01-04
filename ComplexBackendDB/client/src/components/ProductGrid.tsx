import { ProductCard } from "./ProductCard";
import type { Product } from "@shared/schema";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onAddToCart: (product: Product) => void;
}

export function ProductGrid({ products, isLoading, onAddToCart }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[4/3] bg-muted rounded-t-lg mb-4" />
            <div className="h-6 bg-muted rounded mb-2 w-3/4" />
            <div className="h-4 bg-muted rounded mb-2 w-full" />
            <div className="h-8 bg-muted rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-8xl mb-6">🍽️</div>
        <h3 className="text-2xl font-semibold mb-2">Nu s-au găsit produse</h3>
        <p className="text-lg text-muted-foreground">
          Încearcă o altă categorie sau vizualizează toate produsele
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="grid-products">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
