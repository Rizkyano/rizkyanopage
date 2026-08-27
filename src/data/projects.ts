export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  status: string;
  url: string;
  image: string;
  gradientTheme: string;
  accentColor: string;
  buttonGradient: string;
  iconType: 'layers' | 'cart' | 'terminal' | 'cpu';
  description: string;
  features: string[];
  stack: string[];
  details: {
    role: string;
    overview: string;
    metrics?: string[];
  };
}

export const PROJECTS: Project[] = [
  {
    id: "arcane-card",
    number: "01 / 03",
    title: "ArcaneCard TCG Platform",
    category: "E-COMMERCE & TCG ECOSYSTEM",
    year: "2025–2026",
    status: "Live",
    url: "arcane-card.vercel.app",
    image: "/projects/arcane-card.png",
    gradientTheme: "from-amber-900/30 via-yellow-900/20 to-slate-900/40",
    accentColor: "#f59e0b",
    buttonGradient: "from-amber-500 via-orange-500 to-yellow-500",
    iconType: "cart",
    description: "A specialized e-commerce platform for authentic Pokémon TCG and One Piece Card Game collectibles, single cards, sealed booster boxes, graded slabs (PSA/BGS), and an automated consignment program.",
    features: [
      "Pokémon & One Piece TCG catalog",
      "PSA & BGS authenticated graded cards",
      "Automated consignment & draft system",
      "Instant cart management & WhatsApp checkout"
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "Turbopack"],
    details: {
      role: "Full Stack Developer & UI/UX Designer",
      overview: "A modern, high-performance e-commerce platform built for trading card game collectors and competitive players, featuring real-time consignment management, graded slab verification, and seamless checkout pipelines.",
      metrics: ["100% Authenticity Guaranteed", "Multi-TCG Product Matrix", "Instant WhatsApp Checkout"]
    }
  },
  {
    id: "enterprise-mandiri",
    number: "02 / 03",
    title: "Enterprise Mandiri ERP",
    category: "FULLSTACK ERP & FINANCE",
    year: "2025–2026",
    status: "Live",
    url: "enterprise-mandiri.vercel.app",
    image: "/projects/enterprise-mandiri.png",
    gradientTheme: "from-blue-900/30 via-indigo-900/20 to-slate-900/40",
    accentColor: "#2563eb",
    buttonGradient: "from-blue-600 via-indigo-600 to-cyan-500",
    iconType: "cpu",
    description: "A comprehensive modular enterprise resource planning system managing end-to-end supply chain logistics, inventory thresholds, procurement POs, sales invoicing, and automated double-entry general ledger accounting.",
    features: [
      "Automated GL double-entry journal audit trail",
      "ACID ledger compliant transaction engine",
      "Real-time inventory & low-stock alerts",
      "Interactive financial cash flow & revenue analytics"
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Recharts", "Lucide Icons", "PostgreSQL"],
    details: {
      role: "Full Stack Engineer & System Architect",
      overview: "An enterprise-grade operational cockpit designed for modern businesses, streamlining procurement, inventory auditing, invoicing, and real-time double-entry financial reporting with strict ACID ledger validation.",
      metrics: ["ACID Ledger Compliant", "Real-Time Stock Alerts", "Zero Balance Mismatch"]
    }
  },
  {
    id: "tripyourtravel",
    number: "03 / 03",
    title: "TravelTrip Experience",
    category: "TRAVEL PLATFORM & BOOKING",
    year: "2025–2026",
    status: "Live",
    url: "tripyourtravel.vercel.app",
    image: "/projects/travel-trip.png",
    gradientTheme: "from-sky-900/30 via-cyan-900/20 to-slate-900/40",
    accentColor: "#0284c7",
    buttonGradient: "from-sky-500 via-cyan-500 to-teal-500",
    iconType: "layers",
    description: "An intuitive travel discovery and booking platform curated for Indonesian and global destinations, featuring comprehensive trip itineraries, interactive reservations, and travel guides.",
    features: [
      "Domestic & international destination exploration",
      "Interactive tour packages & booking system",
      "Comprehensive educational travel guides",
      "Ultra-responsive modern travel interface"
    ],
    stack: ["React", "TypeScript", "Tailwind CSS", "Vite", "Lucide Icons"],
    details: {
      role: "Frontend Developer & UI/UX Designer",
      overview: "A responsive travel platform empowering travelers to discover curated domestic and international destinations, compare tour packages, and navigate detailed travel itineraries with ease.",
      metrics: ["Sub-Second Page Load", "Dynamic Itinerary Builder", "100% Mobile Optimized"]
    }
  }
];
