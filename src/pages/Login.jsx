import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters").max(20, "Password must be at most 20 characters"),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  console.log("Render Login Page");
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {/* <legend className="fieldset-legend">Login</legend> */}
          <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
          <label className="label">Email</label>
          <input {...register("email")} className="input" placeholder="Email" />
          <div>
            <span className="text-red-500">{errors.email?.message}</span>
          </div>

          <label className="label">Password</label>
          <input
            {...register("password")}
            className="input"
            placeholder="Password"
          />
          <span className="text-red-500">{errors.password?.message}</span>

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-soft btn-primary mt-4">Sign In</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
