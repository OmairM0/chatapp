import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import io from "socket.io-client";

export default function useSocket(chatId: string | null, isLoggedIn: boolean) {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    setSocket(io("/", { query: { chatId: chatId || "default", isLoggedIn } }));
  }, [chatId, isLoggedIn]);

  return socket;
}
