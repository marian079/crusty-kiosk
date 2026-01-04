import { ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onCartClick: () => void;
}

export function Header({ cartCount, cartTotal, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-md">
      <div className="flex h-20 items-center justify-between px-6 md:px-8">
        <div className="flex items-center gap-3">
          <UtensilsCrossed className="h-10 w-10 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-sans)]">
            Crusty Kiosk
          </h1>
        </div>
        
        <Button
          size="lg"
          variant="ghost"
          onClick={onCartClick}
          className="gap-3 px-6 hover-elevate active-elevate-2"
          data-testid="button-cart"
        >
          <div className="relative">
            <ShoppingCart className="h-7 w-7" />
            {cartCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -right-2 -top-2 h-6 min-w-6 px-1.5 text-xs font-bold"
                data-testid="badge-cart-count"
              >
                {cartCount}
              </Badge>
            )}
          </div>
          <div className="text-left">
            <div className="text-xs text-muted-foreground">Total</div>
            <div className="text-xl font-bold" data-testid="text-cart-total">
              {cartTotal.toFixed(2)} LEI
            </div>
          </div>
        </Button>
      </div>
    </header>
  );
}
