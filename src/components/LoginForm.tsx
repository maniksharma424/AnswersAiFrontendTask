import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";
import { FormData, Errors } from "../types";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import ErrorMessage from "./ErrorMessage";
import { Google } from "../icons/Icons";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignInMode, setIsSignInMode] = useState(true);

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Please enter a valid email";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const userCred = isSignInMode
        ? await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          )
        : await createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );

      const idToken = await userCred.user.getIdToken();
      Cookies.set("auth_token", idToken, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      window.location.href = "/dashboard";
    } catch (err: any) {
      setErrors({ submit: err.code || "Authentication failed" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      Cookies.set("auth_token", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });
      window.location.href = "/dashboard";
    } catch (err: any) {
      setErrors({
        submit:
          err.code === "auth/popup-closed-by-user"
            ? "Sign-in popup was closed"
            : "Google login failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-bg_primary_light"
            placeholder="Enter your email"
          />
        </div>
        {errors.email && <ErrorMessage message={errors.email} />}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2 text-white">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-12 py-3 rounded-lg bg-bg_primary_light"
            placeholder="Enter your password"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {errors.password && <ErrorMessage message={errors.password} />}
      </div>

      {/* Submit error */}
      {errors.submit && <ErrorMessage message={errors.submit} />}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 rounded-lg bg-black text-white border border-border_primary"
      >
        {isLoading
          ? isSignInMode
            ? "Logging in..."
            : "Signing up..."
          : isSignInMode
          ? "Login"
          : "Sign Up"}
      </button>

      <div className="my-3 text-center text-[#BBBB] text-xs">or</div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 rounded-lg bg-black text-white flex justify-center items-center border border-border_primary"
        disabled={isLoading}
      >
        <Google />
        <span className="ml-3">
          {isLoading ? "Signing in..." : "Sign in with Google"}
        </span>
      </button>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={() => setIsSignInMode(!isSignInMode)}
          className="text-[#BBBBBB] hover:text-white text-sm"
        >
          {isSignInMode
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
