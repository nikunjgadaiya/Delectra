import React from 'react';
import {
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Mail,
  ArrowUpRight,
  MapPin,
  Phone,
} from 'lucide-react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  onNavigate?: (id: string) => void;
}

const FooterLink = ({ href, children, onNavigate }: FooterLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      if (onNavigate) {
        onNavigate(targetId);
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <li>
      <a
        href={href}
        onClick={handleClick}
        className="text-[#8d869c] hover:text-[#ece8f5] transition-colors duration-300 text-sm flex items-center group py-0.5 cursor-pointer"
      >
        <span>{children}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-0.5 group-hover:translate-y-0 text-[#2bd96b]"
        />
      </a>
    </li>
  );
};

const SocialIcon = ({
  icon: Icon,
  href,
  onClick,
}: {
  icon: any;
  href: string;
  onClick?: (e: React.MouseEvent) => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    aria-hidden="true"
    className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-[#8d869c] hover:text-[#ece8f5] hover:border-[#2bd96b]/50 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.06] cursor-pointer"
  >
    <Icon className="w-4 h-4" />
  </a>
);

interface FooterProps {
  onSocialClick?: () => void;
  onPrivacyClick?: () => void;
  onTermsClick?: () => void;
  onCookiesClick?: () => void;
  onNavigate?: (id: string) => void;
}

export default function Footer({
  onSocialClick,
  onPrivacyClick,
  onTermsClick,
  onCookiesClick,
  onNavigate,
}: FooterProps) {
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
    <footer className="relative z-10 pt-24 pb-32 border-t border-white/10 bg-[#07060b] overflow-hidden">
      <div className="max-w-7xl mx-auto px-gutter">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <img src="/logo.png" alt="Delectra" className="h-10 w-fit mix-blend-screen" />
              <p className="text-[#8d869c] text-sm leading-relaxed max-w-sm">
                Strategic design and digital execution for brands that demand excellence. We craft high-performance digital experiences that drive growth.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <SocialIcon icon={Instagram} href="#" onClick={handleSocialClick} />
              <SocialIcon icon={Twitter} href="#" onClick={handleSocialClick} />
              <SocialIcon icon={Linkedin} href="#" onClick={handleSocialClick} />
              <SocialIcon icon={Github} href="#" onClick={handleSocialClick} />
            </div>
          </div>

          {/* Links 3 Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 2: Services */}
            <div className="flex flex-col gap-5">
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-[#ece8f5]">
                Services
              </h4>
              <ul className="flex flex-col gap-3">
                <FooterLink href="#services" onNavigate={onNavigate}>Web Development</FooterLink>
                <FooterLink href="#services" onNavigate={onNavigate}>UI/UX Design</FooterLink>
                <FooterLink href="#services" onNavigate={onNavigate}>Branding</FooterLink>
                <FooterLink href="#services" onNavigate={onNavigate}>Video Editing</FooterLink>
              </ul>
            </div>

            {/* Column 3: Agency */}
            <div className="flex flex-col gap-5">
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-[#ece8f5]">
                Agency
              </h4>
              <ul className="flex flex-col gap-3">
                <FooterLink href="#home" onNavigate={onNavigate}>About Us</FooterLink>
                <FooterLink href="#portfolio" onNavigate={onNavigate}>Our Work</FooterLink>
                <FooterLink href="#results" onNavigate={onNavigate}>Success Stories</FooterLink>
                <FooterLink href="#connect" onNavigate={onNavigate}>Careers</FooterLink>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="flex flex-col gap-5 col-span-2 sm:col-span-1">
              <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-[#ece8f5]">
                Contact
              </h4>
              <ul className="flex flex-col gap-3">
                <li className="flex items-start gap-3 text-[#8d869c] text-sm">
                  <Mail aria-hidden="true" className="w-4 h-4 text-[#2bd96b] shrink-0 mt-0.5" />
                  <span>team@delectra.in</span>
                </li>
                <li className="flex items-start gap-3 text-[#8d869c] text-sm">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-[#2bd96b] shrink-0 mt-0.5" />
                  <span>Kolkata, India</span>
                </li>
                <li className="flex items-start gap-3 text-[#8d869c] text-sm">
                  <Phone aria-hidden="true" className="w-4 h-4 text-[#2bd96b] shrink-0 mt-0.5" />
                  <span>+91-7980228396</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <p className="font-heading text-[10px] font-semibold uppercase tracking-widest text-[#8d869c]">
              © 2026 DELECTRA. ALL RIGHTS RESERVED.
            </p>
          </div>

          <div className="flex gap-8">
            <a
              href="#"
              onClick={handlePrivacyClick}
              className="font-heading text-[10px] font-semibold uppercase tracking-widest text-[#8d869c] hover:text-[#ece8f5] transition-colors cursor-pointer"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              onClick={handleTermsClick}
              className="font-heading text-[10px] font-semibold uppercase tracking-widest text-[#8d869c] hover:text-[#ece8f5] transition-colors cursor-pointer"
            >
              Terms of Service
            </a>
            <a
              href="#"
              onClick={handleCookiesClick}
              className="font-heading text-[10px] font-semibold uppercase tracking-widest text-[#8d869c] hover:text-[#ece8f5] transition-colors cursor-pointer"
            >
              Cookies
            </a>
          </div>

          <div className="flex items-center gap-2 text-[#8d869c]">
            <span aria-hidden="true" className="w-2 h-2 bg-[#2bd96b] rounded-full animate-pulse" />
            <span className="font-heading text-[10px] font-semibold uppercase tracking-widest">
              Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
