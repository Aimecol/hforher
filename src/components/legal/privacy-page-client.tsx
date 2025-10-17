'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Users, Mail, Phone } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PrivacyPageClient() {
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: Users,
      content: [
        'Personal information you provide when creating an account, placing orders, or contacting us',
        'Payment and billing information processed securely through our payment partners',
        'Shipping and delivery addresses for order fulfillment',
        'Communication preferences and marketing consent',
        'Device and usage information to improve our website experience',
        'Cookies and similar technologies for website functionality and analytics'
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'Process and fulfill your orders and provide customer service',
        'Communicate with you about your orders, account, and our services',
        'Send marketing communications (only with your consent)',
        'Improve our website, products, and services based on usage patterns',
        'Prevent fraud and ensure the security of our platform',
        'Comply with legal obligations and resolve disputes'
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: Shield,
      content: [
        'We do not sell, trade, or rent your personal information to third parties',
        'We share information with trusted service providers who help us operate our business',
        'Payment processors handle your payment information securely',
        'Shipping partners receive necessary delivery information',
        'We may disclose information if required by law or to protect our rights',
        'With your consent, we may share information with marketing partners'
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: [
        'We use industry-standard encryption to protect your data in transit and at rest',
        'Our payment processing is PCI DSS compliant',
        'Regular security audits and monitoring of our systems',
        'Access to personal information is restricted to authorized personnel only',
        'We maintain backup and disaster recovery procedures',
        'Security training for all employees handling personal data'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-blush-pink/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 bg-champagne-beige/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-champagne-beige" />
            </div>
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-jet-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-warm-gray text-lg">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-warm-gray text-sm mt-2">
              Last updated: October 15, 2024
            </p>
          </motion.div>

          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <Card className="border-0 shadow-brand">
              <CardContent className="p-8">
                <p className="text-warm-gray leading-relaxed mb-4">
                  At H for Her, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
                  website, make purchases, or interact with our services.
                </p>
                <p className="text-warm-gray leading-relaxed">
                  By using our website and services, you consent to the collection and use of information in accordance with this policy. 
                  If you do not agree with our policies and practices, please do not use our services.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
              >
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <div className="w-10 h-10 bg-champagne-beige/20 rounded-lg flex items-center justify-center mr-3">
                        <section.icon className="h-5 w-5 text-champagne-beige" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-champagne-beige rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-warm-gray">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-brand bg-gradient-primary">
              <CardHeader>
                <CardTitle className="text-2xl text-jet-black">Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-jet-black mb-2">Access & Correction</h4>
                    <p className="text-jet-black/80 text-sm">
                      You can access and update your personal information through your account settings or by contacting us.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-jet-black mb-2">Data Portability</h4>
                    <p className="text-jet-black/80 text-sm">
                      You can request a copy of your personal data in a structured, commonly used format.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-jet-black mb-2">Marketing Opt-out</h4>
                    <p className="text-jet-black/80 text-sm">
                      You can unsubscribe from marketing communications at any time using the unsubscribe link.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-jet-black mb-2">Account Deletion</h4>
                    <p className="text-jet-black/80 text-sm">
                      You can request deletion of your account and personal data, subject to legal retention requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Cookies Policy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8"
          >
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl">Cookies & Tracking Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-gray mb-4">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, 
                  and understand where our visitors are coming from.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blush-pink/30 rounded-lg">
                    <h5 className="font-semibold text-jet-black mb-2">Essential Cookies</h5>
                    <p className="text-sm text-warm-gray">Required for basic website functionality and security.</p>
                  </div>
                  <div className="p-4 bg-blush-pink/30 rounded-lg">
                    <h5 className="font-semibold text-jet-black mb-2">Analytics Cookies</h5>
                    <p className="text-sm text-warm-gray">Help us understand how visitors interact with our website.</p>
                  </div>
                  <div className="p-4 bg-blush-pink/30 rounded-lg">
                    <h5 className="font-semibold text-jet-black mb-2">Marketing Cookies</h5>
                    <p className="text-sm text-warm-gray">Used to deliver relevant advertisements and track campaign performance.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12"
          >
            <Card className="border-2 border-champagne-beige">
              <CardHeader>
                <CardTitle className="text-xl">Questions About This Policy?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-warm-gray mb-6">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-champagne-beige mr-3" />
                    <div>
                      <p className="font-semibold text-jet-black">Email</p>
                      <p className="text-warm-gray">privacy@hforher.rw</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-champagne-beige mr-3" />
                    <div>
                      <p className="font-semibold text-jet-black">Phone</p>
                      <p className="text-warm-gray">+250 788 123 456</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-warm-gray mt-6">
                  This policy may be updated from time to time. We will notify you of any material changes by posting 
                  the new policy on this page and updating the "Last updated" date.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
