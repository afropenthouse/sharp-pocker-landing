'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: <Eye size={24} />,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, make transactions, or contact customer support. This includes your name, email address, phone number, and financial account information."
        },
        {
          subtitle: "Transaction Data",
          text: "We collect information about your payment transactions, including the amount, date, merchant information, and transaction history to provide our services and prevent fraud."
        },
        {
          subtitle: "Device Information",
          text: "We automatically collect certain information about your device, including your IP address, device type, operating system, and mobile device identifiers."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: <UserCheck size={24} />,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our payment services, process transactions, and communicate with you about your account."
        },
        {
          subtitle: "Security and Fraud Prevention",
          text: "We use your information to detect, prevent, and address fraud, security issues, and other harmful or illegal activities."
        },
        {
          subtitle: "Legal Compliance",
          text: "We may use your information to comply with applicable laws, regulations, and legal processes, including anti-money laundering and know-your-customer requirements."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: <Shield size={24} />,
      content: [
        {
          subtitle: "Service Providers",
          text: "We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, and customer support."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of Sharp Pocket or others."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the business transaction."
        }
      ]
    },
    {
      title: "Data Security",
      icon: <Lock size={24} />,
      content: [
        {
          subtitle: "Encryption",
          text: "We use industry-standard encryption to protect your personal and financial information during transmission and storage."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and authentication measures to ensure only authorized personnel can access your information."
        },
        {
          subtitle: "Regular Monitoring",
          text: "We continuously monitor our systems for security vulnerabilities and potential threats to protect your data."
        }
      ]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
     

      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: '#D9D3F1' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-6"
          >
            <Shield size={32} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            Privacy Policy
          </h2>
          <p className="text-base sm:text-lg mb-4" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-gray-500">
            Last updated: June, 2025
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-12"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl" style={{ backgroundColor: '#D9D3F1' }}>
                  <div style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                    {section.icon}
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  {section.title}
                </h3>
              </div>
              
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                      {item.subtitle}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              Questions About This Policy?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <motion.a
              href="mailto:privacy@sharppocket.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            >
                    privacy@sharppocket.com
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

    
    </div>
  );
};

export default PrivacyPolicy;