import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getLogin = createAsyncThunk(
  "Auth/getLogin",
  async (resD, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}admin/login`,
          {
            ...resD,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    isAuthLoading: false,
    error: null,
    LoginArr: null,
  },

  extraReducers: {
    [getLogin.pending]: (state, action) => {
      state.isAuthLoading = true;
    },
    [getLogin.fulfilled]: (state, action) => {
      state.LoginArr = action.payload.data;
      state.isAuthLoading = false;
    },
    [getLogin.rejected]: (state, action) => {
      state.isAuthLoading = false;
    },
  },
});

export default AuthSlice.reducer;
