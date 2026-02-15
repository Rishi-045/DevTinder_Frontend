import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { logout } from "../store/auth/authSlice";
import api from "../utils/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.auth?.user);
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/logout");
      dispatch(logout());
      navigate("/login", { replace: true });
      toast.success("Logout Successfully.");
    } catch (err) {
      console.error(err.message);
      toast.error("Logout Failed");
    }
  };

  return (
    <>
      <div className="navbar px-2 bg-base-300 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">
            devTinder
          </Link>
        </div>
        <div className="flex gap-2">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
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
      </div>
    </>
  );
};

export default Navbar;
