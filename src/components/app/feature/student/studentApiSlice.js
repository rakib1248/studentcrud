import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../../utils/axiosApi";

export const getAllStudent = createAsyncThunk(
  "student/getAllStudent",
  async () => {
    const res = await API.get("/leade");
    return res.data;
  }
);

export const getOneStudent = createAsyncThunk(
  "student/getOneStudent",
  async (id) => {
    const res = await API.get(`/leade/${id}`);
    return res.data;
  }
);

export const createStudent = createAsyncThunk(
  "student/createStudent",
  async (data) => {
    const res = await API.post("/leade", data);
    return res.data;
  }
);
export const getVerifyMail = createAsyncThunk(
  "student/getVerifyMail",
  async (data) => {
    const res = await API.post("/leade/verify", data);
    return res.data;
  }
);

export const updateStudent = createAsyncThunk(
  "student/updateStudent",
  async (id, data) => {
    const res = await API.patch(`/leade${id}`, data);
    return res.data;
  }
);
export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (id) => {
    const res = await API.delete(`/leade/${id}`);
    return res.data;
  }
);
