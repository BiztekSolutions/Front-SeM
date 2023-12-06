import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { fetchPosts, addOrUpdatePost } from "../../features/posts/postsSlice";

function Foro() {
  const dispatch = useDispatch();
  const user = localStorage.getItem("User");

  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostSelect = (post) => {
    setSelectedPost(post);
  };

  const handlePostSubmit = (post) => {
    dispatch(addOrUpdatePost(post));
    setSelectedPost(null); // Limpiamos el post seleccionado después de enviarlo
  };

  return (
    <div>
      <h1>Foro</h1>

      <div>
        <h1></h1>
        <PostList onPostSelect={handlePostSelect} />
      </div>

      <div>
        <PostForm selectedPost={selectedPost} onSubmit={handlePostSubmit} />
      </div>
    </div>
  );
}

export default Foro;
