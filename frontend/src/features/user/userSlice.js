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

export const addUserToClients = createAsyncThunk(
  "addUserToClients",
  async (userId, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString);
      const token = user.token;

      // Llamada a la función o servicio para agregar el usuario a la lista de clientes
      const response = await userService.addUserToClients(token, userId);

      // Puedes devolver la respuesta si necesitas más información en el frontend
      return response;
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

export const getClients = createAsyncThunk(
  "getClients",
  async (_, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");

      const user = JSON.parse(userString);

      const token = user.token;
      return await userService.getClients(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getUser = createAsyncThunk("getUser", async (data, thunkAPI) => {
  try {
    const userString = localStorage.getItem("User");

    const user = JSON.parse(userString);
    console.log("asojldnfpkasnd");
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
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (_, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");

      const user = JSON.parse(userString);

      const token = user.token;

      return await userService.deleteUser(token);
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
        state.user = action.payload.user;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.user = null;
      })
      // ADD USER TO CLIENTS
      .addCase(addUserToClients.pending, (state) => {
        state.isLoading = true;
        state.message = "Adding user to clients";
      })
      .addCase(addUserToClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "User added to clients successfully";
        // Actualiza el estado según sea necesario, por ejemplo, actualizar la lista de usuarios o clientes
        // state.users = [...state.users, action.payload.user];
      })
      .addCase(addUserToClients.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "Failed to add user to clients";
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

      // ACTIONS
      .addCase(clearUserMessage, (state) => {
        state.message = "";
      });
  },
});
