import { useEffect, useState } from "react";
import Otp from "./Otp";

interface IProps {
  socket: SocketIOClient.Socket | null;
}

const Login = ({ socket }: IProps) => {
  const [email, setEmail] = useState("");
  const [isOtp, setIsOtp] = useState(false);

  const login = () => {
    socket?.emit("login", { email });
  };

  useEffect(() => {
    if (!socket) return;

    const handleOtpSent = () => {
      setIsOtp(true);
    };

    const handleOtpFailed = () => {
      alert("Otp is incorrect");
    };

    const handleOtpSuccess = (data: { token: string }) => {
      setEmail("");
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    };

    socket?.on("otpSent", handleOtpSent);
    socket?.on("otpFailed", handleOtpFailed);

    socket?.on("otpSuccess", handleOtpSuccess);

    return () => {
      socket.off("otpSent", handleOtpSent);
      socket.off("otpSuccess", handleOtpSuccess);
      socket?.off("otpFailed", handleOtpFailed);
    };
  }, [socket, email]);

  return (
    <>
      {isOtp && <Otp socket={socket} email={email} />}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 gap-7">
        <h1 className="text-3xl font-bold text-gray-900">Login</h1>
        <input
          className="p-2 bg-white rounded-md w-80 ring-2 ring-indigo-300 focus:ring-indigo-400 focus:shadow-md focus:shadow-blue-500/50 focus:outline-none"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(v) => setEmail(v.target.value)}
        />
        <button
          onClick={login}
          className="bg-indigo-500 text-white py-2 px-4 font-semibold rounded-md"
        >
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
