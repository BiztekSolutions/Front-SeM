import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { rutinasSlice } from "../features/rutinas/rutinasSlice";
import { authSlice } from "../features/auth/authSlice";
import { layoutSlice } from "@/features/layout/layoutSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    rutinas: rutinasSlice.reducer,
    auths: authSlice.reducer,
    layout: layoutSlice.reducer,
  },
});
