import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import EmployeesSlice from "./EmployeesSlice";

export default configureStore({
  reducer: {
    AuthSlice,
    EmployeesSlice,
  },
});
