'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function TabNavigation({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'transactions', label: 'Transactions', icon: '💳' }
  ]

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-2">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
            }`}
            style={{
              backgroundColor: activeTab === tab.id ? 'rgba(0, 0, 0, 0.8)' : 'transparent'
            }}
          >
            {/* Active background indicator */}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-xl -z-10"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* Tab content */}
            <span className="text-lg">{tab.icon}</span>
            <span className="text-sm sm:text-base">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}