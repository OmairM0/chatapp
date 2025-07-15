import { useEffect, useState } from "react";
import SendMessage from "./components/SendMessage";
import MessageInput from "./components/MessageInput";
import type { IChat, IMessage } from "./interfaces";
import Message from "./components/Message";
import useSocket from "./hooks/useSocket";
import { v4 as uuidv4 } from "uuid";
import useChatId from "./hooks/useChatId";
import useAuth from "./hooks/useAuth";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import ChatOperations from "./components/ChatOperations";
import Username from "./components/Username";

function App() {
  const chatId = useChatId();
  const sender = localStorage.getItem("sender") || "";
  const { isLoggedIn } = useAuth();
  const socket = useSocket(chatId, isLoggedIn);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chats, setChats] = useState<IChat[]>([]);
  const [messageContent, setMessageContent] = useState("");

  const handleSendMessage = () => {
    if (messageContent.trim() === "") {
      return; // Prevent sending empty messages
    }
    const newMessage = {
      sender,
      chatId: (chatId as string) || "default",
      text: messageContent,
    };
    socket?.emit("sendMessage", {
      message: newMessage,
      token: localStorage.getItem("token"),
    });
    setMessages([...messages, newMessage]);
    setMessageContent("");
  };
  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageContent(event.target.value);
  };
  const handleCreateNewChat = () => {
    const newChatId = uuidv4();
    window.location.href = `?chatId=${newChatId}`;
  };

  useEffect(() => {
    socket?.on("receiveMessage", (message: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // ---
    socket?.emit("joinChat", {
      chatId,
      token: localStorage.getItem("token"),
    });
    socket?.on("getMessages", (msgs: IMessage[]) => {
      setMessages(msgs);
    });

    socket?.emit("getChats", {
      token: localStorage.getItem("token"),
    });
    socket?.on("getChats", (savedChats: IChat[]) => {
      setChats(savedChats);
    });
  }, [socket, chatId]);

  return (
    <div>
      <div className="grid grid-cols-1 *:p-0 h-screen">
        <Username />
        {isLoggedIn ? (
          <div className="flex gap-2">
            <div className="w-2/6 p-2">
              <Sidebar
                chats={chats}
                handleCreateNewChat={handleCreateNewChat}
              />
            </div>
            <div className="flex-1 relative rounded-md bg-gray-100">
              <div className="bg-indigo-500 p-2 text-white font-semibold rounded-b-md flex justify-between items-center">
                <div>{chatId || "Global Chat"}</div>
                <ChatOperations chatId={chatId as string} socket={socket} />
              </div>
              <div className=" h-[85vh] p-4 overflow-auto scrollbar-width-none">
                {messages.map((message) => (
                  <Message key={message.id} message={message} sender={sender} />
                ))}
              </div>
              <div className="absolute bottom-2 left-0 right-0 w-full flex items-center gap-4 px-2">
                <MessageInput
                  messageContent={messageContent}
                  handleMessageChange={handleMessageChange}
                />
                <SendMessage handleSendMessage={handleSendMessage} />
              </div>
            </div>
          </div>
        ) : (
          <Login socket={socket} />
        )}
      </div>
    </div>
  );
}

export default App;
