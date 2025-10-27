import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm z-50">
      <motion.div
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />
      <motion.p
        className="ml-4 text-lg font-semibold text-blue-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}>
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;
