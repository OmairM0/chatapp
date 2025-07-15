const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const dbConnect = require("./db");
const UserService = require("./services/user");
const Chat = require("./models/chat");
const { where } = require("sequelize");
const { sendInvite } = require("./services/email");
const Message = require("./models/message");
const { text } = require("node:stream/consumers");

dbConnect(); // Connect to the database

const app = express();
const server = createServer(app);
const io = new Server(server);

let chats = { default: [] };

io.on("connection", (socket) => {
  let chatId = socket.handshake.query.chatId;
  let isLoggedIn = socket.handshake.query.isLoggedIn;

  socket.on("login", async (data) => {
    await UserService.login(data.email);
    socket.emit("otpSent");
  });

  socket.on("otpVerify", async (data) => {
    const result = await UserService.verifyOtp(data);
    if (!result) {
      socket.emit("otpFailed");
    } else {
      socket.emit("otpSuccess", { token: result });
    }
  });

  if (!isLoggedIn) return;

  if (!chats[chatId]) {
    chats[chatId] = [];
  }
  chats[chatId].push(socket);

  socket.on("sendMessage", async (data) => {
    const msg = data.message;
    const token = data.token;
    const decodedToken = UserService.verifyToken(token);

    if (!decodedToken) {
      return;
    }

    let currentChatId = msg.chatId;
    await Chat.findOrCreate({
      where: { name: currentChatId },
      defaults: {
        name: currentChatId,
        ownerId: decodedToken.userId,
        privacy: 0,
      },
    });

    await Message.create({
      text: msg.text,
      sender: decodedToken.userId,
      chatId: currentChatId,
    });
    if (!chats[currentChatId]) return;
    chats[currentChatId].forEach((s) => {
      if (socket === s) return; // Don't send the message back to the sender
      s.emit("receiveMessage", msg);
    });
  });

  socket.on("makePrivate", async (data) => {
    const token = data.token;
    const decodedToken = UserService.verifyToken(token);

    if (!decodedToken) {
      return;
    }

    const chatId = data.chatId;
    await Chat.update(
      { privacy: 1 },
      {
        where: { name: chatId, ownerId: decodedToken.userId },
      }
    );
  });

  socket.on("inviteUser", async (data) => {
    const token = data.token;
    const decodedToken = UserService.verifyToken(token);
    if (!decodedToken) {
      return;
    }

    const chatId = data.chatId;
    const invitedUser = data.email;
    await sendInvite(invitedUser, chatId);
  });

  socket.on("joinChat", async (data) => {
    const token = data.token;
    const decodedToken = UserService.verifyToken(token);
    if (!decodedToken) {
      return;
    }

    const messages = await Message.findAll({ where: { chatId: data.chatId } });

    socket.emit("getMessages", messages);
  });
  socket.on("getChats", async (data) => {
    const token = data.token;
    const decodedToken = UserService.verifyToken(token);
    if (!decodedToken) {
      return;
    }

    const chats = await Chat.findAll({
      where: { ownerId: decodedToken.userId },
    });

    socket.emit("getChats", chats);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
