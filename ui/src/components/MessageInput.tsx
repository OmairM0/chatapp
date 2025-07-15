interface IProps {
  messageContent: string;
  handleMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const MessageInput = ({ messageContent, handleMessageChange }: IProps) => {
  return (
    <textarea
      name="message"
      id="message"
      placeholder="Message"
      className="flex-[98%] p-2 border border-gray-300 rounded-3xl h-12 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      value={messageContent}
      onChange={handleMessageChange}
    ></textarea>
  );
};

export default MessageInput;
