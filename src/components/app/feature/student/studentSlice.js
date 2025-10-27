import { createSlice } from "@reduxjs/toolkit";
import {
  createStudent,
  deleteStudent,
  getAllStudent,
  getOneStudent,
  updateStudent,
} from "./studentApiSlice";
import { Bounce } from "react-toastify";
import { toast } from "react-toastify";

const studectSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    single: {},

    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStudent.fulfilled, (state, action) => {
        state.students = action.payload;
        state.loading = false;
      })
      .addCase(getAllStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStudent.rejected, (state) => {
        state.loading = false;
      })
      // get single student
      .addCase(getOneStudent.fulfilled, (state, action) => {
        state.single.push(action.payload);
        state.loading = false;
      })
      .addCase(getOneStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOneStudent.rejected, (state) => {
        state.loading = false;
      })
      // get Create student
      .addCase(createStudent.fulfilled, (state, action) => {
        state.students = [...state.students, action.payload];
        state.loading = false;
          toast.success("🦄 Student Create Successfully", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          });
      })
      .addCase(createStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createStudent.rejected, (state) => {
        state.loading = false;
      })
      // get update student
      .addCase(updateStudent.fulfilled, (state, action) => {
        const updated = action.payload;
        const index = state.students.findIndex((s) => s.id === updated.id);

        if (index !== -1) {
          // Replace the old one with the new one
          state.students[index] = updated;
        }
            toast.success("🦄 Student Update Successfully", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
        state.loading = false;
      })
      .addCase(updateStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateStudent.rejected, (state) => {
        state.loading = false;
      })
      // get Create student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (p) => p.id !== action.payload.id
        );
        state.loading = false;
            toast.success("🦄 Student Delete Successfully", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
      })
      .addCase(deleteStudent.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteStudent.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default studectSlice.reducer;
