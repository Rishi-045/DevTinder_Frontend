import { io } from "socket.io-client";

let socket;

const createSocketConnection = (loggedInUserId) => {
  if (!socket) {
    const BASE_URL =
      location.hostname === "localhost"
        ? "http://localhost:8000"
        : "https://devtinder-backend.onrender.com"; 

    socket = io(BASE_URL, {
      withCredentials: true,
      query: {
        userId: loggedInUserId,
      },
    });
  }
  return socket;
};

export default createSocketConnection;