import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isSidebarOpen: false,
  isLoading: false,
  isError: false,
  isWarning: false,
  isInfo: false,
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
        isWarning: false,
        isInfo: false,
        isSuccess: true,
        message,
      })
    );
  };

// Action Creator para mostrar notificación de error
export const showErrorNotification =
  (api, message, description) => (dispatch) => {
    console.log("showSuccessNotification", message);
    api["error"]({
      message,
      description,
    });
    dispatch(
      layoutSlice.actions.setNotification({
        isError: true,
        isWarning: false,
        isInfo: false,
        isSuccess: false,
        message,
      })
    );
  };

// Action Creator para mostrar notificación de error
export const showWarningNotification =
  (api, message, description) => (dispatch) => {
    console.log("showSuccessNotification", message);
    api["warning"]({
      message,
      description,
    });
    dispatch(
      layoutSlice.actions.setNotification({
        isError: false,
        isWarning: true,
        isInfo: false,
        isSuccess: false,
        message,
      })
    );
  };

// Action Creator para mostrar notificación de error
export const showInfoNotification =
  (api, message, description) => (dispatch) => {
    console.log("showSuccessNotification", message);
    api["info"]({
      message,
      description,
    });
    dispatch(
      layoutSlice.actions.setNotification({
        isError: false,
        isWarning: false,
        isInfo: true,
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
      state.isWarning = action.payload.isWarning;
      state.isInfo = action.payload.isInfo;
      state.message = action.payload.message;
    },
  },
});
