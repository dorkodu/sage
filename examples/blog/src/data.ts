export interface IUser {
  id: number;
  username: string;
}

export interface IBlog {
  id: number;
  userId: number;
  content: string;
}

export const users: Array<IUser> = [
  { id: 0, username: "berk" },
  { id: 1, username: "doruk" },
];

export const blogs: Array<IBlog> = [
  { id: 0, userId: 0, content: "hello world" },
  { id: 1, userId: 0, content: "goodbye world" },
  { id: 2, userId: 1, content: "testing" },
  { id: 3, userId: 1, content: "attention please" },
  { id: 4, userId: 1, content: "ceo of dorkodu" },
];
