type Props = {
  onClick?: () => void;
};

export default function CommentsSheet({ onClick }: Props) {
  return <button onClick={onClick}>Open Comments</button>;
}
