import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { http } from "../../lib/api";

const Ctx = createContext({ user: null, setUser: () => {} });
export const useAuth = () => useContext(Ctx);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    http.get("/auth/me")
      .then((r) => setUser(r.data))
      .catch(async () => {
        try {
          await http.post("/auth/refresh");
          const r = await http.get("/auth/me");
          setUser(r.data);
        } catch {
          setUser(false);
        }
      });
  }, []);
  return <Ctx.Provider value={{ user, setUser }}>{children}</Ctx.Provider>;
};

export const Protected = ({ children }) => {
  const { user } = useAuth();
  if (user === null) return <div className="grid min-h-screen place-items-center">Loading…</div>;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
};
