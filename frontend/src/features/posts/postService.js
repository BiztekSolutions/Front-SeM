import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/posts";

const postService = {
  getPosts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  addCommentToPost: async (postId, comment, token) => {
    try {
      console.log(token);
      const response = await axios.post(
        `http://localhost:3000/api/v1/comments/${postId}`,
        {
          content: comment.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  },
  addPost: async (newPost) => {
    try {
      const response = await axios.post(API_URL, newPost);
      return response.data;
    } catch (error) {
      console.error("Error adding post:", error);
      throw error;
    }
  },

  editPost: async (postId, updatedPost) => {
    try {
      const response = await axios.patch(`${API_URL}/${postId}`, updatedPost);
      return response.data;
    } catch (error) {
      console.error("Error editing post:", error);
      throw error;
    }
  },
  // Agrega otras funciones del servicio según sea necesario
};

export default postService;
