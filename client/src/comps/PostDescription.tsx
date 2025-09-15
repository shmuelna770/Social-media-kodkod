import { useState } from "react";
import "../style/postDescription.css";

type Props = {
  username: string;
  description: string;
};

export default function PostDescription({ username, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > 80; 

  return (
    <div className="post-description-container">
      <span className="username">{username}</span>
      <p className={`description ${expanded ? "expanded" : ""}`}>
        {description}
      </p>
      {isLong && (
        <button
          className="read-more-btn"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "show less" : "more..."}
        </button>
      )}
    </div>
  );
}
