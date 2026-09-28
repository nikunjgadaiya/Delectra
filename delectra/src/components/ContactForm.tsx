import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { cn } from '../lib/utils';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCityBlur = async () => {
    if (!formData.city) return;
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(formData.city)}&format=json&addressdetails=1&limit=1`);
      const data = await res.json();
      if (data && data.length > 0 && data[0].address && data[0].address.country) {
        setFormData(prev => ({ ...prev, country: data[0].address.country }));
      }
    } catch (err) {
      console.error("Could not fetch country", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        description: ''
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-2xl mx-auto p-8 md:p-10 rounded-[2rem] glass-card relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 text-left">
        <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2 flex items-center gap-3">
          <MessageSquare className="text-secondary w-6 h-6" />
          Tell us about your project! 🎉
        </h3>
        <p className="text-on-surface-variant text-sm mb-8">
          Fill out the form below and we'll get back to you as soon as possible (15 mins to 24 hours)
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold text-on-surface-variant uppercase tracking-widest pl-1">Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600 hover:bg-white/10"
                  placeholder="Name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold text-on-surface-variant uppercase tracking-widest pl-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600 hover:bg-white/10"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold text-on-surface-variant uppercase tracking-widest pl-1">Phone Number</label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600 hover:bg-white/10"
                placeholder="Phone Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold text-on-surface-variant uppercase tracking-widest pl-1">City</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  onBlur={handleCityBlur}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600 hover:bg-white/10"
                  placeholder="City"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-heading font-bold text-on-surface-variant uppercase tracking-widest pl-1">Country</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-secondary transition-colors" />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600 hover:bg-white/10"
                  placeholder="Country"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-heading font-bold text-on-surface-variant uppercase tracking-widest pl-1">Describe what you want</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/50 transition-all placeholder:text-gray-600 resize-none hover:bg-white/10"
              placeholder="Give a brief about what you want..."
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-secondary text-black font-heading font-bold uppercase tracking-widest text-sm py-4 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(221,183,255,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
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
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}
