import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostList from "./PostList";
import PostForm from "./PostForm";
import { fetchPosts, addOrUpdatePost } from "../../features/posts/postsSlice";

function Foro() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    // Cargamos los posts al montar el componente
    dispatch(fetchPosts());
  }, [dispatch]);

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
        <PostList posts={posts} onPostSelect={handlePostSelect} />
      </div>

      <div>
        <PostForm selectedPost={selectedPost} onSubmit={handlePostSubmit} />
      </div>
    </div>
  );
}

export default Foro;
