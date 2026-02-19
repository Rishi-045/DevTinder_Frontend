import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";

const signUpSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters and include uppercase, lowercase, number, and special character.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword == data.password, {
    error: "Passwords do not match!",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const handleResetPassword = async (data) => {
    try {
      const res = await api.post(`/reset-password/${token}`, data);
      console.log(res?.data);
      toast.success("Password reset successfully. Please Login.");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err.message);
      toast.error(err?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(handleResetPassword)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <h2 className="text-3xl font-bold text-center mb-2">
            Reset Password
          </h2>

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
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <span className="text-red-500">{errors.password?.message}</span>

          <label className="label">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="input"
              placeholder="Confirm Password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          <span className="text-red-500">
            {errors.confirmPassword?.message}
          </span>

          <button
            className={`btn btn-soft btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-70`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ResetPassword;
