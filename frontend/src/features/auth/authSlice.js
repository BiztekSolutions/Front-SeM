import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./authService";

const initialState = {
  user: {},
  token: "",
  userId: "",
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      return await authService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logout = createAsyncThunk("logout", async (data, thunkAPI) => {
  try {
    const userString = localStorage.getItem("User");
    const user = JSON.parse(userString);
    const token = user.token;
    return await authService.logout(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const register = createAsyncThunk("register", async (data, thunkAPI) => {
  try {
    return await authService.createUser(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const clearUserMessage = createAction("create-user-message");

export const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // LOGIN USER
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Logging in user";
        console.log("entre");
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("entre bien");
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.message = action.payload.message;
        state.token = action.payload.session.token;
        state.userId = action.payload.session.userId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        console.log(action.payload);
        state.message = action.payload.response.data.message;
        state.user = null;
      })

      // REGISTER
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating user";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })

      // LOGOUT
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User logged out";
        state.user = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "User delete error";
      })

      // ACTIONS
      .addCase(clearUserMessage, (state) => {
        state.message = "";
      });
  },
});
