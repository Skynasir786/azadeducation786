import dotenv from 'dotenv';
import connectdb from './db/index.js';
import app from './app.js';
import http from 'http';
import { Server } from 'socket.io';
import messageModel from './models/message.model.js';

dotenv.config({ path: './.env' });

const userSocketMap = {}; // 🔐 userId → socket.id

connectdb()
  .then(() => {
    const server = http.createServer(app);

    const io = new Server(server, {
      cors: {
        origin: "http://localhost:5173", // React frontend
        methods: ["GET", "POST"],
        credentials: true,
      },
    });

    console.log("✅ MongoDB connected");

    io.on("connection", (socket) => {
      console.log("🔗 User connected:", socket.id);

      // ✅ Register user with userId
      socket.on("register", (userId) => {
        userSocketMap[userId] = socket.id;
        console.log(`✅ Registered user ${userId} with socket ${socket.id}`);
      });

      // ✉️ Private Message Handling
      socket.on("sendMessage", async ({ senderId, receiverId, message, fileUrl }) => {
        try {
          const newMessage = new messageModel({
            senderId,
            receiverId,
            message,
            fileUrl // store file URL
          });
      
          const savedMessage = await newMessage.save();
      
          const receiverSocketId = userSocketMap[receiverId];
          const senderSocketId = userSocketMap[senderId];
      
          if (receiverSocketId) {
            io.to(receiverSocketId).emit("receiveMessage", savedMessage);
          }
      
          if (senderSocketId) {
            io.to(senderSocketId).emit("receiveMessage", savedMessage);
          }
      
        } catch (error) {
          console.error("❌ Error saving message:", error);
        }
      });
      

      // 🔌 Handle disconnect
      socket.on("disconnect", () => {
        console.log("🚪 User disconnected:", socket.id);
        // Cleanup: remove from userSocketMap
        for (const userId in userSocketMap) {
          if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
            break;
          }
        }
      });
    });

    server.listen(5000, '0.0.0.0', () => {
      console.log("🚀 Server running on port", 5000);
    });

  })
  .catch((err) => {
    console.log("❌ Error:", err);
  });
