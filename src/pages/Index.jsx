import { GraduationCap } from "lucide-react";

import StudentTable from "../components/StudentList";
import StudentForm from "../components/StudentForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-b from-slate-100 to-white">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-2xl bg-blue-100 shadow-md">
              <GraduationCap className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Student Management System
          </h1>
          <p className="text-gray-500 text-lg">
            Manage your student records efficiently
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-4">
            <StudentForm />
          </div>

          {/* List Section */}
          <div className="lg:col-span-8">
            <StudentTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
