import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userService } from "./userService";

const initialState = {
  user: {},
  users: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (data, thunkAPI) => {
    try {
      return await userService.loginUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const googleLoginSlice = createAsyncThunk(
  "googleLogin",
  async (data, thunkAPI) => {
    try {
      return await userService.googleLogin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async (newUser, thunkAPI) => {
    try {
      return await userService.updateUser(newUser);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (userId, thunkAPI) => {
    try {
      return await userService.deleteUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUser = createAsyncThunk("getUser", async (data, thunkAPI) => {
  try {
    const userString = localStorage.getItem("User");

    const user = JSON.parse(userString);

    const token = user.token;
    return await userService.getUser(token, data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getUsers = createAsyncThunk("getUsers", async (_, thunkAPI) => {
  try {
    const userString = localStorage.getItem("User");

    const user = JSON.parse(userString);

    const token = user.token;
    return await userService.getUsers(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const createUser = createAsyncThunk(
  "createUser",
  async (data, thunkAPI) => {
    try {
      return await userService.createUser(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearUserMessage = createAction("create-user-message");

export const userSlice = createSlice({
  name: "users",
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

        state.message = action.payload.message;
        state.user = action.payload.session;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.response.data.message;
        console.log("entre mal");
        state.user = null;
      })
      // GET USERS
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting users";
        console.log("gettin userssssssssssssssss", state.user);
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.message = action.payload.message;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        console.log("failed", action.payload);
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.users = null;
      })

      // GET USER
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting user";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // CREATE USER
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating user";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.user = action.payload.newUser;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })

      // GOOGLE LOGIN
      .addCase(googleLoginSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLoginSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.user = action.payload.data;
      })
      .addCase(googleLoginSlice.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Google Login error";
        state.user = null;
      })

      // UPDATE USER
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating user";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.user = action.payload.data ? action.payload.data : state.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "User update error";
        state.user = null;
      })

      // DELETE USER
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User deleted";
        state.user = null;
      })
      .addCase(deleteUser.rejected, (state) => {
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
