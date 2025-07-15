import { useEffect, useState } from "react";

export default function useUsername() {
  const [sender, setSender] = useState("");

  useEffect(() => {
    // check if the sender is already in localStorage
    const storedSender = localStorage.getItem("sender");
    if (storedSender) {
      setSender(storedSender);
      return;
    }
    const senderNameInput = prompt("Enter your name:");
    setSender(senderNameInput || "Anonymous");
    // Store the sender name in localStorage
    localStorage.setItem("sender", senderNameInput || "Anonymous");
  }, [setSender]);

  return sender;
}
