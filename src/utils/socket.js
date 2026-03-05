import { io } from "socket.io-client";

// const baseURL =
//   location.hostname === "localhost" ? "http://localhost:8000/" : "/api/socket.io/";
let socket;
const createSocketConnection = (loggedInUserId) => {
  if (!socket) {
    if (location.hostname === "localhost") {
      socket = io("http://localhost:8000/", {
        query: {
          userId: loggedInUserId,
        },
      });
    } else {
      socket = io("/", {
        path: "/api/socket.io",
        query: {
          userId: loggedInUserId,
        },
      });
    }
  }
  return socket;
};

export default createSocketConnection;
