import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Google } from "../icons/Icons";
import Cookies from "js-cookie";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

// Define interfaces for form data and errors
interface FormData {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
  submit?: string;
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDBzQZ2llovNejztP0oRRg9xZEbHj74fc",
  authDomain: "answersaifrontendtask.firebaseapp.com",
  projectId: "answersaifrontendtask",
  storageBucket: "answersaifrontendtask.firebasestorage.app",
  messagingSenderId: "131926286146",
  appId: "1:131926286146:web:dc27513d4224b354d272db",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignInMode, setIsSignInMode] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Check auth state on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const idToken = await user.getIdToken();
          setToken(idToken);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Error fetching token:", error);
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

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEmailSubmit = async (
    e: React.FormEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      let userCredential;
      if (isSignInMode) {
        // Sign In
        userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Email login successful");
      } else {
        // Sign Up
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        console.log("Email sign-up successful");
      }
      const idToken = await userCredential.user.getIdToken();
      Cookies.set("auth_token", idToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error(`${isSignInMode ? "Login" : "Sign-up"} error:`, error);
      let errorMessage = isSignInMode
        ? "Invalid email or password"
        : "Sign-up failed";
      if (error.code === "auth/user-not-found" && isSignInMode) {
        errorMessage = "No account found with this email";
      } else if (error.code === "auth/wrong-password" && isSignInMode) {
        errorMessage = "Incorrect password";
      } else if (error.code === "auth/email-already-in-use" && !isSignInMode) {
        errorMessage = "Email is already registered";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format";
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const idToken = await userCredential.user.getIdToken();
      Cookies.set("auth_token", idToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      console.log("Google login successful");
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Google login error:", error);
      let errorMessage = "Google sign-in failed";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup was closed";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup was blocked by the browser";
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold mb-4 font-robert text-white">
            Already Logged In
          </h1>
          <p className="text-[#BBBBBB] mb-4">
            You are already authenticated with a valid token.
          </p>
          <p className="text-[#BBBBBB] text-sm mb-6 break-all">
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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 font-robert text-white">
            {isSignInMode ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-[#BBBBBB]">
            {isSignInMode
              ? "Sign in to your account"
              : "Sign up for a new account"}
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-2 text-white"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#525252" }}
              />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-colors bg-bg_primary_light"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-white"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                style={{ color: "#525252" }}
              />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 transition-colors bg-bg_primary_light"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" style={{ color: "#525252" }} />
                ) : (
                  <Eye className="w-5 h-5" style={{ color: "#525252" }} />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center mt-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <div className="flex items-center text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              {errors.submit}
            </div>
          )}

          {/* Continue Button */}
          <button
            onClick={handleEmailSubmit}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed border-border_primary bg-black border text-white"
          >
            {isLoading
              ? isSignInMode
                ? "Logging in..."
                : "Signing up..."
              : isSignInMode
              ? "Login"
              : "Sign Up"}
          </button>
        </div>

        <div className="my-3 text-center text-[#BBBB] text-xs">or</div>

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 bg-black border text-white border-border_primary"
        >
          <Google />
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </button>

        {/* Toggle Mode */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsSignInMode(!isSignInMode)}
            className="text-[#BBBBBB] hover:text-white text-sm"
          >
            {isSignInMode
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
