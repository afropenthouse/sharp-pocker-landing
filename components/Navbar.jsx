'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
export default function Navbar() {
  return (
    <div>
         <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <motion.a 
            href="/"
            whileHover={{ scale: 1.05 }}
            className="text-xl sm:text-2xl font-bold cursor-pointer" 
            style={{ color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Sharp Pocket
          </motion.a>
          <div className="flex gap-2 sm:gap-3">
            <motion.a 
              href="#download" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            >
              <FaApple />
              <span className="hidden sm:inline">iOS</span>
            </motion.a>
            <motion.a 
              href="#download" 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            >
              <IoLogoAndroid />
              <span className="hidden sm:inline">Android</span>
            </motion.a>
          </div>
        </div>
      </motion.header>

    </div>
  )
}
