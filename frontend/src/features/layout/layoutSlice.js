import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isSidebarOpen: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Action Creator para mostrar notificación de éxito
export const showSuccessNotification =
  (api, message, description) => (dispatch) => {
    console.log("showSuccessNotification", message);
    api["success"]({
      message,
      description,
    });
    dispatch(
      layoutSlice.actions.setNotification({
        isError: false,
        isSuccess: true,
        message,
      })
    );
  };

// Action Creator para mostrar notificación de error
export const showErrorNotification = (message) => (dispatch) => {
  console.log("showErrorNotification", message);
  dispatch(
    layoutSlice.actions.setNotification({
      isError: true,
      isSuccess: false,
      message,
    })
  );
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setNotification: (state, action) => {
      console.log("PENE");
      state.isError = action.payload.isError;
      state.isSuccess = action.payload.isSuccess;
      state.message = action.payload.message;
    },
  },
});
