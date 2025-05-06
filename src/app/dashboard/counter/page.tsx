import { CartCounter } from "@/app/shopping-cart/components";

export const metadata = {
  title: "Contador",
  description: "Contador de productos en el carrito",
};

export default function CounterPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <span>Productos en el carrito</span>
      <CartCounter value={20} />
    </div>
  );
}
