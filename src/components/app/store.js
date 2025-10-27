import { configureStore } from "@reduxjs/toolkit";
import studentreducer from "./feature/student/studentSlice";

const store = configureStore({
  reducer: {
    student: studentreducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export default store;
