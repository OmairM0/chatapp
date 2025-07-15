interface IProps {
  handleSendMessage: () => void;
}

const SendMessage = ({ handleSendMessage }: IProps) => {
  return (
    <button
      onClick={handleSendMessage}
      className="bg-indigo-500 text-white p-2 h-10 flex-1/6 rounded-md"
    >
      Send
    </button>
  );
};

export default SendMessage;
