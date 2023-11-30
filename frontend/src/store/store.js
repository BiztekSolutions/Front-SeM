import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { rutinasSlice } from "../features/rutinas/rutinasSlice";
import { authSlice } from "../features/auth/authSlice";
import { layoutSlice } from "@/features/layout/layoutSlice";
import { postsSlice } from "@/features/posts/postsSlice";
import { groupSlice } from "@/features/group/groupSlice";
export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    rutinas: rutinasSlice.reducer,
    auths: authSlice.reducer,
    layout: layoutSlice.reducer,
    posts: postsSlice.reducer,
    groups: groupSlice.reducer,
  },
});
