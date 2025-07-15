import { useState } from "react";

export default function useChatId() {
  const urlParams = new URLSearchParams(window.location.search);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chatId, setChatId] = useState(urlParams.get("chatId"));

  return chatId;
}
