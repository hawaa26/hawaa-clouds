import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { startLenis } from "./lib/lenis";
import { Nav } from "./components/hawaa/Nav";
import { Footer } from "./components/hawaa/Footer";
import { DonateProvider } from "./components/hawaa/DonateDialog";
import { CartProvider } from "./components/hawaa/CartContext";
import { AuthProvider, Protected } from "./components/hawaa/AuthContext";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import { PaymentSuccess, PaymentCancel } from "./pages/PaymentResult";

const ScrollTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Site = ({ children }) => (
  <>
    <Nav />
    {children}
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    const stop = startLenis();
    return () => stop();
  }, []);

  return (
    <BrowserRouter>
        <CartProvider>
          <DonateProvider>
            <ScrollTop />
            <Routes>
              <Route path="/" element={<Site><Home /></Site>} />
              <Route path="/shop" element={<Site><Shop /></Site>} />
              <Route path="/payment/success" element={<PaymentSuccess />} />
              <Route path="/payment/cancel" element={<PaymentCancel />} />
              <Route path="/admin/login" element={<AuthProvider><AdminLogin /></AuthProvider>} />
              <Route path="/admin" element={<AuthProvider><Protected><Admin /></Protected></AuthProvider>} />
            </Routes>
            <Toaster position="bottom-center" theme="light" />
          </DonateProvider>
        </CartProvider>
    </BrowserRouter>
  );
}

export default App;
