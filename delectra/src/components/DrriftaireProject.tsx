import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  Plane,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  MapPin,
  FileText,
  Shield,
  Layers,
  Sparkles,
  Users,
  Droplets,
  Zap,
  Check,
  Plus,
  Play,
  Share2,
  Smartphone,
  Laptop,
  CheckCheck,
  TrendingUp,
  Cpu,
  BarChart3,
  Sliders,
  AlertCircle
} from 'lucide-react';

interface DrriftaireProjectProps {
  onBack: () => void;
  onOpenContact?: () => void;
}

// Sample Booking Data for the interactive Admin Simulator
interface Booking {
  id: string;
  farmerName: string;
  phone: string;
  village: string;
  crop: string;
  acres: number;
  chemical: string;
  scheduledDate: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  notes: string[];
}

const initialBookings: Booking[] = [
  {
    id: 'DRF-8492',
    farmerName: 'Rameshwar Patel',
    phone: '+91 98234 11204',
    village: 'Narsinghpur, Sector 4',
    crop: 'Sugarcane',
    acres: 35,
    chemical: 'Liquid Potassium & Micronutrient Mix',
    scheduledDate: 'Tomorrow, 06:30 AM',
    status: 'Pending',
    notes: [
      'Farmer requested early morning spray before 8 AM to avoid gusty crosswinds.',
      'Water source available near western borewell pump.'
    ]
  },
  {
    id: 'DRF-8491',
    farmerName: 'Balwant Singh',
    phone: '+91 94120 77319',
    village: 'Fatehgarh Estate',
    crop: 'Cotton (Bt Hybrid)',
    acres: 22,
    chemical: 'Bio-Organic Pest Repellent',
    scheduledDate: 'Oct 08, 07:00 AM',
    status: 'Accepted',
    notes: [
      'Field mapped via GPS. High-tension power line on northern boundary flagged for pilot.',
      'Pilot Vikram assigned with Drone Unit Alpha-3 (30L tank).'
    ]
  },
  {
    id: 'DRF-8488',
    farmerName: 'Gurpreet Dhillon',
    phone: '+91 98881 40592',
    village: 'Kotkapura Fields',
    crop: 'Paddy / Basmati',
    acres: 50,
    chemical: 'Fungicide Protective Coat',
    scheduledDate: 'Oct 09, 05:45 PM',
    status: 'Pending',
    notes: []
  }
];

export default function DrriftaireProject({ onBack, onOpenContact }: DrriftaireProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Interactive Admin Simulator State
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedBookingId, setSelectedBookingId] = useState<string>(initialBookings[0].id);
  const [newNoteInput, setNewNoteInput] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'Accepted' | 'Rejected'>('All');

  // Interactive Farmer Booking Calculator State
  const [selectedCrop, setSelectedCrop] = useState('Sugarcane');
  const [acresInput, setAcresInput] = useState<number>(25);
  const [selectedSprayType, setSelectedSprayType] = useState('Fertilizer & Nutrition');

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const currentBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];

  const updateStatus = (id: string, status: 'Accepted' | 'Rejected') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const addNote = (id: string) => {
    if (!newNoteInput.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              notes: [...b.notes, `[Admin at ${timestamp}]: ${newNoteInput.trim()}`]
            }
          : b
      )
    );
    setNewNoteInput('');
  };

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus === 'All') return true;
    return b.status === filterStatus;
  });

  // Dynamic calculations for farmer calculator preview
  const estimatedSprayTimeMinutes = Math.round(acresInput * 3.5);
  const estimatedDoseLitres = Math.round(acresInput * 12);
  const estimatedCostINR = acresInput * 480;

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="fixed inset-0 z-[100] bg-[#07060b] text-[#ece8f5] overflow-y-auto selection:bg-[#2bd96b]/30 selection:text-white"
    >
      {/* Visual Ambient Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[550px] h-[550px] bg-[#2bd96b]/8 blur-[130px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-[#c9b2ff]/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="fixed top-[40%] left-[50%] w-[600px] h-[600px] bg-[#2bd96b]/5 blur-[160px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* =========================================================================
          STICKY TOP NAVIGATION BAR
      ========================================================================== */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#07060b]/80 backdrop-blur-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#2bd96b]/40 text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider text-[#ece8f5] hover:text-[#2bd96b] transition-all group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#2bd96b]" />
            <span>Back to Projects</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#8d869c] border border-white/10 bg-white/[0.02] px-3.5 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#2bd96b] animate-pulse" />
            <span>CASE STUDY: DRIFTTAIRE AERIAL TECH</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-heading font-medium text-[#ece8f5] transition-colors cursor-pointer"
              title="Copy Case Study Link"
            >
              {copiedLink ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-[#2bd96b]" />
                  <span className="text-[#2bd96b]">Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Share</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                onBack();
                if (onOpenContact) {
                  setTimeout(onOpenContact, 250);
                } else {
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2bd96b] hover:bg-[#25be5e] text-black font-heading font-bold uppercase tracking-wider text-xs transition-all shadow-[0_0_25px_rgba(43,217,107,0.3)] hover:scale-105 cursor-pointer"
            >
              <span>Build Similar</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-black" />
            </button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          HERO HEADER SECTION
      ========================================================================== */}
      <section className="relative pt-12 md:pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2bd96b]/10 border border-[#2bd96b]/30 mb-6">
            <Plane className="w-3.5 h-3.5 text-[#2bd96b]" />
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#2bd96b]">
              Case Study // Precision AgriTech
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
            Drriftaire <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2bd96b] via-[#a3f7bf] to-[#c9b2ff]">
              Smart Aerial Spraying & Mission Control
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#8d869c] leading-relaxed max-w-3xl mb-10 font-normal">
            Autonomous agricultural drone spraying platform with an end-to-end customer booking portal and a high-efficiency dispatch admin panel—empowering farmers with precision chemical application and providing operators with real-time job acceptance, rejection, and live field note tracking.
          </p>
        </div>

        {/* Project Metadata Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 py-6 border-y border-white/10 mb-12">
          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
              Client
            </span>
            <span className="text-base font-heading font-bold text-white">Drriftaire Technologies</span>
            <span className="text-xs text-[#2bd96b] block">Agri-Drone Fleet</span>
          </div>

          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
              Deliverables
            </span>
            <span className="text-base font-heading font-bold text-white">Web App & Admin CRM</span>
            <span className="text-xs text-[#8d869c] block">Full-Stack Solution</span>
          </div>

          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
              Operational Scope
            </span>
            <span className="text-base font-heading font-bold text-white">Multi-Crop Drone Spray</span>
            <span className="text-xs text-[#8d869c] block">Paddy, Cotton, Cane, Wheat</span>
          </div>

          <div>
            <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
              Status & Impact
            </span>
            <span className="text-base font-heading font-bold text-[#2bd96b] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2bd96b]" />
              Live in Production
            </span>
            <span className="text-xs text-[#8d869c] block">15,000+ Acres Scheduled</span>
          </div>
        </div>

        {/* =========================================================================
            HERO SHOWCASE IMAGE (Placeholder with swap guidance)
        ========================================================================== */}
        <div className="relative group rounded-3xl overflow-hidden border border-white/10 bg-[#0e0d14]/80 shadow-[0_20px_80px_rgba(0,0,0,0.8)] aspect-[16/9] md:aspect-[21/9]">
          <img
            src="/drriftaire-drone-farm.jpg"
            alt="Drriftaire Drone spraying crops at sunset"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07060b] via-[#07060b]/30 to-transparent opacity-80" />

          {/* Floating Live Telemetry Overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="bg-[#0e0d14]/85 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-2xl max-w-md">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#2bd96b] animate-ping" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#2bd96b]">
                  Autonomous Field Mission Active
                </span>
              </div>
              <h3 className="text-lg font-heading font-bold text-white mb-1">
                Precision Spraying Telemetry
              </h3>
              <p className="text-xs text-[#8d869c] leading-relaxed">
                Hexacopter Agri-Drone calibrated with centrifugal atomizing nozzles for micron-level coverage across 40 acres in single deployment cycles.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 text-xs font-mono text-[#ece8f5]">
              <span className="text-[#2bd96b]">● GPS SYNC</span>
              <span>• NOZZLE FLOW: 4.8 L/MIN</span>
              <span className="hidden sm:inline">• ALTITUDE: 2.5M</span>
            </div>
          </div>
        </div>

        {/* Media Swap Note for User */}
        <div className="mt-4 flex items-center justify-between text-xs text-[#8d869c] px-2">
          <span>* Primary drone visual from initial deployment. Replaceable with your updated photo or cinematic 4K video reel.</span>
          <span className="text-[#2bd96b]/80 font-mono">ASSET: /drriftaire-drone-farm.jpg</span>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: THE CORE MISSION & PROBLEM VS SOLUTION
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#2bd96b] block mb-2">
              The Context & Challenge
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              Modernizing aerial crop care from chaos to a clicks-only pipeline.
            </h2>
            <p className="text-sm text-[#8d869c] leading-relaxed">
              Drriftaire operates specialized drone squadrons that spray fertilizers, micro-nutrients, and pest inhibitors across extensive crop acreage. Their flight technology was world-class, but their operations were handcuffed by manual intake.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-red-500/20 bg-red-500/[0.02]">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                The Bottleneck Before
              </h3>
              <ul className="space-y-3 text-sm text-[#8d869c]">
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold mt-0.5">✕</span>
                  <span><strong>Chaotic Phone Intake:</strong> Bookings came via disjointed phone calls and WhatsApp chats with missing field coordinates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold mt-0.5">✕</span>
                  <span><strong>Double-Booking Conflicts:</strong> Drone pilots, battery packs, and transport vehicles suffered overlap during prime 6 AM spray windows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold mt-0.5">✕</span>
                  <span><strong>Zero Field Audit Trail:</strong> No centralized place to document crop stage, chemical concentrations, weather constraints, or pilot remarks.</span>
                </li>
              </ul>
            </div>

            {/* The Solution Card */}
            <div className="glass-card p-6 sm:p-8 rounded-3xl border-[#2bd96b]/30 bg-[#2bd96b]/[0.02]">
              <div className="w-12 h-12 rounded-2xl bg-[#2bd96b]/10 border border-[#2bd96b]/30 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-[#2bd96b]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-3">
                The Delectra Architecture
              </h3>
              <ul className="space-y-3 text-sm text-[#ece8f5]">
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2bd96b] font-bold mt-0.5">✓</span>
                  <span><strong>Lightning-Fast Booking Engine:</strong> Farmers enter crop, acreage, and village pin in under 45 seconds on low-bandwidth connections.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2bd96b] font-bold mt-0.5">✓</span>
                  <span><strong>Mission Control Admin Panel:</strong> One-click accept/reject decisions with automated confirmation messages sent directly to clients.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-[#2bd96b] font-bold mt-0.5">✓</span>
                  <span><strong>Operational Field Notes:</strong> Admins and dispatchers annotate hazard zones, chemical formulas, and pilot assignments directly inside each booking card.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE LIVE ADMIN PANEL SIMULATOR (Core Feature)
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c9b2ff]/10 border border-[#c9b2ff]/30 mb-3 text-xs font-heading font-semibold uppercase tracking-wider text-[#c9b2ff]">
            <Laptop className="w-3.5 h-3.5" />
            <span>Interactive Feature Demo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            The Mission Control Admin Experience
          </h2>
          <p className="text-sm md:text-base text-[#8d869c]">
            Test drive the real admin workflow below! Switch between bookings, accept or reject requests, and save operational field notes in real time.
          </p>
        </div>

        {/* Interactive Admin Container */}
        <div className="rounded-3xl border border-white/10 bg-[#0e0d14] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          {/* Admin Window Header */}
          <div className="px-6 py-4 bg-white/[0.03] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono font-medium text-[#8d869c] ml-2">
                drriftaire-mission-control.internal/dispatch
              </span>
            </div>

            <div className="flex items-center gap-2">
              {(['All', 'Pending', 'Accepted', 'Rejected'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFilterStatus(filter)}
                  className={`px-3 py-1 rounded-lg text-xs font-heading font-semibold transition-all cursor-pointer ${
                    filterStatus === filter
                      ? 'bg-[#2bd96b] text-black shadow-sm'
                      : 'bg-white/5 text-[#8d869c] hover:text-white hover:bg-white/10'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Admin Work Area: Two Columns (Booking List + Detail/Action Panel) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 min-h-[520px]">
            {/* Left Column: Bookings Feed */}
            <div className="lg:col-span-5 p-4 sm:p-6 space-y-3 overflow-y-auto max-h-[580px]">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c]">
                  Incoming Spray Requests ({filteredBookings.length})
                </span>
                <span className="text-[11px] font-mono text-[#2bd96b]">AUTO-SYNC ON</span>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-12 text-[#8d869c] text-sm">
                  No bookings found under filter "{filterStatus}".
                </div>
              ) : (
                filteredBookings.map((b) => {
                  const isSelected = b.id === selectedBookingId;
                  const statusColors = {
                    Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
                    Accepted: 'bg-[#2bd96b]/10 text-[#2bd96b] border-[#2bd96b]/30',
                    Rejected: 'bg-red-500/10 text-red-400 border-red-500/30'
                  }[b.status];

                  return (
                    <div
                      key={b.id}
                      onClick={() => setSelectedBookingId(b.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#2bd96b] bg-[#2bd96b]/[0.06] shadow-[0_0_20px_rgba(43,217,107,0.1)]'
                          : 'border-white/5 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <span className="text-xs font-mono text-[#8d869c]">{b.id}</span>
                          <h4 className="text-sm font-heading font-bold text-white">{b.farmerName}</h4>
                        </div>
                        <span
                          className={`text-[10px] font-heading font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColors}`}
                        >
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-xs text-[#8d869c] mb-2">
                        <div>
                          <span className="text-white font-medium">{b.crop}</span> • {b.acres} Acres
                        </div>
                        <div className="text-right text-[#c9b2ff] font-medium">{b.scheduledDate}</div>
                      </div>

                      <div className="text-[11px] text-[#8d869c] truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#2bd96b] shrink-0" />
                        <span>{b.village}</span>
                      </div>

                      {b.notes.length > 0 && (
                        <div className="mt-2 text-[10px] font-mono text-[#2bd96b]/80 bg-[#2bd96b]/10 px-2 py-1 rounded-md inline-block">
                          {b.notes.length} internal note(s) attached
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Right Column: Selected Booking Detail, Accept/Reject Action & Note Pad */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white/[0.01]">
              <div>
                {/* Header & Status Control */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-[#2bd96b]">{currentBooking.id}</span>
                      <span className="text-xs text-[#8d869c]">• Received via Web Booking</span>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white">
                      {currentBooking.farmerName}
                    </h3>
                    <p className="text-xs text-[#8d869c] flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#2bd96b]" />
                      {currentBooking.village} • Tel: {currentBooking.phone}
                    </p>
                  </div>

                  {/* Accept / Reject Action Buttons */}
                  <div className="flex items-center gap-2.5">
                    <button
                      onClick={() => updateStatus(currentBooking.id, 'Rejected')}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentBooking.status === 'Rejected'
                          ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]'
                          : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                      }`}
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>

                    <button
                      onClick={() => updateStatus(currentBooking.id, 'Accepted')}
                      className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer ${
                        currentBooking.status === 'Accepted'
                          ? 'bg-[#2bd96b] text-black shadow-[0_0_20px_rgba(43,217,107,0.4)]'
                          : 'bg-[#2bd96b]/15 text-[#2bd96b] hover:bg-[#2bd96b] hover:text-black border border-[#2bd96b]/40'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Accept Job
                    </button>
                  </div>
                </div>

                {/* Spray Mission Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-6 border-b border-white/10">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
                      Crop Type
                    </span>
                    <span className="text-sm font-heading font-bold text-white">
                      {currentBooking.crop}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
                      Field Area
                    </span>
                    <span className="text-sm font-heading font-bold text-[#2bd96b]">
                      {currentBooking.acres} Acres
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
                      Scheduled Window
                    </span>
                    <span className="text-sm font-heading font-bold text-[#c9b2ff]">
                      {currentBooking.scheduledDate}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 col-span-2 sm:col-span-3">
                    <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-1">
                      Spray Formulation & Chemical Mixture
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-white">
                      {currentBooking.chemical}
                    </span>
                  </div>
                </div>

                {/* Internal Admin Notes Section */}
                <div className="pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-white flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#2bd96b]" />
                      Internal Operational Notes ({currentBooking.notes.length})
                    </h4>
                    <span className="text-[10px] text-[#8d869c]">Visible only to Drriftaire Dispatch</span>
                  </div>

                  {/* Notes Feed */}
                  <div className="space-y-2 mb-4 max-h-[140px] overflow-y-auto">
                    {currentBooking.notes.length === 0 ? (
                      <p className="text-xs text-[#8d869c] italic bg-white/[0.015] p-3 rounded-lg border border-dashed border-white/10">
                        No operational notes yet. Add pilot assignment, wind conditions, or hazard warnings below.
                      </p>
                    ) : (
                      currentBooking.notes.map((note, idx) => (
                        <div
                          key={idx}
                          className="text-xs bg-white/[0.025] border border-white/10 p-2.5 rounded-lg text-[#ece8f5] flex items-start gap-2"
                        >
                          <span className="text-[#2bd96b] font-bold">›</span>
                          <span>{note}</span>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Note Input Bar */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add an internal field note (e.g., pilot assigned, power lines, water pump)..."
                      value={newNoteInput}
                      onChange={(e) => setNewNoteInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addNote(currentBooking.id);
                      }}
                      className="flex-1 bg-black/60 border border-white/15 focus:border-[#2bd96b] text-white text-xs px-3.5 py-2.5 rounded-xl outline-none transition-colors font-sans placeholder:text-[#8d869c]/60"
                    />
                    <button
                      onClick={() => addNote(currentBooking.id)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#2bd96b]" />
                      <span>Note</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Status Message Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#8d869c]">
                <span>
                  Current Action Status:{' '}
                  <strong
                    className={
                      currentBooking.status === 'Accepted'
                        ? 'text-[#2bd96b]'
                        : currentBooking.status === 'Rejected'
                        ? 'text-red-400'
                        : 'text-yellow-400'
                    }
                  >
                    {currentBooking.status.toUpperCase()}
                  </strong>
                </span>
                <span className="text-[11px] font-mono text-[#8d869c]">
                  Auto-dispatches WhatsApp confirmation to farmer
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CUSTOMER BOOKING WIZARD & INSTANT CALCULATOR
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2bd96b]/10 border border-[#2bd96b]/30 mb-4 text-xs font-heading font-semibold uppercase tracking-wider text-[#2bd96b]">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Customer Facing Booking Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight mb-4">
              Effortless 45-second booking for rural farmers.
            </h2>

            <p className="text-sm md:text-base text-[#8d869c] leading-relaxed mb-6">
              Designed specifically with high-contrast typography, large tap targets, and intuitive visual crop selectors so estate managers and local farmers can schedule drone sprays with zero friction.
            </p>

            <div className="space-y-4 text-sm text-[#ece8f5]">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#2bd96b]/10 border border-[#2bd96b]/20 flex items-center justify-center shrink-0">
                  <Sliders className="w-4 h-4 text-[#2bd96b]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Dynamic Dosage Engine</h4>
                  <p className="text-xs text-[#8d869c]">Calculates optimal drone flight passes, chemical volume, and estimated flight time based on crop type and canopy depth.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#c9b2ff]/10 border border-[#c9b2ff]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#c9b2ff]" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">Geo-Location Field Pinning</h4>
                  <p className="text-xs text-[#8d869c]">Enables one-tap farm boundary selection to avoid hazardous pilot recon visits.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Farmer Estimator Preview Widget */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border-white/10 bg-[#0e0d14]/70">
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
              <div>
                <span className="text-[11px] font-heading font-bold uppercase tracking-widest text-[#2bd96b] block">
                  Interactive Simulator
                </span>
                <h3 className="text-xl font-heading font-bold text-white">
                  Farmer Spray Estimator
                </h3>
              </div>
              <span className="text-xs font-mono text-[#8d869c] bg-white/5 px-2.5 py-1 rounded-md">
                Step 1 of 3 Preview
              </span>
            </div>

            {/* Crop Selector */}
            <div className="mb-6">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-3">
                1. Select Target Crop
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Sugarcane', 'Cotton', 'Paddy / Basmati', 'Wheat'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`py-3 px-3 rounded-xl border text-xs font-heading font-bold transition-all text-center cursor-pointer ${
                      selectedCrop === crop
                        ? 'border-[#2bd96b] bg-[#2bd96b]/15 text-white shadow-[0_0_15px_rgba(43,217,107,0.2)]'
                        : 'border-white/10 bg-white/[0.02] text-[#8d869c] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Acreage Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c]">
                  2. Farm Acreage: <strong className="text-white text-sm">{acresInput} Acres</strong>
                </label>
                <span className="text-xs font-mono text-[#2bd96b]">
                  Approx. {(acresInput * 0.4047).toFixed(1)} Hectares
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={acresInput}
                onChange={(e) => setAcresInput(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#2bd96b]"
              />
              <div className="flex justify-between text-[10px] text-[#8d869c] mt-1 font-mono">
                <span>5 Acres</span>
                <span>25 Acres</span>
                <span>50 Acres</span>
                <span>75 Acres</span>
                <span>100+ Acres</span>
              </div>
            </div>

            {/* Spray Formulation Type */}
            <div className="mb-6">
              <label className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c] block mb-2">
                3. Application Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {['Fertilizer & Nutrition', 'Pest Control', 'Crop Ripening Boost'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedSprayType(type)}
                    className={`py-2 px-3 rounded-lg border text-xs font-heading font-semibold transition-all cursor-pointer ${
                      selectedSprayType === type
                        ? 'border-[#c9b2ff] bg-[#c9b2ff]/15 text-white'
                        : 'border-white/10 bg-white/[0.02] text-[#8d869c] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Result Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 grid grid-cols-3 gap-4 text-center">
              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#8d869c] block mb-1">
                  Est. Flight Time
                </span>
                <span className="text-lg font-heading font-bold text-white">
                  {estimatedSprayTimeMinutes} mins
                </span>
                <span className="text-[10px] text-[#8d869c] block mt-0.5">2 Battery Cycles</span>
              </div>

              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#8d869c] block mb-1">
                  Spray Volume
                </span>
                <span className="text-lg font-heading font-bold text-[#2bd96b]">
                  {estimatedDoseLitres} Litres
                </span>
                <span className="text-[10px] text-[#8d869c] block mt-0.5">Micro-Atomized</span>
              </div>

              <div>
                <span className="text-[10px] font-heading uppercase tracking-wider text-[#8d869c] block mb-1">
                  Est. Service Fee
                </span>
                <span className="text-lg font-heading font-bold text-[#c9b2ff]">
                  ₹{estimatedCostINR.toLocaleString()}
                </span>
                <span className="text-[10px] text-[#8d869c] block mt-0.5">₹480 / Acre</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: KEY FEATURES BENTO GRID
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#2bd96b] block mb-2">
            Engineering Breakdown
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-4">
            Built for Extreme Field Reliability
          </h2>
          <p className="text-sm md:text-base text-[#8d869c]">
            A breakdown of high-impact systems developed to bridge rural farm requirements with high-tech drone aviation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bento Card 1 */}
          <div className="glass-card p-8 rounded-3xl border-white/10 relative overflow-hidden group hover:border-[#2bd96b]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#2bd96b]/10 border border-[#2bd96b]/20 flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-[#2bd96b]" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Slot Conflict Preventer
            </h3>
            <p className="text-sm text-[#8d869c] leading-relaxed">
              Algorithmic dispatch system that prevents overlapping drone missions, factoring in travel distance between villages and mandatory LiPo battery recharge pauses.
            </p>
          </div>

          {/* Bento Card 2 */}
          <div className="glass-card p-8 rounded-3xl border-white/10 relative overflow-hidden group hover:border-[#c9b2ff]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#c9b2ff]/10 border border-[#c9b2ff]/20 flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-[#c9b2ff]" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              Auditable Dispatch Notes
            </h3>
            <p className="text-sm text-[#8d869c] leading-relaxed">
              Dispatchers log real-time operational remarks: field terrain risks, chemical dilution ratios, pilot callouts, and farmer special instructions accessible across all devices.
            </p>
          </div>

          {/* Bento Card 3 */}
          <div className="glass-card p-8 rounded-3xl border-white/10 relative overflow-hidden group hover:border-[#2bd96b]/30 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[#2bd96b]/10 border border-[#2bd96b]/20 flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-[#2bd96b]" />
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              One-Click Decisions
            </h3>
            <p className="text-sm text-[#8d869c] leading-relaxed">
              Instant Accept or Reject controls with automated SMS & WhatsApp notification webhooks so farmers always know their drone's exact deployment status.
            </p>
          </div>

          {/* Bento Card 4 (Span 2) */}
          <div className="md:col-span-2 glass-card p-8 rounded-3xl border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-[#2bd96b]" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">
                Acreage & Chemical Dosage Telemetry
              </h3>
              <p className="text-sm text-[#8d869c] leading-relaxed max-w-xl">
                Supports diverse crop profiles (Paddy, Sugarcane, Cotton, Wheat, Mustard, Tea & Orchards). Each crop possesses dedicated aerodynamic spraying altitude profiles and droplet micron settings stored in the database.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/10">
              {['20L & 30L Payloads', 'Centrifugal Nozzles', 'Sub-Centimeter RTK GPS', 'Anti-Drift Shrouds', 'Night Spray LED Arrays'].map(
                (badge) => (
                  <span
                    key={badge}
                    className="text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#ece8f5]"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Bento Card 5 */}
          <div className="glass-card p-8 rounded-3xl border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-[#c9b2ff]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-white mb-2">
                Tech Stack
              </h3>
              <p className="text-sm text-[#8d869c] leading-relaxed">
                Modern responsive stack with lightning fast load times even on spotty 3G/4G field connections.
              </p>
            </div>
            <div className="space-y-2 mt-4 text-xs font-mono text-[#8d869c]">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Frontend:</span>
                <span className="text-white">React 19 + TypeScript</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Styles & Motion:</span>
                <span className="text-white">Tailwind + GSAP/Framer</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Database / Auth:</span>
                <span className="text-white">Supabase Realtime</span>
              </div>
              <div className="flex justify-between">
                <span>Alerts / Webhooks:</span>
                <span className="text-white">WhatsApp & SMS API</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: MEDIA & VIDEO DEMO PLACEHOLDERS (Ready for User Assets)
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#2bd96b] block mb-2">
              Visual Showcase & Media Hub
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white tracking-tight">
              Screenshots, Flight Videos & Field Demonstrations
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#8d869c] max-w-md">
            Dedicated slots ready for you to drop in screen recordings of the admin panel, booking app mobile mockups, and 4K drone flight footage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video Walkthrough Player Placeholder */}
          <div className="group rounded-3xl border border-dashed border-white/20 hover:border-[#2bd96b]/60 transition-all bg-[#0e0d14]/70 p-8 flex flex-col justify-between aspect-[16/10] relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#2bd96b] bg-[#2bd96b]/10 px-3 py-1 rounded-full border border-[#2bd96b]/20">
                VIDEO ASSET PLACEHOLDER
              </span>
              <span className="text-xs text-[#8d869c]">Accepts .mp4 / .webm</span>
            </div>

            <div className="my-auto text-center py-6">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-[#2bd96b] group-hover:text-black transition-all shadow-[0_0_30px_rgba(43,217,107,0.2)]">
                <Play className="w-6 h-6 ml-1" />
              </div>
              <h4 className="text-lg font-heading font-bold text-white mb-2">
                Admin Panel Screen Recording Walkthrough
              </h4>
              <p className="text-xs text-[#8d869c] max-w-sm mx-auto">
                Insert your 60-second Loom or recorded video demonstrating real-time accept/reject booking handling and note updates.
              </p>
            </div>

            <div className="text-[11px] font-mono text-[#8d869c] flex items-center justify-between pt-4 border-t border-white/10">
              <span>Resolution: 1920x1080 (16:9)</span>
              <span className="text-[#2bd96b]">Ready to Link</span>
            </div>
          </div>

          {/* Secondary 3D Render / Field Media Slot */}
          <div className="rounded-3xl border border-white/10 bg-[#0e0d14]/70 overflow-hidden relative group aspect-[16/10]">
            <img
              src="/drriftaire-3d.jpg"
              alt="Drriftaire 3D Drone Model"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07060b] via-[#07060b]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-[#2bd96b] block mb-1">
                Visual Concept // Hardware
              </span>
              <h4 className="text-xl font-heading font-bold text-white mb-1">
                Hexacopter Spraying Rig & Nozzle System
              </h4>
              <p className="text-xs text-[#8d869c]">
                Industrial drone framework designed for multi-acre agricultural fertilizer dispersal with zero pilot fatigue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: CLIENT TESTIMONIAL & BUSINESS OUTCOMES
      ========================================================================== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Testimonial Quote */}
          <div className="lg:col-span-7 glass-card p-8 sm:p-12 rounded-3xl border-t border-t-[#2bd96b]/40 relative bg-[#0e0d14]/80">
            <div className="flex gap-1.5 mb-6 text-[#2bd96b]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>

            <blockquote className="text-xl sm:text-2xl font-heading font-medium text-white leading-relaxed mb-8">
              "They understood our vision from day one and turned it into a website that truly represents Drriftaire. Clean, fast, and exactly what we needed to stand out. The admin panel simplified our operational dispatch and eliminated booking confusion completely."
            </blockquote>

            <div className="flex items-center gap-4 pt-6 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#2bd96b]/10 border border-[#2bd96b]/30 flex items-center justify-center font-heading font-bold text-[#2bd96b] text-lg">
                S
              </div>
              <div>
                <h5 className="text-base font-heading font-bold text-white">
                  Sunit Giria & Saket Goenka
                </h5>
                <p className="text-xs font-heading font-semibold uppercase tracking-widest text-[#8d869c]">
                  Co-founders, Drriftaire Technologies
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="glass-card p-6 rounded-2xl border-white/10 text-center">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2bd96b] block mb-1">
                3.8x
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c]">
                Faster Booking Intake
              </span>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/10 text-center">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-white block mb-1">
                15k+
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c]">
                Acres Scheduled
              </span>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/10 text-center">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#c9b2ff] block mb-1">
                0
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c]">
                Pilot Overlap Conflicts
              </span>
            </div>

            <div className="glass-card p-6 rounded-2xl border-white/10 text-center">
              <span className="text-3xl sm:text-4xl font-heading font-extrabold text-[#2bd96b] block mb-1">
                100%
              </span>
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-[#8d869c]">
                Digitized Field Logs
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: NEXT PROJECT CTA FOOTER
      ========================================================================== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] via-[#0e0d14] to-black text-center">
          <div className="max-w-2xl mx-auto relative z-10">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#2bd96b] block mb-3">
              Need a High-Impact Solution?
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight mb-6">
              Ready to transform your operations with world-class engineering?
            </h2>
            <p className="text-sm sm:text-base text-[#8d869c] mb-8 leading-relaxed">
              From complex real-time operational admin panels to conversion-optimized booking portals, Delectra builds software that turns bottlenecks into competitive advantages.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  onBack();
                  if (onOpenContact) {
                    setTimeout(onOpenContact, 200);
                  } else {
                    setTimeout(() => {
                      const el = document.getElementById('contact');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 250);
                  }
                }}
                className="px-8 py-4 rounded-full bg-[#2bd96b] hover:bg-[#25be5e] text-black font-heading font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_35px_rgba(43,217,107,0.35)] hover:scale-105 cursor-pointer flex items-center gap-2"
              >
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onBack}
                className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-heading font-bold uppercase tracking-wider text-sm transition-all cursor-pointer"
              >
                Back to All Works
              </button>
            </div>
          </div>
        </div>

        {/* Small Bottom Copyright */}
        <div className="pt-8 text-center text-xs text-[#8d869c]">
          © {new Date().getFullYear()} Delectra Digital Studio. All rights reserved. Drriftaire is a registered trademark of Drriftaire Technologies.
        </div>
      </section>
    </div>
  );
}
