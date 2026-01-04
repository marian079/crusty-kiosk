import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@shared/schema";

interface CartSidebarProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
}

export function CartSidebar({
  isOpen,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
}: CartSidebarProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          data-testid="overlay-cart"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-card border-l shadow-2xl z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        data-testid="sidebar-cart"
      >
        {/* Header */}
        <div className="sticky top-0 p-6 border-b bg-card z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Coșul Tău</h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={onClose}
              data-testid="button-close-cart"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          {items.length > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={onClearCart}
              className="w-full"
              data-testid="button-clear-cart"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Golește Coșul
            </Button>
          )}
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingCart className="h-24 w-24 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Coșul tău este gol</h3>
            <p className="text-muted-foreground">
              Adaugă produse delicioase pentru a începe comanda
            </p>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-4 rounded-lg bg-muted/30"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    <div className="w-16 h-16 rounded-lg bg-card flex items-center justify-center text-3xl shrink-0">
                      {item.product.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold line-clamp-1 mb-1">
                        {item.product.name}
                      </h4>
                      <div className="text-lg font-bold text-primary mb-2">
                        {parseFloat(item.product.price).toFixed(2)} LEI
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          data-testid={`button-decrease-${item.product.id}`}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold w-8 text-center" data-testid={`text-quantity-${item.product.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          data-testid={`button-increase-${item.product.id}`}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onRemoveItem(item.product.id)}
                          data-testid={`button-remove-${item.product.id}`}
                          className="ml-auto text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Footer */}
            <div className="sticky bottom-0 p-6 border-t bg-card space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">{subtotal.toFixed(2)} LEI</span>
                </div>
                <Separator />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary" data-testid="text-total">{subtotal.toFixed(2)} LEI</span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full py-6 text-xl font-semibold rounded-xl"
                onClick={onCheckout}
                data-testid="button-checkout"
              >
                Finalizează Comanda
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
