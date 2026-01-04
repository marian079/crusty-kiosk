import { X, CreditCard, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { CartItem } from "@shared/schema";

const checkoutFormSchema = z.object({
  customerName: z.string().optional(),
  paymentMethod: z.enum(["cash", "card"]),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

interface CheckoutModalProps {
  isOpen: boolean;
  items: CartItem[];
  total: number;
  onClose: () => void;
  onPlaceOrder: (customerName: string, paymentMethod: string) => void;
}

export function CheckoutModal({
  isOpen,
  items,
  total,
  onClose,
  onPlaceOrder,
}: CheckoutModalProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customerName: "",
      paymentMethod: "cash",
    },
  });

  if (!isOpen) return null;

  const handleSubmit = (values: CheckoutFormValues) => {
    onPlaceOrder(values.customerName || "", values.paymentMethod);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        data-testid="overlay-checkout"
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col" data-testid="modal-checkout">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Finalizare Comandă</h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-checkout"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <ScrollArea className="flex-1 p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Order Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Rezumat Comandă</h3>
                <div className="space-y-2 bg-muted/30 rounded-lg p-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-semibold">
                        {(parseFloat(item.product.price) * item.quantity).toFixed(2)} LEI
                      </span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-primary">{total.toFixed(2)} LEI</span>
                  </div>
                </div>
              </div>

              {/* Customer Name */}
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Nume (opțional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Introdu numele tău"
                        className="h-14 text-lg"
                        data-testid="input-customer-name"
                      />
                    </FormControl>
                    <p className="text-sm text-muted-foreground">
                      Opțional - te ajută să identifici comanda la ridicare
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Method */}
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Metodă de Plată</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-3 border rounded-xl p-4 hover-elevate cursor-pointer">
                          <RadioGroupItem value="cash" id="cash" data-testid="radio-cash" />
                          <Label
                            htmlFor="cash"
                            className="flex items-center gap-3 cursor-pointer flex-1"
                          >
                            <Banknote className="h-6 w-6 text-primary" />
                            <div>
                              <div className="font-semibold text-lg">Numerar</div>
                              <div className="text-sm text-muted-foreground">
                                Plătește la casierie
                              </div>
                            </div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 border rounded-xl p-4 hover-elevate cursor-pointer opacity-50">
                          <RadioGroupItem value="card" id="card" disabled data-testid="radio-card" />
                          <Label
                            htmlFor="card"
                            className="flex items-center gap-3 cursor-not-allowed flex-1"
                          >
                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                            <div>
                              <div className="font-semibold text-lg">Card</div>
                              <div className="text-sm text-muted-foreground">
                                Indisponibil momentan
                              </div>
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        {/* Footer */}
        <div className="p-6 border-t">
          <Button
            size="lg"
            className="w-full py-6 text-xl font-semibold rounded-xl"
            onClick={form.handleSubmit(handleSubmit)}
            data-testid="button-place-order"
          >
            Plasează Comanda
          </Button>
        </div>
      </div>
    </div>
  );
}
