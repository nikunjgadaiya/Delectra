import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Cookie,
  HelpCircle,
  Settings,
  Layers,
  Globe,
  SlidersHorizontal,
  RefreshCw,
  Mail,
  Fingerprint
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

const CookieSection = ({
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

const CookieTypeCard = ({ label, description }: { label: string, description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4 }}
    className="glass-card p-5 hover:border-secondary/15 transition-all duration-400"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-2 h-2 bg-secondary rounded-full" />
      <span className="font-heading text-sm font-bold text-white">{label}</span>
    </div>
    <p className="text-on-surface-variant text-[13px] leading-relaxed ml-5">
      {description}
    </p>
  </motion.div>
);

const CookiesPolicy = ({ onBack }: { onBack: () => void }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="fixed inset-0 z-[100] bg-black overflow-y-auto"
    >
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-900/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/8 blur-[100px] rounded-full pointer-events-none" />
      <div className="fixed top-[50%] left-[50%] w-[600px] h-[600px] bg-purple-900/5 blur-[150px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />



      {/* Fixed Top Bar */}
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
            <Fingerprint className="w-4 h-4 text-secondary/50" />
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
              <Cookie className="w-4 h-4 text-secondary" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Transparency & Trust
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.95]">
              Cookies <br />
              <span className="text-gradient">Policy</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
              This Cookies Policy explains how Delectra uses cookies and similar technologies
              to improve user experience, analyze website performance, and enhance functionality.
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
            <Cookie className="w-4 h-4 text-secondary/30" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* Cookie Sections */}
          <div className="flex flex-col gap-6">

            {/* 1. What Are Cookies */}
            <CookieSection icon={HelpCircle} number="01" title="What Are Cookies" delay={0}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Cookies are small text files stored on a user's device when visiting a website.
                They help websites remember user preferences, login details, and browsing habits
                to improve the overall browsing experience. Cookies are widely used across the
                internet and are essential for many modern web features.
              </p>
            </CookieSection>

            {/* 2. How We Use Cookies */}
            <CookieSection icon={Settings} number="02" title="How We Use Cookies" delay={0.05}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-5">
                Delectra may use cookies to:
              </p>
              <motion.ul {...staggerContainer} className="flex flex-col gap-3">
                <BulletItem>Improve website functionality and performance</BulletItem>
                <BulletItem>Analyze website traffic and user behavior patterns</BulletItem>
                <BulletItem>Remember user preferences and settings</BulletItem>
                <BulletItem>Enhance and personalize the user experience</BulletItem>
                <BulletItem>Support marketing and analytics tools</BulletItem>
              </motion.ul>
            </CookieSection>

            {/* 3. Types of Cookies We Use */}
            <CookieSection icon={Layers} number="03" title="Types of Cookies We Use" delay={0.1}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-6">
                We categorize the cookies used on our website into the following types:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CookieTypeCard
                  label="Essential Cookies"
                  description="Required for basic website functionality such as page navigation and secure access."
                />
                <CookieTypeCard
                  label="Analytics Cookies"
                  description="Help us understand how visitors interact with our website by collecting anonymous data."
                />
                <CookieTypeCard
                  label="Performance Cookies"
                  description="Monitor site speed and reliability to ensure an optimal browsing experience."
                />
                <CookieTypeCard
                  label="Functional Cookies"
                  description="Remember your preferences and choices to provide a more personalized experience."
                />
              </div>
            </CookieSection>

            {/* 4. Third-Party Cookies */}
            <CookieSection icon={Globe} number="04" title="Third-Party Cookies" delay={0.15}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Some trusted third-party services, such as analytics providers, embedded tools,
                and performance monitoring platforms, may place cookies on your device when you
                visit our website. These third-party cookies are governed by the respective
                privacy policies of those services, and we encourage you to review them for
                further details.
              </p>
            </CookieSection>

            {/* 5. Managing Cookies */}
            <CookieSection icon={SlidersHorizontal} number="05" title="Managing Cookies" delay={0.2}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                You can control or disable cookies through your browser settings at any time.
                Most browsers allow you to view, manage, and delete cookies individually or
                block them entirely. Please note that disabling certain cookies may affect
                specific website features or functionality, and some parts of the site may
                not operate as intended.
              </p>
            </CookieSection>

            {/* 6. Updates to This Policy */}
            <CookieSection icon={RefreshCw} number="06" title="Updates to This Policy" delay={0.25}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Delectra may update this Cookies Policy periodically to reflect changes in
                technology, legal requirements, or our operational practices. We recommend
                revisiting this page from time to time to stay informed about how we use cookies.
              </p>
            </CookieSection>

            {/* 7. Contact */}
            <CookieSection icon={Mail} number="07" title="Contact" delay={0.3}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-5">
                If you have any questions regarding this Cookies Policy, feel free to reach out:
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
            </CookieSection>
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
                  <Cookie className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-on-surface text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                By continuing to use this website, you consent to the use of cookies as outlined in this policy.
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

export default CookiesPolicy;
