import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import { set } from "zod";
import api from "../utils/axios";

const Chat = () => {
  const { toUserId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((store) => store.auth.user);
  const imageUrl = user?.photoUrl || "";
  const currentUserId = user?._id;
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const fetchChatHistory = async () => {
    try {
      const response = await api.get(`/chat/${toUserId}`);
      console.log(response.data.messages);
      const chat = response.data.messages.map((msg) => {
        return {
          firstName: msg.senderId.firstName,
          lastName: msg.senderId.lastName,
          senderId: msg.senderId._id,
          message: msg.text,
          image: msg.senderId.photoUrl,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setMessages(chat);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetchChatHistory();
  }, []);

  function sendMessage() {
    if (message.trim() === "") return;
    const socket = socketRef.current;

    socket.emit("sendMessage", {
      currentUserId,
      toUserId,
      message,
      image: imageUrl,
    });

    setMessage("");
  }

  useEffect(() => {
    socketRef.current = createSocketConnection();

    const socket = socketRef.current;

    socket.emit("joinChat", { currentUserId, toUserId });

    socket.on("messageReceived", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("messageReceived");
      console.log("Disconnected from socket");
    };
  }, [currentUserId, toUserId]);

  return (
    <div className="flex flex-col h-screen">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.senderId === currentUserId;

          return (
            <div
              key={index}
              className={`chat ${isCurrentUser ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img src={msg.image} />
                </div>
              </div>

              <div className="chat-bubble">{msg.message}</div>
              <div className="chat-header">
                {msg.firstName}
                <time className="text-xs opacity-50">{msg.time}</time>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 bg-base-100 sticky bottom-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            className="input input-bordered w-full "
          />
          <button onClick={sendMessage} className="btn btn-soft btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
