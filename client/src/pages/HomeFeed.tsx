import Post from "../comps/Post";
import type { PostProp } from "../comps/types"; 

const posts: PostProp[] = [
  {
    username: "shmuel",
    profileImg: "https://i.pravatar.cc/150?img=3",
    postImg: "https://picsum.photos/500/500",
    description: "Enjoying the sunny day at the park! 🌞",
    likes: 12,
    time: "2 hours ago",
    comments: [],
  },
  {
    username: "yehuda",
    profileImg: "https://i.pravatar.cc/150?img=4",
    postImg: "https://picsum.photos/500/501",
    description:
      "Look at this amazing food I made hid jbdkj kbkj jd kjkj ck kj k kjew nlekw kjwk wke hkvw 🍝",
    likes: 8,
    time: "1 hour ago",
    comments: [],
  },
   {
    username: "yehuda",
    profileImg: "https://i.pravatar.cc/150?img=4",
    postImg: "https://picsum.photos/500/501",
    description:
      "Look at this amazing food I made hid jbdkj kbkj jd kjkj ck kj k kjew nlekw kjwk wke hkvw 🍝",
    likes: 8,
    time: "1 hour ago",
    comments: [],
  },
   {
    username: "yehuda",
    profileImg: "https://i.pravatar.cc/150?img=4",
    postImg: "https://picsum.photos/500/501",
    description:
      "Look at this amazing food I made hid jbdkj kbkj jd kjkj ck kj k kjew nlekw kjwk wke hkvw 🍝",
    likes: 8,
    time: "1 hour ago",
    comments: [],
  },
 
];

export default function HomeFeed() {
  return (
    <div className="feed">
      {posts.map((p, idx) => (
        <Post key={idx} {...p} />
      ))}
    </div>
  );
}
