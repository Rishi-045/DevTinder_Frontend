import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";
import { setUser } from "../store/auth/authSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });
  console.log("forgot password page rendered");
  const handleFormSubmit = async (data) => {
    try {
      const res = await api.post("/forgot-password", data);
      toast.success("Reset link sent to your email!");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(err || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {/* <legend className="fieldset-legend">Login</legend> */}
          <h2 className="text-3xl font-bold text-center mb-2">Forgot Password</h2>
          <label className="label">Email</label>
          <input {...register("email")} className="input" placeholder="Email" />

          <span className="text-red-500">{errors.email?.message}</span>
          <button
            className={`btn btn-soft btn-primary mt-4 disabled:opacity-70 disabled:cursor-not-allowed`}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending Reset Link..." : "Forgot Password"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgotPassword;
