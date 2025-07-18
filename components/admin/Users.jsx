'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

// Mock API function - replace with your actual API call
const fetchUsers = async (page, search) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '20',
    ...(search && { search })
  })
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users?${params}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch users')
  return response.json()
}

const fetchUserDetails = async (userId) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch user details')
  return response.json()
}

function UserDetailsModal({ userId, isOpen, onClose }) {
  const { data: userDetails, isLoading } = useQuery({
    queryKey: ['userDetails', userId],
    queryFn: () => fetchUserDetails(userId),
    enabled: isOpen && !!userId,
  })

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 text-black"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            User Details
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : userDetails?.data ? (
          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <h4 className="font-semibold mb-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                Basic Information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Name</p>
                  <p className="font-medium">{userDetails.data.firstName} {userDetails.data.lastName}</p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{userDetails.data.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Join Date</p>
                  <p className="font-medium">
                    {new Date(userDetails.data.joinDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Wallet Info */}
            {userDetails.data.wallet && (
              <div>
                <h4 className="font-semibold mb-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Wallet Information
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Balance</p>
                    <p className="font-medium">{formatCurrency(userDetails.data.wallet.balance)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Virtual Account</p>
                    <p className="font-medium">
                      {userDetails.data.wallet.virtualAccountNumber || 'Not created'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Bank</p>
                    <p className="font-medium">
                      {userDetails.data.wallet.virtualAccountBankName || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Deposit</p>
                    <p className="font-medium">
                      {userDetails.data.wallet.lastDepositedAt 
                        ? new Date(userDetails.data.wallet.lastDepositedAt).toLocaleDateString()
                        : 'Never'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div>
              <h4 className="font-semibold mb-3" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                Activity Stats
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {userDetails.data.stats.totalTransactions}
                  </p>
                  <p className="text-xs text-gray-600">Total Transactions</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {userDetails.data.stats.totalBillTransactions}
                  </p>
                  <p className="text-xs text-gray-600">Bill Payments</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {userDetails.data.stats.totalReferrals}
                  </p>
                  <p className="text-xs text-gray-600">Referrals</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Failed to load user details</p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function UsersTab() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: usersData, isLoading, error } = useQuery({
    queryKey: ['users', currentPage, searchTerm],
    queryFn: () => fetchUsers(currentPage, searchTerm),
    keepPreviousData: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
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

  const handleUserClick = (userId) => {
    setSelectedUserId(userId)
    setIsModalOpen(true)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-6">
        <div className="text-center text-red-600">
          <p>Failed to load users</p>
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
    <>
      <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8">
        {/* Header and Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            User Management
          </h2>
          <div className="w-full sm:w-auto">
            <motion.input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={handleSearch}
              whileFocus={{ scale: 1.02 }}
              className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 transition-all text-black"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <motion.table 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full"
          >
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Name</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Email</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Wallet Balance</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Transactions</th>
                <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Join Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-2">
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-24"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-32"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-12"></div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                    </td>
                  </tr>
                ))
              ) : (
                usersData?.data?.users?.map((user) => (
                  <motion.tr
                    key={user.id}
                    variants={itemVariants}
                    onClick={() => handleUserClick(user.id)}
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                    className="border-b border-gray-100 cursor-pointer transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="font-medium" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        {user.firstName} {user.lastName}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-gray-600 text-sm">{user.email}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="font-medium" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        {formatCurrency(user.walletBalance)}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-gray-600">{user.totalTransactions}</div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-gray-600 text-sm">
                        {new Date(user.joinDate).toLocaleDateString()}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </motion.table>
        </div>

        {/* Pagination */}
        {usersData?.data?.pagination && (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <div className="text-sm text-gray-600">
              Showing {((usersData.data.pagination.currentPage - 1) * 20) + 1} to{' '}
              {Math.min(usersData.data.pagination.currentPage * 20, usersData.data.pagination.totalCount)} of{' '}
              {usersData.data.pagination.totalCount} users
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={!usersData.data.pagination.hasPreviousPage}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  usersData.data.pagination.hasPreviousPage
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                Previous
              </motion.button>
              <span className="px-3 py-2 text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                Page {usersData.data.pagination.currentPage} of {usersData.data.pagination.totalPages}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={!usersData.data.pagination.hasNextPage}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  usersData.data.pagination.hasNextPage
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
              </motion.button>
            </div>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        userId={selectedUserId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedUserId(null)
        }}
      />
    </>
  )
}