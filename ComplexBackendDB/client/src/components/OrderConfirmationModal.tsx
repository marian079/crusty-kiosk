import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OrderConfirmationModalProps {
  isOpen: boolean;
  orderNumber: number;
  onNewOrder: () => void;
}

export function OrderConfirmationModal({
  isOpen,
  orderNumber,
  onNewOrder,
}: OrderConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-xl w-full p-8 text-center" data-testid="modal-confirmation">
        <div className="mb-6">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">
            Comandă Plasată cu Succes!
          </h2>
        </div>

        <div className="bg-primary/10 rounded-xl p-8 mb-6">
          <div className="text-sm text-muted-foreground mb-2">
            Numărul Comenzii Tale
          </div>
          <div className="text-6xl font-bold text-primary" data-testid="text-order-number">
            #{orderNumber}
          </div>
        </div>

        <p className="text-xl text-muted-foreground mb-8">
          Comanda ta este în preparare. Te rugăm să aștepți până când numărul
          tău va fi afișat pe ecran.
        </p>

        <Button
          size="lg"
          className="w-full py-6 text-xl font-semibold rounded-xl"
          onClick={onNewOrder}
          data-testid="button-new-order"
        >
          Comandă Nouă
        </Button>
      </div>
    </div>
  );
}
