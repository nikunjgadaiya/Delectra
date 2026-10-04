import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';

const SocialsComingSoon = ({ onBack }: { onBack: () => void }) => {
  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-[100] bg-[#07060b] flex flex-col items-center justify-center px-gutter text-center overflow-hidden"
    >
      {/* Background Glows */}
      <div
        aria-hidden="true"
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#c9b2ff]/10 blur-[140px] rounded-full pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#2bd96b]/08 blur-[120px] rounded-full pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center">
            <Zap aria-hidden="true" className="w-8 h-8 text-[#2bd96b]" />
          </div>
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 tracking-tighter leading-tight text-[#ece8f5]">
          Digital Presence <br />
          <span className="accent-serif">Evolving.</span>
        </h1>

        <p className="text-lg md:text-xl text-[#8d869c] mb-12 leading-relaxed">
          Something elite is brewing. Hang tight while we craft our digital legacy. 
          Our socials are launching soon.
        </p>

        <motion.button
          whileHover={{ x: -5 }}
          onClick={onBack}
          className="inline-flex items-center gap-3 text-[#2bd96b] font-heading font-bold uppercase tracking-widest text-xs group cursor-pointer"
        >
          <ArrowLeft aria-hidden="true" className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Site
        </motion.button>
      </motion.div>
    </div>
  );
};

export default SocialsComingSoon;
