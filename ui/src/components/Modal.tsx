import { createPortal } from "react-dom";

interface IProps {
  title: string;
  onClose: () => void;
  isClosable?: boolean;
  children: React.ReactNode;
}

const Modal = ({ title, onClose, isClosable = true, children }: IProps) => {
  return createPortal(
    <div className="h-screen w-full flex items-center justify-center absolute top-0 z-10 bg-gray-500/75">
      <div className="bg-white px-4 py-4 rounded-md min-w-100 min-h-20">
        <div className="flex items-center justify-between">
          <div className="font-bold text-gray-900">{title}</div>
          {isClosable && <button onClick={onClose}>❌</button>}
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
