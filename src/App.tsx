import { BasketProvider } from "@/context/BasketContext";
import Dashboard from "@/pages/Dashboard";

export default function App() {
  return (
    <BasketProvider>
      <Dashboard />
    </BasketProvider>
  );
}
