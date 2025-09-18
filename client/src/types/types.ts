export type Comment = {
  id: number;
  username: string;
  text: string;
  time: string;
};

export type PostProp = {
  id: number;
  created_at: string;
  userId: number;
  imageUrl: string;
  description: string;
  sumOfLikes: number;
};

export type user = {
  id: number;
  created_at: string;
  userName: string;
  password: string;
  firstName: string;
  profileImg?: string;
  status?: string;
}