import "../style/postHeader.css"
type Props = {
  username: string;
  profileImg: string;
};

export default function PostHeader({ username, profileImg }: Props) {
  return (
    <div className="postHeader">
      <img src={profileImg} alt={username} className="headerPostImg" />
      <span>{username}</span>
    </div>
  );
}
