'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import Image from 'next/image';
import logo from "../public/613bcd36a80da7e899327833b4d7b459d405b1f1.png";

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
          <div className='flex items-center gap-2'>
            <Image src={logo} alt="logo" width={65} height={65} />
            {/* <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl font-bold cursor-pointer ml-2" 
              style={{ color: 'rgba(0, 0, 0, 0.8)' }}
            >
              Sharp Pocket
            </motion.a> */}
          </div>

          <div className="flex gap-2 sm:gap-3">
            <motion.a
              href="#footer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="text-black px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border border-gray-200 hover:border-gray-300"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              Contact
            </motion.a>
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