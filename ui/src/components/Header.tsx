interface IProps {
  handleCreateNewChat: () => void;
}

const Header = ({ handleCreateNewChat }: IProps) => {
  return (
    <div className="bg-gray-800 text-white flex justify-between items-center p-2 mb-2 rounded-md">
      <h1>Chat App</h1>
      <button
        onClick={handleCreateNewChat}
        className="bg-white p-2 rounded-md text-indigo-400 text-sm font-bold"
      >
        New Chat
      </button>
    </div>
  );
};

export default Header;
