import { useState } from "react";
import Modal from "./Modal";

interface IProps {
  chatId: string;
  socket: SocketIOClient.Socket | null;
}

const ChatOperations = ({ chatId, socket }: IProps) => {
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleMakePrivate = () => {
    if (socket) {
      socket.emit("makePrivate", { chatId, token });
    }
  };

  const handleInviteUsers = () => {
    socket?.emit("inviteUser", { chatId, email, token });
  };

  const handleEmailInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(event.target.value);
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleMakePrivate}
        className="bg-white text-gray-800 p-2 text-sm rounded-sm"
      >
        Make Private
      </button>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-white text-gray-800 p-2 text-sm rounded-sm"
      >
        Invite Users📨
      </button>
      {isOpen && (
        <Modal title="Invite new user" onClose={() => setIsOpen(false)}>
          <div className="py-2">
            <p className="mb-2">
              Enter the email of the user you want to invite.
            </p>
            <input
              onChange={handleEmailInputChange}
              className="border-2 border-gray-300 rounded-md w-full px-2 py-2 focus:outline-none focus:border-indigo-300"
              type="email"
              placeholder="Email"
            />
            <button
              onClick={handleInviteUsers}
              className="bg-indigo-500 text-white w-full mt-2 p-2 rounded-sm"
            >
              Invite
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ChatOperations;
