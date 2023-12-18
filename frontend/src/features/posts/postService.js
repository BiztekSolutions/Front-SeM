import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/posts";
const user = JSON.parse(localStorage.getItem("User"));

const postService = {
  getPosts: async (token) => {
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },
  addCommentToPost: async (postId, comment, clientId, token) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/comments/${postId}`,
        {
          content: comment,
          userId: clientId,
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
  deleteComment: async (commentId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  },
  deletePost: async (postId, token) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  },

  addPost: async (newPost, token) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/posts",
        {
          ...newPost,
          userId: user.user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
};

export default postService;
