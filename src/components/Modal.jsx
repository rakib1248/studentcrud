import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120 },
  },
  exit: { opacity: 0, scale: 0.8, y: 50 },
};

const Modal = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}>
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
              ✕
            </button>

            {/* Title */}
            {title && (
              <h2 className="text-xl font-semibold mb-4 text-center">
                {title}
              </h2>
            )}

            {/* Content */}
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
