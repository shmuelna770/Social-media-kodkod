import "../style/postHeader.css"

type Props = {
  username: string;
  profileImg: string;
};

export default function PostHeader({ username, profileImg }: Props) {
  if (!profileImg){
    profileImg = '../../public/logo.png'
  }
  return (
    <div className="postHeader">
      <Link to={""} >
      <img src={profileImg} alt={username} className="headerPostImg" />
      <span>{username}</span>
      </Link>
    </div>
  );
}
