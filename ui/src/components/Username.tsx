import { useState } from "react";
import Modal from "./Modal";

const Username = () => {
  const storedSender = localStorage.getItem("sender");
  const [sender, setSender] = useState(storedSender || "");
  const [, setIsSenderModalOpen] = useState(true);

  const handleSenderInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSender(event.target.value);
  };
  const handleSaveSender = () => {
    localStorage.setItem("sender", sender);
    setIsSenderModalOpen(false);
  };

  if (storedSender != null) return;

  return (
    <>
      <Modal
        onClose={() => setIsSenderModalOpen(false)}
        isClosable={false}
        title="Enter Your Name"
      >
        <div className="py-2">
          <p className="mb-2">Enter your name</p>
          <input
            onChange={handleSenderInputChange}
            className="border-2 border-gray-300 rounded-md w-full px-2 py-2 focus:outline-none focus:border-indigo-300"
            type="text"
            placeholder="Your name"
          />
          <button
            onClick={handleSaveSender}
            className="bg-indigo-500 text-white w-full mt-2 p-2 rounded-sm"
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Username;
