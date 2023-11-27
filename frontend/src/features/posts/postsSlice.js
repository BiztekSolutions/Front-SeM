// postsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return postService.getPosts();
});

export const addOrUpdatePost = createAsyncThunk(
  "posts/addOrUpdatePost",
  async (post) => {
    if (post.id) {
      return postService.editPost(post.id, post);
    } else {
      return postService.addPost(post);
    }
  }
);

export const addCommentToPost = createAsyncThunk(
  "posts/addCommentToPost",
  async ({ postId, comment }) => {
    const userString = localStorage.getItem("User");

    const user = JSON.parse(userString);
    const token = user.token;
    const updatedPost = await postService.addCommentToPost(
      postId,
      comment,
      token
    );
    return {
      postId,
      comment: updatedPost.Comments[updatedPost.Comments.length - 1],
    };
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {
    addCommentToPost: (state, action) => {
      const { postId, comment } = action.payload;
      const postIndex = state.posts.findIndex((post) => post.id === postId);

      if (postIndex !== -1) {
        state.posts[postIndex].Comments.push(comment);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrUpdatePost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrUpdatePost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts.push(action.payload);
      })
      .addCase(addOrUpdatePost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addCommentToPost.fulfilled, (state, action) => {
        // Esta acción se manejará en el reducer para agregar comentarios localmente
        state.status = "succeeded";
      });
  },
});

export const { addCommentToLocalPost } = postsSlice.actions;
