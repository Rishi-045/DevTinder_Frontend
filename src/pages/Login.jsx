import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";
import { loginSuccess } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  console.log("login page rendered");
  const handleFormSubmit = async (data) => {
    try {
      const res = await api.post("/login", data);
      dispatch(loginSuccess(res?.data))
      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err.message);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {/* <legend className="fieldset-legend">Login</legend> */}
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <label className="label">Email</label>
          <input {...register("email")} className="input" placeholder="Email" />

          <span className="text-red-500">{errors.email?.message}</span>

          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="input"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-3"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <span className="text-red-500">{errors.password?.message}</span>

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button
            className={`btn btn-soft btn-primary mt-4 disabled:opacity-70`}
            disabled = {isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
          <p className="mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="link link-primary">
              Signup
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
