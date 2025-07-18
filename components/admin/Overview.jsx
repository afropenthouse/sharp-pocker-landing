'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

// Mock API function - replace with your actual API call
const fetchAdminStats = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/stats`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch stats')
  return response.json()
}

export default function OverviewTab() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

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
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  // Calculate percentages for bill types
  const calculatePercentage = (amount, total) => {
    if (!total || total === 0) return 0
    return ((amount / total) * 100).toFixed(1)
  }

  const billTypeData = stats?.data?.billTypeBreakdown || {}
  const totalBillAmount = Object.values(billTypeData).reduce((sum, amount) => sum + amount, 0)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-sm rounded-2xl p-6 sm:p-8"
    >
      <motion.h2
        variants={itemVariants}
        className="text-xl sm:text-2xl font-bold mb-6"
        style={{ color: 'rgba(0, 0, 0, 0.8)' }}
      >
        Platform Overview
      </motion.h2>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Quick Metrics */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            Key Metrics
          </h3>
          <div className="space-y-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
              ))
            ) : (
              <>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {formatNumber(stats?.data?.totalUsers || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Total Transactions</span>
                  <span className="font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {formatNumber(stats?.data?.totalTransactions || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Platform Balance</span>
                  <span className="font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {formatCurrency(stats?.data?.totalWalletBalance || 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {formatCurrency(stats?.data?.totalRevenue || 0)}
                  </span>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Service Usage Breakdown */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            Service Usage
          </h3>
          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex justify-between mb-2">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-4 bg-gray-300 rounded w-16"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded">
                    <div className="h-2 bg-gray-300 rounded" style={{ width: '60%' }}></div>
                  </div>
                </div>
              ))
            ) : (
              Object.entries(billTypeData).map(([type, amount]) => {
                const percentage = calculatePercentage(amount, totalBillAmount)
                return (
                  <div key={type}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium capitalize" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        {type.toLowerCase()}
                      </span>
                      <div className="text-right">
                        <span className="text-sm font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                          {formatCurrency(amount)}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </motion.div>
      </div>

      {/* Additional Insights */}
      <motion.div
        variants={itemVariants}
        className="mt-8 pt-6 border-t border-gray-200"
      >
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
          Platform Health
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-green-50 border border-green-200 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-600">✅</span>
              <span className="text-sm font-medium text-green-800">System Status</span>
            </div>
            <p className="text-sm text-green-600">All systems operational</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-blue-50 border border-blue-200 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-600">📈</span>
              <span className="text-sm font-medium text-blue-800">Uptime</span>
            </div>
            <p className="text-sm text-blue-600">99.9% uptime</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-purple-50 border border-purple-200 rounded-xl"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-purple-600">🔒</span>
              <span className="text-sm font-medium text-purple-800">Security</span>
            </div>
            <p className="text-sm text-purple-600">All transactions secure</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}