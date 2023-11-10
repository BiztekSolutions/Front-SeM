import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rutinasService } from "./rutinasService";

const initialState = {
  rutinas: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getRutines = createAsyncThunk(
  "getRutines",
  async (data, thunkAPI) => {
    try {
      return await rutinasService.getRutines(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateRutines = createAsyncThunk(
  "updateRutines",
  async (data, thunkAPI) => {
    try {
      return await rutinasService.updateRutines(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllRutines = createAsyncThunk(
  "getAllRutines",
  async (data, thunkAPI) => {
    try {
      return await rutinasService.getAllRutines(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const rutinasSlice = createSlice({
  name: "rutinas",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get rutines de id
      .addCase(getRutines.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting rutines";
      })
      .addCase(getRutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.rutinas = action.payload;
      })
      .addCase(getRutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.rutinas = null;
      })
      // get all rutines
      .addCase(getAllRutines.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting all rutines";
      })
      .addCase(getAllRutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.rutinas = action.payload.data;
      })
      .addCase(getAllRutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.rutinas = null;
      })
      // update rutines
      .addCase(updateRutines.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating rutines";
      })
      .addCase(updateRutines.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.msg;
        state.rutinas = action.payload.data;
      })
      .addCase(updateRutines.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.msg;
        state.rutinas = null;
      });
  },
});
