import type { IMessage } from "../interfaces";

interface IProps {
  message: IMessage;
  sender: string;
}

const Message = ({ message, sender }: IProps) => {
  return (
    <div
      key={message.id}
      className={`p-2 mb-2 rounded-md ${
        message.sender === sender
          ? "bg-blue-100 text-blue-800"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      <div className="font-bold">{message.sender}</div>
      <div>{message.text}</div>
      <div className="text-xs text-gray-500">
        {new Date(message.createdAt ?? "Now").toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Message;
