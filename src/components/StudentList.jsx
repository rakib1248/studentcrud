import { motion } from "framer-motion";

import { View } from "lucide-react";

import { BiEditAlt } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { deleteStudent } from "./app/feature/student/studentApiSlice";

const StudentTable = () => {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.student);

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div className="overflow-x-auto mt-6 px-4">
      <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Description</th>
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((stu, index) => (
              <motion.tr
                key={stu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1, // প্রত্যেকটা রো একটু একটু করে দেরিতে আসবে
                  ease: "easeOut",
                }}
                className="border-t hover:bg-gray-50 transition duration-150">
                <td className="py-2 px-4 font-medium">{stu.fullName}</td>
                <td className="py-2 px-4">{stu.email}</td>
                <td className="py-2 px-4 text-gray-700">{stu.dec}</td>
                <td className="py-2 px-4">
                  {stu.image ? (
                    <img
                      src={
                        typeof stu.image === "string"
                          ? stu.image
                          : URL.createObjectURL(stu.file)
                      }
                      alt="student"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="py-2 px-4 text-gray-700 flex gap-2">
                  <button className="text-blue-500 text-2xl cursor-pointer rounded">
                    <View />
                  </button>
                  <button className="text-yellow-500 text-2xl cursor-pointer rounded">
                    <BiEditAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(stu.id)}
                    className="text-red-500 text-2xl cursor-pointer rounded">
                    <IoTrashOutline />
                  </button>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-4 italic">
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
