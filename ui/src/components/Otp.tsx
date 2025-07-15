import { useState } from "react";
import Modal from "./Modal";

interface IProps {
  socket: SocketIOClient.Socket | null;
  email: string;
}

const Otp = ({ socket, email }: IProps) => {
  const [otp, setOtp] = useState("");
  const [, setIsSenderModalOpen] = useState(true);

  const handleOtpInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };
  const handleSendOtp = () => {
    socket?.emit("otpVerify", { otp, email });
    setIsSenderModalOpen(false);
  };

  return (
    <>
      <Modal
        onClose={() => setIsSenderModalOpen(false)}
        isClosable={false}
        title="Enter the Otp"
      >
        <div className="py-2">
          <p className="mb-2">Enter the Otp</p>
          <input
            onChange={handleOtpInputChange}
            className="border-2 border-gray-300 rounded-md w-full px-2 py-2 focus:outline-none focus:border-indigo-300"
            type="text"
            placeholder="Otp code"
          />
          <button
            onClick={handleSendOtp}
            className="bg-indigo-500 text-white w-full mt-2 p-2 rounded-sm"
          >
            Send
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Otp;
