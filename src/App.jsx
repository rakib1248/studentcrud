import { useEffect } from "react";
import "./App.css";

import { useDispatch } from "react-redux";
import { getAllStudent } from "./components/app/feature/student/studentApiSlice";

import Index from "./pages/Index";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import Loading from "./components/Loading";

function App() {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.student?.loading);

  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);

  return (
    <>
      {loading && <Loading />}
      <Index />
      <ToastContainer />
    </>
  );
}

export default App;
