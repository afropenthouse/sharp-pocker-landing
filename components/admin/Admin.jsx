'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HeaderWithStats from './Header'
import TabNavigation from './Tabs'
import OverviewTab from './Overview'
import UsersTab from './Users'
import TransactionsTab from './Transactions'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

function AdminDashboardContent() {
  const [activeTab, setActiveTab] = useState('overview')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />
      case 'users':
        return <UsersTab />
      case 'transactions':
        return <TransactionsTab />
      default:
        return <OverviewTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header with Stats */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <HeaderWithStats />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminDashboardContent />
    </QueryClientProvider>
  )
}