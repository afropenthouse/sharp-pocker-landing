'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { IoLogoAndroid } from "react-icons/io";
import { FaApple } from "react-icons/fa";
const ShopPocketLanding = () => {
  const features = [
    {
      title: "Pay Bills",
      description: "Handle all your bill payments with a few taps—no queues, no hassle.",
      icon: "💳"
    },
    {
      title: "Electricity", 
      description: "Top up your electricity quickly and stay powered at all times.",
      icon: "⚡"
    },
    {
      title: "Buy Airtime & Data",
      description: "Recharge your phone instantly—any network, anytime.",
      icon: "📱"
    },
    {
      title: "Send Money",
      description: "Send funds from your Sharp Pocket wallet to friends and family securely.",
      icon: "💸"
    },
    {
      title: "Withdraw Easily",
      description: "Need cash? Withdraw funds from your app to any account, fast.",
      icon: "🏦"
    },
    {
      title: "Secure & Reliable",
      description: "All your transactions are protected with top-level security and encryption.",
      icon: "🔒"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-sm sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex justify-between items-center">
          <motion.h1 
            whileHover={{ scale: 1.05 }}
            className="text-xl sm:text-2xl font-bold cursor-pointer" 
            style={{ color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Sharp Pocket
          </motion.h1>
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

      {/* Hero Section */}
      <section className="text-center py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: '#D9D3F1' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight" 
            style={{ color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Your Pocket-Sized Payment Power
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-2" 
            style={{ color: 'rgba(0, 0, 0, 0.6)' }}
          >
            With Sharp Pocket, pay bills, buy airtime and data, settle electricity, and send or withdraw money—fast, simple, and secure.
          </motion.p>
          <motion.a 
            href="#download" 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold shadow-lg transition-all duration-200"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            Download Now
          </motion.a>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                y: -5,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
              className="p-6 sm:p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <motion.div 
                className="text-3xl sm:text-4xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-200"
              >
                {feature.icon}
              </motion.div>
              <motion.h3 
                className="text-lg sm:text-xl font-semibold mb-3 group-hover:scale-105 transition-transform duration-200" 
                style={{ color: 'rgba(0, 0, 0, 0.8)' }}
              >
                {feature.title}
              </motion.h3>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Download CTA */}
      <motion.section 
        id="download" 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-white text-center py-16 sm:py-20 px-4 sm:px-6"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        <motion.h2 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6"
        >
          Start Using Sharp Pocket Today
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8 text-base sm:text-lg"
        >
          Available on Android and iOS soon.
        </motion.p>
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 max-w-md mx-auto"
        >
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 text-sm sm:text-base"
            style={{ backgroundColor: '#D9D3F1', color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Get on Android
          </motion.a>
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold shadow-lg transition-all duration-200 text-sm sm:text-base"
            style={{ backgroundColor: '#D9D3F1', color: 'rgba(0, 0, 0, 0.8)' }}
          >
            Get on iOS
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-white text-center py-6 sm:py-8 text-xs sm:text-sm"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      >
        © 2025 Sharp Pocket. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default ShopPocketLanding;