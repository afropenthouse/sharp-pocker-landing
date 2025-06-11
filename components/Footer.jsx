'use client'
import React from 'react'
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-white text-center py-6 sm:py-8 text-xs sm:text-sm"
    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
  >
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-3">
      <motion.a
        href="/privacy"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hover:opacity-80 transition-opacity underline underline-offset-2"
      >
        Privacy Policy
      </motion.a>
      <motion.a
        href="/terms"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="hover:opacity-80 transition-opacity underline underline-offset-2"
      >
        Terms of Service
      </motion.a>
    </div>
    <p>© 2025 Sharp Pocket. All rights reserved.</p>
  </motion.footer>
  )
}
