import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getEmployees = createAsyncThunk(
  "Employees/getEmployees",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/guests`, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH,
            "X-Access-Token": Cookies.get("MangmentToken"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const AddEmployees = createAsyncThunk(
  "Employees/AddEmployees",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/guest`, data, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH,
            "X-Access-Token": Cookies.get("MangmentToken"),
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const getWorkshop = createAsyncThunk(
  "Employees/getWorkshop",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/workshops`, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH,
            "X-Access-Token": Cookies.get("MangmentToken"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);
export const getWorkshop_Id = createAsyncThunk(
  "Employees/getWorkshop_Id",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(`${process.env.REACT_APP_BACKEND_API}dashboard/workshop/${id}`, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH,
            "X-Access-Token": Cookies.get("MangmentToken"),
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const AddWorkshop = createAsyncThunk(
  "Employees/AddWorkshop",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .post(`${process.env.REACT_APP_BACKEND_API}dashboard/workshop`, data, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH,
            "X-Access-Token": Cookies.get("MangmentToken"),
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const UpdateWorkshop = createAsyncThunk(
  "Employees/UpdateWorkshop",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const result = await axios
        .put(`${process.env.REACT_APP_BACKEND_API}dashboard/workshop`, data, {
          headers: {
            Authorization: process.env.REACT_APP_AUTH,
            "X-Access-Token": Cookies.get("MangmentToken"),
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        })
        .then((res) => res.data);
      return result;
    } catch (err) {
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const Workshopreminder = createAsyncThunk(
  "Employees/Workshopreminder",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const data = await axios
        .get(
          `${process.env.REACT_APP_BACKEND_API}dashboard/workshopreminder/${id}`,
          {
            headers: {
              Authorization: process.env.REACT_APP_AUTH,
              "X-Access-Token": Cookies.get("MangmentToken"),
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

const EmployeesSlice = createSlice({
  name: "Employees",
  initialState: {
    isEmployeesLoading: false,
    error: null,
    empolyeesArray: null,
    workshopArray: null,
    Work_Id_Array: null,
  },

  extraReducers: {
    [getEmployees.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [getEmployees.fulfilled]: (state, action) => {
      state.empolyeesArray = action.payload.data;
      state.isEmployeesLoading = false;
    },
    [getEmployees.rejected]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    // AddEmployees
    [AddEmployees.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [AddEmployees.fulfilled]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    [AddEmployees.rejected]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    // getWorkshop
    [getWorkshop.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [getWorkshop.fulfilled]: (state, action) => {
      state.workshopArray = action.payload.Data;
      state.isEmployeesLoading = false;
    },
    [getWorkshop.rejected]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    // AddWorkshop
    [AddWorkshop.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [AddWorkshop.fulfilled]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    [AddWorkshop.rejected]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    // getWorkshop_Id d
    [getWorkshop_Id.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [getWorkshop_Id.fulfilled]: (state, action) => {
      state.Work_Id_Array = action.payload.Data;
      state.isEmployeesLoading = false;
    },
    [getWorkshop_Id.rejected]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    // Workshopreminder
    [Workshopreminder.pending]: (state, action) => {
      state.isEmployeesLoading = true;
    },
    [Workshopreminder.fulfilled]: (state, action) => {
      state.isEmployeesLoading = false;
    },
    [Workshopreminder.rejected]: (state, action) => {
      state.isEmployeesLoading = false;
    },
  },
});

export default EmployeesSlice.reducer;
