'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, CreditCard, AlertTriangle, Scale } from 'lucide-react';

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: <FileText size={24} />,
      content: [
        {
          subtitle: "Agreement to Terms",
            text: "By accessing or using Sharp Pocket's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services."
        },
        {   
          subtitle: "Changes to Terms",
          text: "We reserve the right to modify these terms at any time. We will notify you of any changes by posting the new Terms of Service on this page. Your continued use of the service after any such changes constitutes your acceptance of the new terms."
        }
      ]
    },
    {
      title: "Use of Services",
      icon: <CreditCard size={24} />,
      content: [
        {
          subtitle: "Eligible Users",
          text: "You must be at least 18 years old and have the legal capacity to enter into agreements to use our services. You must provide accurate and complete information when creating your account."
        },
        {
          subtitle: "Account Security",
          text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account."
        },
        {
          subtitle: "Prohibited Activities",
          text: "You may not use our services for any unlawful purposes, including but not limited to money laundering, fraud, or financing illegal activities. You may not attempt to gain unauthorized access to our systems or other users' accounts."
        }
      ]
    },
    {
      title: "Payment Services",
      icon: <Scale size={24} />,
      content: [
        {
          subtitle: "Transaction Processing",
          text: "Sharp Pocket facilitates payment transactions but does not guarantee the completion of any transaction. We may refuse to process transactions that we determine to be high-risk or in violation of these terms."
        },
        {
          subtitle: "Fees and Charges",
          text: "Some services may be subject to fees. All applicable fees will be clearly disclosed before you complete a transaction. Fees are non-refundable except as required by law."
        },
        {
          subtitle: "Transaction Limits",
          text: "We may impose limits on the amount or frequency of transactions. These limits may vary based on your account verification level and transaction history."
        }
      ]
    },
    {
      title: "Limitations and Liability",
      icon: <AlertTriangle size={24} />,
      content: [
        {
          subtitle: "Service Availability",
          text: "We strive to maintain service availability but cannot guarantee uninterrupted access. We may suspend or terminate services for maintenance, security, or other operational reasons."
        },
        {
          subtitle: "Limitation of Liability",
          text: "To the maximum extent permitted by law, Sharp Pocket shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services."
        },
        {
          subtitle: "Dispute Resolution",
          text: "Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration association."
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
            <FileText size={32} style={{ color: 'rgba(0, 0, 0, 0.8)' }} />
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
            Terms of Service
          </h2>
          <p className="text-base sm:text-lg mb-4" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
            Please read these terms carefully before using Sharp Pocket's payment services.
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

          {/* Additional Terms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              Additional Important Terms
            </h3>
            
            <div className="space-y-6 text-gray-600">
              <div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Termination
                </h4>
                <p>
                  We may terminate or suspend your account at any time, with or without notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Governing Law
                </h4>
                <p>
                  These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law principles.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                  Severability
                </h4>
                <p>
                  If any provision of these terms is found to be unenforceable, the remaining provisions will continue to be valid and enforceable.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm text-center"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'rgba(0, 0, 0, 0.8)' }}>
              Questions About These Terms?
            </h3>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <motion.a
              href="mailto:legal@sharppocket.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            >
              legal@sharppocket.com
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

     
    </div>
  );
};

export default TermsOfService;