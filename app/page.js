'use client'
import React from 'react';
import { motion } from 'framer-motion';
import appLogo from "../public/Screenshot 2025-06-13 192715.png";
import Image from 'next/image';

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
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-12 px-4 sm:px-6" style={{ backgroundColor: '#D9D3F1' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left lg:-mt-20"
            >
              <motion.h2 
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight" 
                style={{ color: 'rgba(0, 0, 0, 0.8)' }}
              >
                Your Pocket-Sized Payment Power
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 leading-relaxed" 
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

            {/* App Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="lg:mr-16"
              >
                <Image
                  src={appLogo}
                  alt="Sharp Pocket App Screenshot" 
                  className="w-72 h-auto rounded-2xl shadow-2xl lg:transform lg:rotate-[8deg]"
                  width={500}
                  height={500}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
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
    </div>
  );
};

export default ShopPocketLanding;