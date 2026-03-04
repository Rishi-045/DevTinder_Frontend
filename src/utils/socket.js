import { io } from "socket.io-client";

// const baseURL =
//   location.hostname === "localhost" ? "http://localhost:8000/" : "/api/socket.io/";
let socket;
const createSocketConnection = () => {
  if (!socket) {
    if (location.hostname === "localhost") {
      socket = io("http://localhost:8000/");
    } else {
      socket = io("/",{path: "/api/socket.io"});
    }
  }
  return socket;
};

export default createSocketConnection;
