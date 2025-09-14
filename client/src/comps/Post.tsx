import React, { useState } from "react";
import "../style/post.css";
export type postProp = {
  id?:number;
  username: string;
  img: string;
  description: string;
  comments:string;
  time: string;
  like: string;
};
export default function Post(prop: postProp) {
  const [like, setLike] = useState(0);
  const time1 = new Date().toLocaleString();

  const hendleLike =async (e:React.FormEvent) => {
    e.preventDefault();
    setLike(like + 1);
};
{console.log("image",prop.img)}

  return (
    <div className="post">
      <div id="headerPost">
        <p id="username">{prop.username}</p>
      </div>
      <img id="image" src={prop.img} alt="fost pictuer" />
      <button id="like" onClick={hendleLike}>
        Like👍{like}
      </button>
      <p id="disciption">{prop.description}</p>
      <p id="time">{time1}</p>
    </div>
  );
}
