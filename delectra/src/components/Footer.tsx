import React from 'react';
import { motion } from 'framer-motion';
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  Globe,
  MapPin,
  Phone
} from 'lucide-react';

const FooterLink = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <li>
    <a
      href={href}
      className="text-on-surface-variant hover:text-secondary transition-colors duration-300 text-sm flex items-center group"
    >
      <span>{children}</span>
      <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0" />
    </a>
  </li>
);

const SocialIcon = ({ icon: Icon, href, onClick }: { icon: any, href: string, onClick?: (e: React.MouseEvent) => void }) => (
  <motion.a
    href={href}
    onClick={onClick}
    whileHover={{ y: -5, scale: 1.1 }}
    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-white hover:border-secondary/50 transition-colors bg-white/5 cursor-pointer"
  >
    <Icon className="w-5 h-5" />
  </motion.a>
);

const Footer = ({ onSocialClick, onPrivacyClick, onTermsClick, onCookiesClick }: { onSocialClick?: () => void, onPrivacyClick?: () => void, onTermsClick?: () => void, onCookiesClick?: () => void }) => {
  const handleSocialClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onSocialClick) onSocialClick();
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onPrivacyClick) onPrivacyClick();
  };

  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onTermsClick) onTermsClick();
  };

  const handleCookiesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onCookiesClick) onCookiesClick();
  };

  return (
    <footer className="relative z-10 pt-24 pb-36 md:pb-32 border-t border-white/5 bg-[#030303]">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <img src="/logo.png" alt="Delectra" className="h-12 w-fit" />
              <p className="text-on-surface-variant text-base leading-relaxed max-w-sm">
                Strategic design and digital execution for brands that demand excellence. We craft high-performance digital experiences that drive growth.
              </p>
            </div>

            <div className="flex gap-4">
              <SocialIcon icon={Instagram} href="#" onClick={handleSocialClick} />
              <SocialIcon icon={Twitter} href="#" onClick={handleSocialClick} />
              <SocialIcon icon={Linkedin} href="#" onClick={handleSocialClick} />
              <SocialIcon icon={Github} href="#" onClick={handleSocialClick} />
            </div>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white">Services</h4>
              <ul className="flex flex-col gap-4">
                <FooterLink href="#services">Web Development</FooterLink>
                <FooterLink href="#services">UI/UX Design</FooterLink>
                <FooterLink href="#services">Branding</FooterLink>
                <FooterLink href="#services">Video Editing</FooterLink>
              </ul>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white">Agency</h4>
              <ul className="flex flex-col gap-4">
                <FooterLink href="#home">About Us</FooterLink>
                <FooterLink href="#portfolio">Our Work</FooterLink>
                <FooterLink href="#results">Success Stories</FooterLink>
                <FooterLink href="#connect">Careers</FooterLink>
              </ul>
            </div>

            <div className="flex flex-col gap-6 col-span-2 sm:col-span-1">
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white">Contact</h4>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 text-on-surface-variant text-sm">
                  <Mail className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>team@delectra.in</span>
                </li>
                <li className="flex items-start gap-3 text-on-surface-variant text-sm">
                  <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>Kolkata, India</span>
                </li>
                <li className="flex items-start gap-3 text-on-surface-variant text-sm">
                  <Phone className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>+91-7980228396</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500">
              © 2026 DELECTRA. ALL RIGHTS RESERVED.
            </p>
          </div>

          <div className="flex gap-8">
            <a href="#" onClick={handlePrivacyClick} className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" onClick={handleTermsClick} className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" onClick={handleCookiesClick} className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors cursor-pointer">Cookies</a>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-heading text-[10px] font-bold uppercase tracking-widest">Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
