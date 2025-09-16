export type Comment = {
  id: number;
  username: string;
  text: string;
  time: string;
};

export type PostProp = {
  username: string;
  profileImg: string;
  postImg: string;
  description: string;
  likes?: number;
  time: string;
  comments?: Comment[];
};
