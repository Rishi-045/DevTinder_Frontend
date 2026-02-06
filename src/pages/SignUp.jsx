import React from "react";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        {/* <legend className="fieldset-legend">Login</legend> */}
        <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>

        <label className="label">First Name</label>
        <input type="text" className="input" placeholder="First Name" />

        <label className="label">Last Name</label>
        <input type="text" className="input" placeholder="Last Name" />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" />

        <button className="btn btn-soft btn-primary mt-4">Sign Up</button>
      </fieldset>
    </div>
  );
};

export default SignUp;
