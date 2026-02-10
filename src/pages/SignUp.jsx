import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router";
import api from "../utils/axios";
import toast from "react-hot-toast";

const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "First Name is Required.")
      .max(50, "First Name must be at most 50 characters"),
    lastName: z
      .string()
      .min(1, "Last Name is Required.")
      .max(50, "Last Name must be at most 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
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

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const handleFormSubmit = async (data) => {
    try {
      const res = await api.post("/signup", data);
      console.log(res.data);
      toast.success("Signup Successfully. Please Login.");
      navigate("/login");
    } catch (err) {
      console.error(err.message);
      toast.error(err.response.data.error || "Something went wrong.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {/* <legend className="fieldset-legend">Login</legend> */}
          <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>

          <label className="label">First Name</label>
          <input
            type="text"
            {...register("firstName")}
            className="input"
            placeholder="First Name"
          />
          <span className="text-red-500">{errors.firstName?.message}</span>

          <label className="label">Last Name</label>
          <input
            type="text"
            {...register("lastName")}
            className="input"
            placeholder="Last Name"
          />
          <span className="text-red-500">{errors.lastName?.message}</span>

          <label className="label">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input"
            placeholder="Email"
          />
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

          <button className={`btn btn-soft btn-primary mt-4 disabled:cursor-not-allowed disabled:opacity-70`} type="submit"
          disabled={isSubmitting}
          >{isSubmitting ? "Signing Up..." : "Sign Up"}</button>
          <p className="mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
