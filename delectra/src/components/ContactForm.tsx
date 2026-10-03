import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MapPin, User, Mail, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);
  const fieldsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !fieldsRef.current) return;

    const fields = fieldsRef.current.querySelectorAll('.stagger-field');
    gsap.fromTo(
      fields,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
        },
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCityBlur = async () => {
    if (!formData.city) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          formData.city
        )}&format=json&addressdetails=1&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0 && data[0].address && data[0].address.country) {
        setFormData((prev) => ({ ...prev, country: data[0].address.country }));
      }
    } catch (err) {
      console.error('Could not fetch country', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newSubmission = {
      ...formData,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'new',
      remarks: '',
      sales: 0,
    };

    if (isSupabaseConfigured) {
      const { error } = await supabase.from('submissions').insert([newSubmission]);
      if (error) {
        console.error('Error saving submission:', error);
      }
    } else {
      const existing = localStorage.getItem('contact_submissions');
      const submissions = existing ? JSON.parse(existing) : [];
      submissions.unshift(newSubmission);
      localStorage.setItem('contact_submissions', JSON.stringify(submissions));
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      country: '',
      description: '',
    });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div
      ref={formRef}
      className="w-full p-8 md:p-12 rounded-[2rem] glass-card relative overflow-hidden border border-white/10 bg-[#0e0d14]/60 backdrop-blur-xl"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[280px] h-[280px] bg-[#c9b2ff]/10 blur-[100px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 text-left">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 flex items-center gap-3 text-[#ece8f5]">
          <MessageSquare className="text-[#c9b2ff] w-6 h-6 shrink-0" />
          <span>Tell us about your project! 🎉</span>
        </h3>
        <p className="text-[#8d869c] text-sm mb-10 leading-relaxed">
          Fill out the form below and we'll get back to you as soon as possible (15 mins to 24 hours)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div ref={fieldsRef} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="stagger-field space-y-2">
                <label className="text-[11px] font-heading font-semibold text-[#8d869c] uppercase tracking-wider block">
                  Name
                </label>
                <div className="relative group">
                  <User
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d869c] group-focus-within:text-[#2bd96b] transition-colors"
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#2bd96b] focus:ring-0 py-3 pl-7 pr-3 text-sm text-[#ece8f5] transition-all placeholder:text-[#8d869c]/50"
                    placeholder="Name"
                  />
                </div>
              </div>

              <div className="stagger-field space-y-2">
                <label className="text-[11px] font-heading font-semibold text-[#8d869c] uppercase tracking-wider block">
                  Email
                </label>
                <div className="relative group">
                  <Mail
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d869c] group-focus-within:text-[#2bd96b] transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#2bd96b] focus:ring-0 py-3 pl-7 pr-3 text-sm text-[#ece8f5] transition-all placeholder:text-[#8d869c]/50"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <div className="stagger-field space-y-2">
              <label className="text-[11px] font-heading font-semibold text-[#8d869c] uppercase tracking-wider block">
                Phone Number
              </label>
              <div className="relative group">
                <Phone
                  aria-hidden="true"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d869c] group-focus-within:text-[#2bd96b] transition-colors"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#2bd96b] focus:ring-0 py-3 pl-7 pr-3 text-sm text-[#ece8f5] transition-all placeholder:text-[#8d869c]/50"
                  placeholder="Phone Number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="stagger-field space-y-2">
                <label className="text-[11px] font-heading font-semibold text-[#8d869c] uppercase tracking-wider block">
                  City
                </label>
                <div className="relative group">
                  <MapPin
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d869c] group-focus-within:text-[#2bd96b] transition-colors"
                  />
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    onBlur={handleCityBlur}
                    className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#2bd96b] focus:ring-0 py-3 pl-7 pr-3 text-sm text-[#ece8f5] transition-all placeholder:text-[#8d869c]/50"
                    placeholder="City"
                  />
                </div>
              </div>

              <div className="stagger-field space-y-2">
                <label className="text-[11px] font-heading font-semibold text-[#8d869c] uppercase tracking-wider block">
                  Country
                </label>
                <div className="relative group">
                  <MapPin
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8d869c] group-focus-within:text-[#2bd96b] transition-colors"
                  />
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#2bd96b] focus:ring-0 py-3 pl-7 pr-3 text-sm text-[#ece8f5] transition-all placeholder:text-[#8d869c]/50"
                    placeholder="Country"
                  />
                </div>
              </div>
            </div>

            <div className="stagger-field space-y-2">
              <label className="text-[11px] font-heading font-semibold text-[#8d869c] uppercase tracking-wider block">
                Describe what you want
              </label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-white/15 focus:border-[#2bd96b] focus:ring-0 py-3 px-0 text-sm text-[#ece8f5] resize-none transition-all placeholder:text-[#8d869c]/50"
                placeholder="Give a brief about what you want..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-6 bg-[#2bd96b] hover:bg-[#25c460] text-[#07060b] font-heading font-bold uppercase tracking-widest text-xs py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_4px_25px_rgba(43,217,107,0.3)] hover:shadow-[0_8px_35px_rgba(43,217,107,0.45)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-[#07060b] border-t-transparent rounded-full animate-spin" />
                Sending...
              </span>
            ) : isSubmitted ? (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Message Sent!
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Details
              </span>
            )}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#07060b]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <CheckCircle2 className="w-20 h-20 text-[#2bd96b] mb-4 drop-shadow-[0_0_20px_rgba(43,217,107,0.5)]" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
                Message Sent!
              </h2>
              <p className="text-[#8d869c] mt-2 text-xs uppercase tracking-widest font-heading font-semibold text-center px-4">
                We'll be in touch soon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
