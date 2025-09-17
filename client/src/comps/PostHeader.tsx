import "../style/postHeader.css"

import { Link } from "react-router";
type Props = {
  username: string;
  profileImg: string;
};

export default function PostHeader({ username, profileImg }: Props) {
  return (
    <div className="postHeader">
      <Link to={""} >
      <img src={profileImg} alt={username} className="headerPostImg" />
      <span>{username}</span>
      </Link>
    </div>
  );
}
