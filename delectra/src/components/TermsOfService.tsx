import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  Briefcase,
  Users,
  CreditCard,
  Key,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Mail,
  Scale
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const TermsSection = ({
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
            Article {number}
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

const TermsOfService = ({ onBack }: { onBack: () => void }) => {
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
            <Scale className="w-4 h-4 text-secondary/50" />
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
              <FileText className="w-4 h-4 text-secondary" />
              <span className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">
                Agreement & Guidelines
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 tracking-tighter leading-[0.95]">
              Terms of <br />
              <span className="text-gradient">Service</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto leading-relaxed mb-8">
              By accessing or using Delectra's website and services, you agree to comply with
              these Terms of Service. Please read them carefully before using our services.
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
            <FileText className="w-4 h-4 text-secondary/30" />
            <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>

          {/* Terms Sections */}
          <div className="flex flex-col gap-6">

            {/* 1. Services */}
            <TermsSection icon={Briefcase} number="01" title="Services" delay={0}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Delectra provides digital services including branding, web development, UI/UX design,
                social media management, creative editing, and related marketing solutions. The scope
                of each engagement is defined through mutual agreement between Delectra and the client
                prior to project commencement.
              </p>
            </TermsSection>

            {/* 2. Client Responsibilities */}
            <TermsSection icon={Users} number="02" title="Client Responsibilities" delay={0.05}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Clients agree to provide accurate information, timely communication, and any required
                materials necessary for project completion. Delays caused by insufficient or late
                provision of required assets may impact project timelines and deliverables.
              </p>
            </TermsSection>

            {/* 3. Payments */}
            <TermsSection icon={CreditCard} number="03" title="Payments" delay={0.1}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Project pricing, payment schedules, and deliverables are discussed and agreed upon
                before work begins. Payments made are generally non-refundable once work has commenced,
                unless otherwise agreed in writing. All invoices are to be settled within the
                agreed-upon timeframe to ensure uninterrupted service delivery.
              </p>
            </TermsSection>

            {/* 4. Intellectual Property */}
            <TermsSection icon={Key} number="04" title="Intellectual Property" delay={0.15}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Unless stated otherwise, final approved deliverables provided to clients become
                the client's property after full payment has been received. Delectra reserves the
                right to showcase completed work in its portfolio, case studies, and promotional
                materials unless the client requests otherwise in writing.
              </p>
            </TermsSection>

            {/* 5. Project Timelines */}
            <TermsSection icon={Clock} number="05" title="Project Timelines" delay={0.2}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Project timelines may vary depending on client feedback, revisions, delays in
                communication, or changes in project scope. Delectra strives to meet all agreed
                deadlines but cannot guarantee fixed delivery dates when external factors introduce
                delays beyond our control.
              </p>
            </TermsSection>

            {/* 6. Acceptable Use */}
            <TermsSection icon={ShieldCheck} number="06" title="Acceptable Use" delay={0.25}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Users may not misuse the website, attempt unauthorized access to any part of the
                platform, distribute harmful or malicious content, or engage in activities that
                disrupt or interfere with Delectra's services, infrastructure, or other users'
                experience.
              </p>
            </TermsSection>

            {/* 7. Limitation of Liability */}
            <TermsSection icon={AlertTriangle} number="07" title="Limitation of Liability" delay={0.3}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Delectra shall not be held responsible for indirect, incidental, special, or
                consequential damages, losses, or issues arising from the use of its services
                or website. Our total liability shall not exceed the amount paid by the client
                for the specific service in question.
              </p>
            </TermsSection>

            {/* 8. Changes to Terms */}
            <TermsSection icon={RefreshCw} number="08" title="Changes to Terms" delay={0.35}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed">
                Delectra may update or modify these Terms of Service at any time without prior
                notice. Continued use of the website or services following any changes constitutes
                acceptance of the revised terms. We recommend reviewing this page periodically
                for updates.
              </p>
            </TermsSection>

            {/* 9. Contact */}
            <TermsSection icon={Mail} number="09" title="Contact" delay={0.4}>
              <p className="text-on-surface-variant text-[15px] leading-relaxed mb-5">
                Users may contact Delectra regarding any questions, concerns, or clarifications
                related to these terms:
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
            </TermsSection>
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
                  <FileText className="w-5 h-5 text-secondary" />
                </div>
              </div>
              <p className="text-on-surface text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                By continuing to use this website or Delectra's services, you agree to these Terms of Service.
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

export default TermsOfService;
