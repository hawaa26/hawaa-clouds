import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export const useCart = () => useContext(Ctx);

const load = () => {
  try {
    const v = JSON.parse(localStorage.getItem("hawaa_cart") || "{}");
    return v && typeof v === "object" ? v : {};
  } catch {
    return {};
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("hawaa_cart", JSON.stringify(items));
  }, [items]);

  const add = (key) => setItems((s) => ({ ...s, [key]: (s[key] || 0) + 1 }));
  const set = (key, q) =>
    setItems((s) => {
      const n = { ...s };
      if (q <= 0) delete n[key];
      else n[key] = q;
      return n;
    });
  const clear = () => setItems({});
  const count = Object.values(items).reduce((a, b) => a + b, 0);

  return <Ctx.Provider value={{ items, add, set, clear, count, open, setOpen }}>{children}</Ctx.Provider>;
};
