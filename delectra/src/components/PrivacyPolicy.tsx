import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Shield, 
  Eye, 
  Lock, 
  Globe, 
  Cookie, 
  UserCheck, 
  Mail,
  Database
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, x: -10 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.4 }
};

const PolicySection = ({ 
  icon: Icon, 
  number, 
  title, 
  children, 
  delay = 0 
}: { 
  icon: any, 
  number: string, 
  title: string, 
  children: React.ReactNode, 
  delay?: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group"
  >
    <div className="glass-card p-8 md:p-10 transition-all duration-500 hover:border-secondary/20 hover:shadow-[0_0_40px_rgba(221,183,255,0.03)]">
      {/* Section Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="w-12 h-12 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center shrink-0 group-hover:bg-secondary/15 transition-colors duration-500">
          <Icon className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.3em] text-secondary/60 block mb-1">
            Section {number}
          </span>
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      </div>

      {/* Section Content */}
      <div className="ml-0 md:ml-[68px]">
        {children}
      </div>
    </div>
  </motion.div>
);

const BulletItem = ({ children }: { children: React.ReactNode }) => (
  <motion.li 
    {...staggerItem}
    className="flex items-start gap-3 text-on-surface-variant text-[15px] leading-relaxed"
  >
    <div className="w-1.5 h-1.5 bg-secondary/60 rounded-full mt-2 shrink-0" />
    <span>{children}</span>
  </motion.li>
);

const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-y-auto">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-900/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed top-[50%] left-[50%] w-[600px] h-[600px] bg-purple-900/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* Decorative Grid Lines */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 left-[40%] w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 left-[60%] w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 left-[80%] w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>

      {/* Fixed Back Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-gutter py-4 flex items-center justify-between">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            onClick={onBack}
            className="inline-flex items-center gap-3 text-on-surface-variant hover:text-secondary font-heading font-bold uppercase tracking-widest text-xs transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Site
          </motion.button>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-secondary/50" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Legal
            </span>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div className="relative z-10 pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-gutter">

          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 glass-card px-6 py-3 mb-10"
            >
              <Shield className="w-4 h-4 text-secondary" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Your Data, Our Responsibility
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.95]">
              Privacy <br />
              <span className="text-gradient">Policy</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
              At Delectra, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, and safeguard the information you provide 
              while using our website and services.
            </p>

            <div className="flex items-center justify-center gap-6 text-gray-500">
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest">
                Last Updated: April 2026
              </span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest">
                Effective Immediately
              </span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div 
            {...fadeUp}
            className="flex items-center gap-4 mb-16"
          >
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <Lock className="w-4 h-4 text-secondary/30" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* Policy Sections */}
          <div className="flex flex-col gap-6">

            {/* 1. Information We Collect */}
            <PolicySection icon={Database} number="01" title="Information We Collect" delay={0}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-5">
                We may collect the following types of information when you interact with our website and services:
              </p>
              <motion.ul {...staggerContainer} className="flex flex-col gap-3">
                <BulletItem>Name and contact information</BulletItem>
                <BulletItem>Business or project-related details</BulletItem>
                <BulletItem>Information submitted through contact forms</BulletItem>
                <BulletItem>Device, browser, and analytics data</BulletItem>
                <BulletItem>Cookies and usage information</BulletItem>
              </motion.ul>
            </PolicySection>

            {/* 2. How We Use Information */}
            <PolicySection icon={Eye} number="02" title="How We Use Information" delay={0.05}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-5">
                We use the collected information for the following purposes:
              </p>
              <motion.ul {...staggerContainer} className="flex flex-col gap-3">
                <BulletItem>Communicate with clients and inquiries</BulletItem>
                <BulletItem>Deliver and improve our services</BulletItem>
                <BulletItem>Personalize user experience</BulletItem>
                <BulletItem>Analyze website performance and traffic</BulletItem>
                <BulletItem>Provide project updates and support</BulletItem>
              </motion.ul>
            </PolicySection>

            {/* 3. Data Protection */}
            <PolicySection icon={Lock} number="03" title="Data Protection" delay={0.1}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Delectra implements reasonable security measures to help protect user data from unauthorized 
                access, misuse, or disclosure. We continuously evaluate and improve our security practices 
                to ensure the integrity and confidentiality of your information.
              </p>
            </PolicySection>

            {/* 4. Third-Party Services */}
            <PolicySection icon={Globe} number="04" title="Third-Party Services" delay={0.15}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Our website may use trusted third-party tools and services such as analytics providers, 
                hosting platforms, communication tools, and payment processors. These services operate 
                under their own privacy policies and we encourage you to review them independently.
              </p>
            </PolicySection>

            {/* 5. Cookies */}
            <PolicySection icon={Cookie} number="05" title="Cookies" delay={0.2}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Cookies may be used to improve website functionality, user experience, and traffic analysis. 
                You can manage your cookie preferences through your browser settings at any time. Disabling 
                cookies may affect certain features of our website.
              </p>
            </PolicySection>

            {/* 6. User Rights */}
            <PolicySection icon={UserCheck} number="06" title="User Rights" delay={0.25}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Users may request access, correction, or deletion of their personal information by 
                contacting Delectra. We are committed to responding to all valid requests in a timely 
                manner and ensuring your rights over your data are respected.
              </p>
            </PolicySection>

            {/* 7. Contact Information */}
            <PolicySection icon={Mail} number="07" title="Contact Information" delay={0.3}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-5">
                For privacy-related questions, concerns, or requests regarding your personal data, 
                please reach out to us:
              </p>
              <div className="glass-card p-5 inline-flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-secondary/60 block">
                    Email Us
                  </span>
                  <span className="text-white text-sm font-heading">team@delectra.in</span>
                </div>
              </div>
            </PolicySection>
          </div>

          {/* Acceptance Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="glass-card p-8 md:p-10 border-secondary/10 text-center">
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-on-surface text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                By using this website, you agree to the terms outlined in this Privacy Policy.
              </p>
              <p className="text-gray-500 text-sm mt-4 font-heading">
                © 2026 Delectra. All rights reserved.
              </p>
            </div>
          </motion.div>

          {/* Bottom Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-16"
          >
            <motion.button
              whileHover={{ x: -5 }}
              onClick={onBack}
              className="inline-flex items-center gap-3 text-secondary font-heading font-bold uppercase tracking-widest text-sm group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Site
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
