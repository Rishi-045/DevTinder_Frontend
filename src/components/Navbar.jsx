import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../store/auth/authSlice";
import api from "../utils/axios";
import toast from "react-hot-toast";
import { resetFeed } from "../store/feed/feedSlice";
import { resetRequests } from "../store/requests/requestSlice";
import { resetConnections } from "../store/connections/connectionsSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.auth?.user);
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      dispatch(logout());
      dispatch(resetFeed());
      dispatch(resetConnections());
      dispatch(resetRequests());
      navigate("/login", { replace: true });
      toast.success("Logout Successfully.");
    } catch (err) {
      console.error(err.message);
      toast.error("Logout Failed");
    }
  };

  return (
    <>
      <nav className="navbar w-full bg-base-300">
        <label
          htmlFor="my-drawer-4"
          aria-label="open sidebar"
          className="btn btn-square btn-ghost"
        >
          {/* Sidebar toggle icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
            <path d="M9 4v16"></path>
            <path d="M14 10l2 2l-2 2"></path>
          </svg>
        </label>
        <div className="px-4">
          <Link to="/" className="text-lg font-bold">
            DevTinder
          </Link>
        </div>
        <div className="flex gap-2 ml-auto">
          {/* <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          /> */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User Profile Picture" src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10000 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link to="/login" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
