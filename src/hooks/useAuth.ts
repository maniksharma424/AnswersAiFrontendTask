import { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Cookies from "js-cookie";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          setToken(idToken);
          setIsAuthenticated(true);
        } catch {
          setIsAuthenticated(false);
          setToken(null);
          Cookies.remove("auth_token");
        }
      } else {
        setIsAuthenticated(false);
        setToken(null);
        Cookies.remove("auth_token");
      }
    });

    return () => unsubscribe();
  }, []);

  return { isAuthenticated, token };
};
