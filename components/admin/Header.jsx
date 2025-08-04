'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { HiUsers, HiChartBar, HiCreditCard, HiCurrencyDollar, HiClipboardList, HiPhone, HiGlobeAlt, HiLightningBolt, HiDesktopComputer, HiOfficeBuilding, HiCalendar, HiChevronDown, HiCheck } from 'react-icons/hi'

// API function with optional days parameter
const fetchAdminStats = async (days = null) => {
  const url = days 
    ? `${process.env.NEXT_PUBLIC_API_URL}/admin/stats?days=${days}`
    : `${process.env.NEXT_PUBLIC_API_URL}/admin/stats`
    
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch stats')
  return response.json()
}

export default function HeaderWithStats() {
  const [selectedDays, setSelectedDays] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [customDays, setCustomDays] = useState('')
  const [showCustomInput, setShowCustomInput] = useState(false)

  // Predefined filter options
  const filterOptions = [
    { label: 'All Time', value: null },
    { label: 'Last 7 Days', value: 7 },
    { label: 'Last 14 Days', value: 14 },
    { label: 'Last 30 Days', value: 30 },
    { label: 'Last 60 Days', value: 60 },
    { label: 'Last 90 Days', value: 90 },
    { label: 'Custom Days...', value: 'custom' },
  ]

  const { data: stats, isLoading, error, refetch } = useQuery({
    queryKey: ['adminStats', selectedDays],
    queryFn: () => fetchAdminStats(selectedDays),
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

  const handleFilterChange = (value) => {
    if (value === 'custom') {
      setShowCustomInput(true)
    } else {
      setSelectedDays(value)
      setIsDropdownOpen(false)
      setShowCustomInput(false)
      setCustomDays('')
    }
  }

  const handleCustomDaysSubmit = () => {
    const days = parseInt(customDays)
    if (!isNaN(days) && days > 0) {
      setSelectedDays(days)
      setIsDropdownOpen(false)
      setShowCustomInput(false)
    }
  }

  const handleCustomDaysKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCustomDaysSubmit()
    }
  }

  const getSelectedFilterLabel = () => {
    // Check if it's a custom value (not in predefined options)
    const isCustomValue = selectedDays && !filterOptions.find(option => option.value === selectedDays)
    
    if (isCustomValue) {
      return `Last ${selectedDays} Days`
    }
    
    const selected = filterOptions.find(option => option.value === selectedDays)
    return selected ? selected.label : 'All Time'
  }

  const getDateRangeText = () => {
    if (!selectedDays || !stats?.data?.filterInfo?.dateRange) return ''
    
    const fromDate = new Date(stats.data.filterInfo.dateRange.from).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    const toDate = new Date(stats.data.filterInfo.dateRange.to).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
    
    return `${fromDate} - ${toDate}`
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-6 mb-8">
        <div className="text-center text-red-600">
          <p>Failed to load admin statistics</p>
          <button 
            onClick={() => refetch()} 
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

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4"
      >
        <div className="flex items-center gap-2">
          <HiCalendar className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">Showing data for:</span>
          <span className="font-medium text-gray-800">{getSelectedFilterLabel()}</span>
          {getDateRangeText() && (
            <span className="text-xs text-gray-500 ml-2">({getDateRangeText()})</span>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-xl text-black hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <HiCalendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium">{getSelectedFilterLabel()}</span>
            <HiChevronDown className={`w-4 h-4 text-black transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-10"
            >
              {filterOptions.map((option) => (
                <div key={option.label}>
                  {option.value === 'custom' && showCustomInput ? (
                    <div className="px-4 py-3 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={customDays}
                          onChange={(e) => setCustomDays(e.target.value)}
                          onKeyPress={handleCustomDaysKeyPress}
                          placeholder="Days"
                          min="1"
                          className="w-20 px-2 py-1 text-sm border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          autoFocus
                        />
                        <button
                          onClick={handleCustomDaysSubmit}
                          disabled={!customDays || isNaN(parseInt(customDays)) || parseInt(customDays) <= 0}
                          className="p-1 text-black rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                        >
                          <HiCheck className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleFilterChange(option.value)}
                      className={`w-full text-left text-black px-4 py-3 text-sm hover:bg-gray-50 transition-colors first:rounded-t-xl ${
                        option.value === 'custom' ? 'border-t border-gray-100' : ''
                      } ${
                        option.value === null && !option.value === 'custom' ? 'last:rounded-b-xl' : ''
                      } ${
                        selectedDays === option.value 
                          ? 'bg-blue-50 text-black font-medium' 
                          : 'text-black'
                      }`}
                    >
                      {option.label}
                    </button>
                  )}
                </div>
              ))}
            </motion.div>
          )}
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
              <p className="text-sm text-gray-600 mb-1 font-medium">Total Transactions</p>
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

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  )
}