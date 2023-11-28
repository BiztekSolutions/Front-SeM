import React from "react";
import { useDispatch } from "react-redux";
import Post from "./Post";
import { addCommentToPost } from "../../features/posts/postsSlice";

function PostList({ posts, onPostSelect }) {
  const dispatch = useDispatch();

  const handleCommentSubmit = (postId, comment) => {
    // Dispatch de la acción addCommentToPost
    dispatch(addCommentToPost({ postId, comment }));
  };
  console.log(posts, "posts");
  return (
    <div>
      <h2>Publicaciones</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Post
              post={post}
              onCommentSubmit={(comment) =>
                handleCommentSubmit(post.id, comment)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
