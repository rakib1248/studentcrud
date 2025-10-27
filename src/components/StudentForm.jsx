import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createStudent,
  getVerifyMail,
} from "./app/feature/student/studentApiSlice";
import { useRef } from "react";
import Modal from "./Modal";
import { generate6DigitCode } from "../utils/helper";
import { useEffect } from "react";

import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { useSelector } from "react-redux";

const StudentForm = () => {
  const data = useSelector((state) => state.student?.students);

  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [mailChack, setMaitChack] = useState(false);
  const [verify, setVerify] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dec: "",
    code: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    if (name === "email") {
      const exist = data.some((item) => item.email.trim() === value.trim());

      if (exist) {
        setMaitChack(true);
      } else {
        setMaitChack(false);
      }
    }
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      code: generate6DigitCode().toString(),
    }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, email, dec, file } = formData;
    if (!fullName || !email || !dec || !file)
      return toast.error("All Fealds Are Requared", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    if (mailChack) {
      toast.error("your Email Alrady exist ", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setOpen(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        code: formData.code,
      };
      toast.info("Chack Your Email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      dispatch(getVerifyMail(payload));
    }
  };

  // verify submit
  const handleverifySubmit = () => {
    if (formData.code === verify) {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("dec", formData.dec);
      if (formData.file) data.append("file", formData.file);

      dispatch(createStudent(data));

      const newcode = generate6DigitCode();
      setFormData({
        fullName: "",
        email: "",
        code: newcode,
        dec: "",
        file: null,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setOpen(false);
    } else {
      toast.error("invalide Code Chack Your Email", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 my-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}

        <div>
          <label
            htmlFor="name"
            className="block mb-1 font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className={`block mb-1 font-medium ${
              mailChack ? "text-red-500" : "text-gray-700"
            }`}>
            {mailChack ? "Email Already Exist" : "Email Address"}
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full p-2 border rounded-lg focus:ring-2 ${
              mailChack
                ? "focus:ring-red-500 border-red-500"
                : "focus:ring-blue-500 border-gray-300 "
            } outline-none`}
            required
          />
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="dec" className="block mb-1 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="dec"
            name="dec"
            value={formData.dec}
            onChange={handleChange}
            placeholder="Write something..."
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
        </div>

        {/* File Upload */}
        <div>
          <label
            htmlFor="file"
            className="block mb-1 font-medium text-gray-700">
            Upload Image
          </label>
          <input
            id="file"
            type="file"
            name="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleChange}
            className="w-full text-sm text-gray-600"
          />
        </div>
        <input
          type="hidden"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="w-full text-sm text-gray-600"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200">
          Save
        </button>
      </form>
      {/* modal */}
      <Modal isOpen={open} onClose={() => setOpen(false)} title="Verification">
        <p className="text-gray-700 text-center">
          Enter your 6-digit verification code below:
        </p>
        <input
          type="text"
          onChange={(e) => setVerify(e.target.value)}
          maxLength="6"
          className="w-full border p-2 rounded mt-4 text-center text-lg tracking-widest"
          placeholder="______"
        />
        <button
          onClick={() => handleverifySubmit()}
          className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
          Verify
        </button>
      </Modal>
      {/* modal */}
    </div>
  );
};

export default StudentForm;
