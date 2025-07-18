'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'

// Mock API function - replace with your actual API call
const fetchTransactions = async (page, filters) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '20',
    ...filters
  })
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/transactions?${params}`, {
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('adminToken')}`,
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) throw new Error('Failed to fetch transactions')
  return response.json()
}

export default function TransactionsTab() {
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    startDate: '',
    endDate: ''
  })

  const { data: transactionsData, isLoading, error } = useQuery({
    queryKey: ['transactions', currentPage, filters],
    queryFn: () => fetchTransactions(currentPage, filters),
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800'
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'FAILED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case 'CREDIT':
        return 'bg-blue-100 text-blue-800'
      case 'DEBIT':
        return 'bg-orange-100 text-orange-800'
      case 'BILL_PAYMENT':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1) // Reset to first page when filtering
  }

  const clearFilters = () => {
    setFilters({
      status: '',
      type: '',
      startDate: '',
      endDate: ''
    })
    setCurrentPage(1)
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-2xl p-6">
        <div className="text-center text-red-600">
          <p>Failed to load transactions</p>
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
    <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-8 text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
          Transaction Management
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          >
            <option value="">All</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          >
            <option value="">All</option>
            <option value="CREDIT">Credit</option>
            <option value="DEBIT">Debit</option>
            <option value="BILL_PAYMENT">Bill Payment</option>
            <option value="TOPUP">Top Up</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Start Date</label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">End Date</label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20"
          />
        </div>

        <div className="flex items-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="w-full px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
          >
            Clear
          </motion.button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <motion.table 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full"
        >
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Transaction ID</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">User</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Amount</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Type</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Status</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Service</th>
              <th className="text-left py-4 px-2 text-sm font-semibold text-gray-600">Date</th>
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
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-16"></div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="animate-pulse h-4 bg-gray-200 rounded w-20"></div>
                  </td>
                </tr>
              ))
            ) : (
              transactionsData?.data?.transactions?.map((transaction) => (
                <motion.tr
                  key={transaction.id}
                  variants={itemVariants}
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                  className="border-b border-gray-100 transition-colors"
                >
                  <td className="py-4 px-2">
                    <div className="font-mono text-sm text-gray-600">
                      {transaction.txRef.slice(-8)}...
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div>
                      <div className="font-medium text-sm" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        {transaction.user.name}
                      </div>
                      <div className="text-xs text-gray-500">{transaction.user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className={`font-medium ${transaction.type === 'CREDIT' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'CREDIT' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-sm text-gray-600">
                      {transaction.billInfo ? (
                        <div>
                          <div className="font-medium">{transaction.billInfo.serviceType}</div>
                          <div className="text-xs">{transaction.billInfo.provider}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-2">
                    <div className="text-sm text-gray-600">
                      {new Date(transaction.createdAt).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(transaction.createdAt).toLocaleTimeString()}
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </motion.table>
      </div>

      {/* Pagination */}
      {transactionsData?.data?.pagination && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-sm text-gray-600">
            Showing {((transactionsData.data.pagination.currentPage - 1) * 20) + 1} to{' '}
            {Math.min(transactionsData.data.pagination.currentPage * 20, transactionsData.data.pagination.totalCount)} of{' '}
            {transactionsData.data.pagination.totalCount} transactions
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={!transactionsData.data.pagination.hasPreviousPage}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                transactionsData.data.pagination.hasPreviousPage
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-400 cursor-not-allowed'
              }`}
            >
              Previous
            </motion.button>
            <span className="px-3 py-2 text-sm font-medium" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              Page {transactionsData.data.pagination.currentPage} of {transactionsData.data.pagination.totalPages}
            </span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={!transactionsData.data.pagination.hasNextPage}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                transactionsData.data.pagination.hasNextPage
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
  )
}