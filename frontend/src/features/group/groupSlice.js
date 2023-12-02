// slices/groupSlice.js
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupService } from "./groupService";

const initialState = {
  group: {},
  groups: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createGroup = createAsyncThunk(
  "createGroup",
  async (groupData, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString);
      const token = user.token;
      return await groupService.createGroup(token, groupData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGroup = createAsyncThunk(
  "getGroup",
  async (idGroup, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString);
      const token = user.token;
      return await groupService.getGroup(token, idGroup);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteGroup = createAsyncThunk(
  "deleteGroup",
  async (groupId, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString);
      const token = user.token;
      return await groupService.getGroup(token, groupId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getGroups = createAsyncThunk("getGroups", async (_, thunkAPI) => {
  try {
    return await groupService.deleteGroup();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const setRoutineGroup = createAsyncThunk(
  "setRoutineGroup",
  async (data, thunkAPI) => {
    try {
      const userString = localStorage.getItem("User");
      const user = JSON.parse(userString);
      const token = user.token;
      return await groupService.setRoutineGroup(token, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const clearGroupMessage = createAction("clear-group-message");

export const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE GROUP
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating group";
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.group = action.payload.group;
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })

      // GET GROUP
      .addCase(getGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting group";
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.group = action.payload.group;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })

      // DELETE GROUP
      .addCase(deleteGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Deletting group";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })

      // GET GROUPS
      .addCase(getGroups.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting groups";
      })
      .addCase(getGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.groups = action.payload.groups;
      })
      .addCase(getGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.groups = null;
      })

      // SET ROUTINE TO GROUP
      .addCase(setRoutineGroup.pending, (state) => {
        state.isLoading = true;
        state.message = "Setting routine to group";
      })
      .addCase(setRoutineGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.group = action.payload.group;
      })
      .addCase(setRoutineGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.group = null;
      })

      // CLEAR ACTIONS
      .addCase(clearGroupMessage, (state) => {
        state.message = "";
      });
  },
});
