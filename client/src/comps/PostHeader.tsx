import "../style/postHeader.css"
import { Link } from "react-router";

type Props = {
  username: string;
  profileImg: string;
  userId?:number
};

export default function PostHeader({ username, profileImg,userId }: Props) {
  if (!profileImg){
    profileImg = '/logo.png'
  }
  return (
    <div className="postHeader">
      <Link to={`/feed/profile-page/${userId}`} >
      <img src={profileImg} alt={username} className="headerPostImg" />
      <span>{username}</span>
      </Link>
    </div>
  );
}
