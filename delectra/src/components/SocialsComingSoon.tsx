import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';

const SocialsComingSoon = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-gutter text-center overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-900/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
            <Zap className="w-8 h-8 text-secondary" />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tighter leading-tight">
          Digital Presence <br />
          <span className="text-gradient">Evolving.</span>
        </h1>

        <p className="text-xl text-on-surface-variant mb-12 leading-relaxed">
          Something elite is brewing. Hang tight while we craft our digital legacy. 
          Our socials are launching soon.
        </p>

        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="inline-flex items-center gap-3 text-secondary font-heading font-bold uppercase tracking-widest text-sm group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Site
        </motion.button>
      </motion.div>

      {/* Decorative Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-white to-transparent" />
      </div>
    </div>
  );
};

export default SocialsComingSoon;
