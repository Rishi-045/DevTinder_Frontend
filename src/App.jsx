import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router";
import useAuthCheck from "./hooks/useAuthCheck.js";

const App = () => {
  useAuthCheck();
  console.log("App rendered");

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
