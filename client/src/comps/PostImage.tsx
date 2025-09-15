type Props = {
  postImg: string;
};

export default function PostImage({ postImg }: Props) {
  return (
    <div className="post-image">
      <img src={postImg} alt="post" />
    </div>
  );
}
