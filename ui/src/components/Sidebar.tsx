import type { IChat } from "../interfaces";
import Header from "./Header";

interface Iprops {
  chats: IChat[];
  handleCreateNewChat: () => void;
}

const Sidebar = ({ chats, handleCreateNewChat }: Iprops) => {
  return (
    <div>
      <Header handleCreateNewChat={handleCreateNewChat} />
      <div className="flex flex-col">
        {chats.map((chat) => (
          <a href={`/?chatId=${chat.name}`}>
            <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg mb-2">
              <div className="w-10 h-10 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold">
                {chat.name.slice(0, 1)}
              </div>
              <div className="font-bold">
                {chat.name.slice(0, 20).concat("...")}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
