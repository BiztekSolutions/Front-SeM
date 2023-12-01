import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { exerciseService } from "./exerciseService";

const initialState = {
  exercises: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const updateExercises = createAsyncThunk(
  "updateExercises",
  async (exerciseId, data, thunkAPI) => {
    try {
      return await exerciseService.updateExercises(data, exerciseId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAllExercises = createAsyncThunk(
  "getAllExercises",
  async (data, thunkAPI) => {
    try {
      return await exerciseService.getAllExercises(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createExercise = createAsyncThunk(
  "createExercise",
  async (data, thunkAPI) => {
    try {
      return await exerciseService.createExercise(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const exerciseSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // get all exercises
      .addCase(getAllExercises.pending, (state) => {
        state.isLoading = true;
        state.message = "Getting all exercises";
      })
      .addCase(getAllExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.exercises = action.payload.exercises;
      })
      .addCase(getAllExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.exercises = null;
      })
      // create exercises
      .addCase(createExercise.pending, (state) => {
        state.isLoading = true;
        state.message = "Creating exercises";
      })
      .addCase(createExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
      })

      // update exercises
      .addCase(updateExercises.pending, (state) => {
        state.isLoading = true;
        state.message = "Updating exercises";
      })
      .addCase(updateExercises.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
        state.exercises = action.payload.data;
      })
      .addCase(updateExercises.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.message;
        state.exercises = null;
      });
  },
});
