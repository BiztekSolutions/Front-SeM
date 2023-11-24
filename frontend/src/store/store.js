import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import { rutinasSlice } from "../features/rutinas/rutinasSlice";
import { layoutSlice } from "@/features/layout/layoutSlice";

export const store = configureStore({
  reducer: {
    users: userSlice.reducer,
    rutinas: rutinasSlice.reducer,
    layout: layoutSlice.reducer,
  },
});
