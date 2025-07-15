export interface IMessage {
  id?: number;
  sender: string;
  chatId: string;
  text: string;
  createdAt?: Date | string;
}

export interface IChat {
  id?: number;
  name: string;
  ownerId: string;
  privacy: 0 | 1;
  createdAt?: Date | string;
}
