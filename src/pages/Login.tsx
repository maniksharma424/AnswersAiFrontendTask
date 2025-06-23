import React from "react";
import { useAuth } from "../hooks/useAuth";
import LoginForm from "../components/LoginForm";
import { auth } from "../firebase/firebase";
import Cookies from "js-cookie";

const Login: React.FC = () => {
  const { isAuthenticated, token, setIsAuthenticated, setToken } = useAuth();
  const handleLogout = async (): Promise<void> => {
    try {
      await auth.signOut();
      Cookies.remove("auth_token");
      setIsAuthenticated(false);
      setToken(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isAuthenticated && token) {
    return (
      <div className="h-full w-full flex items-center justify-center p-6">
        <div className="sm:w-1/3 w-full p-6 rounded-3xl border-border_primary bg-bg_primary border text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">
            Already Logged In
          </h1>
          <p className="text-text_light mb-4">
            You are already authenticated with a valid token.
          </p>
          <p className="text-text_light text-sm mb-6 break-all">
            Token: {token.slice(0, 20)}...
          </p>
          <button
            onClick={handleLogout}
            className="w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 border-border_primary bg-black border text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center p-6">
      <div className="sm:w-1/3 w-full p-6 rounded-3xl border-border_primary bg-bg_primary border">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
