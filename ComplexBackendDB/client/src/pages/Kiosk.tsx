import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ProductGrid } from "@/components/ProductGrid";
import { CartSidebar } from "@/components/CartSidebar";
import { CheckoutModal } from "@/components/CheckoutModal";
import { OrderConfirmationModal } from "@/components/OrderConfirmationModal";
import { useToast } from "@/hooks/use-toast";
import type { Product, Category, CartItem } from "@shared/schema";

export default function Kiosk() {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmationOrder, setConfirmationOrder] = useState<number | null>(null);

  // Fetch categories
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  // Fetch products with optional category filter
  const { data: products = [], isLoading: isLoadingProducts } = useQuery<Product[]>({
    queryKey: ["/api/products", selectedCategory],
    queryFn: async () => {
      const url = selectedCategory 
        ? `/api/products?categoryId=${selectedCategory}`
        : "/api/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    },
  });

// Place order mutation
const placeOrderMutation = useMutation({
  mutationFn: async (data: {
    customerName: string;
    paymentMethod: string;
  }) => {
    // MODIFICARE AICI: Trimitem un singur obiect "plat" conform schemei Zod
    const orderData = {
      customerName: data.customerName || null,
      paymentMethod: data.paymentMethod,
      total: cartTotal.toFixed(2),
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        productPrice: item.product.price,
        quantity: item.quantity,
      })),
    };

    const response = await apiRequest("POST", "/api/orders", orderData);
    return response.json();
  },
  onSuccess: (data) => {
    setIsCheckoutOpen(false);
    // Verifică dacă backend-ul returnează data.order sau doar data
    const orderNum = data.order?.orderNumber || data.orderNumber;
    setConfirmationOrder(orderNum);
    setCart([]);
    
    queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
    
    toast({
      title: "Comandă plasată",
      description: `Comanda #${orderNum} a fost plasată cu succes`,
    });
  },
    onError: (error: any) => {
      toast({
        title: "Eroare",
        description: error.message || "A apărut o eroare la plasarea comenzii",
        variant: "destructive",
      });
    },
  });

  // Calculate cart stats
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.product.price) * item.quantity,
    0
  );

  // Add to cart
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    toast({
      title: "Produs adăugat",
      description: `${product.name} a fost adăugat în coș`,
    });
  };

  // Update quantity
  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Remove from cart
  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    
    toast({
      description: "Produs eliminat din coș",
    });
  };

  // Clear cart
  const handleClearCart = () => {
    setCart([]);
    toast({
      title: "Coș golit",
      description: "Toate produsele au fost eliminate din coș",
    });
  };

  // Open checkout
  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Place order
  const handlePlaceOrder = async (customerName: string, paymentMethod: string) => {
    placeOrderMutation.mutate({ customerName, paymentMethod });
  };

  // New order
  const handleNewOrder = () => {
    setConfirmationOrder(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartCount={cartCount}
        cartTotal={cartTotal}
        onCartClick={() => setIsCartOpen(true)}
      />

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        <ProductGrid
          products={products}
          isLoading={isLoadingProducts}
          onAddToCart={handleAddToCart}
        />
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        items={cart}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        items={cart}
        total={cartTotal}
        onClose={() => setIsCheckoutOpen(false)}
        onPlaceOrder={handlePlaceOrder}
      />

      <OrderConfirmationModal
        isOpen={confirmationOrder !== null}
        orderNumber={confirmationOrder || 0}
        onNewOrder={handleNewOrder}
      />
    </div>
  );
}
