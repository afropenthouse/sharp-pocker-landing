'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { HiUsers, HiChartBar, HiCreditCard, HiCurrencyDollar, HiClipboardList, HiPhone, HiGlobeAlt, HiLightningBolt, HiDesktopComputer, HiOfficeBuilding } from 'react-icons/hi'

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

export default function HeaderWithStats() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['adminStats'],
    queryFn: fetchAdminStats,
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  // Get admin user info from sessionStorage
  const getAdminUser = () => {
    try {
      const adminUser = sessionStorage.getItem('adminUser')
      return adminUser ? JSON.parse(adminUser) : null
    } catch {
      return null
    }
  }

  const adminUser = getAdminUser()

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

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-6 mb-8">
        <div className="text-center text-red-600">
          <p>Failed to load admin statistics</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl text-sm hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8 mb-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 text-right">
          <p className="text-sm text-gray-500">Welcome back</p>
          <p className="font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            {adminUser ? `${adminUser.firstName} ${adminUser.lastName}` : 'Admin User'}
          </p>
        </div>
      </motion.div>

      {/* Stats Cards Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >
        {/* Total Users */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer relative"
        >
          <div className="absolute top-4 right-4">
            <HiUsers className="w-6 h-6 text-gray-600" />
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1 font-medium">Total Users</p>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                {formatNumber(stats?.data?.totalUsers || 0)}
              </p>
            </>
          )}
        </motion.div>

        {/* Total Transactions */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer relative"
        >
          <div className="absolute top-4 right-4">
            <HiChartBar className="w-6 h-6 text-gray-600" />
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1 font-medium">Total Transactions</p>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                {formatNumber(stats?.data?.totalTransactions || 0)}
              </p>
            </>
          )}
        </motion.div>

        {/* Total Wallet Balance */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer relative"
        >
          <div className="absolute top-4 right-4">
            <HiCreditCard className="w-6 h-6 text-gray-600" />
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1 font-medium">Total Wallet Balance</p>
              <p className="text-lg sm:text-xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                {formatCurrency(stats?.data?.totalWalletBalance || 0)}
              </p>
            </>
          )}
        </motion.div>

        {/* Total Revenue */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02, y: -2 }}
          className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer relative"
        >
          <div className="absolute top-4 right-4">
            <HiCurrencyDollar className="w-6 h-6 text-gray-600" />
          </div>
          {isLoading ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-300 rounded"></div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1 font-medium">Total Revenue</p>
              <p className="text-lg sm:text-xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                {formatCurrency(stats?.data?.totalRevenue || 0)}
              </p>
            </>
          )}
        </motion.div>
      </motion.div>

      {/* Bill Type Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t pt-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <HiClipboardList className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            Bill Type Breakdown
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-5 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : (
            Object.entries(stats?.data?.billTypeBreakdown || {}).map(([type, amount]) => {
              const getIcon = (type) => {
                switch(type) {
                  case 'AIRTIME':
                    return <HiPhone className="w-5 h-5" />
                  case 'DATA':
                    return <HiGlobeAlt className="w-5 h-5" />
                  case 'ELECTRICITY':
                    return <HiLightningBolt className="w-5 h-5" />
                  case 'CABLE':
                    return <HiDesktopComputer className="w-5 h-5" />
                  default:
                    return <HiOfficeBuilding className="w-5 h-5" />
                }
              }
              
              return (
                <motion.div
                  key={type}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center p-4 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all duration-200"
                >
                  <div className="flex justify-center mb-2 text-gray-600">
                    {getIcon(type)}
                  </div>
                  <p className="text-xs font-medium mb-2 capitalize text-gray-600">
                    {type.toLowerCase()}
                  </p>
                  <p className="text-sm sm:text-base font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {formatCurrency(amount)}
                  </p>
                </motion.div>
              )
            })
          )}
        </div>
      </motion.div>
    </div>
  )
}   