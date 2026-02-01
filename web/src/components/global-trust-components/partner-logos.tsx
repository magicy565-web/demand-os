"use client"

import { motion } from "framer-motion"
import { Building2, Award, Ship, Shield, Globe, Warehouse, BadgeCheck } from "lucide-react"
import { content } from "@/lib/locale"

const partners = [
  { name: "CES 2026", icon: Globe },
  { name: "Canton Fair", icon: Warehouse },
  { name: "Messe Frankfurt", icon: Building2 },
  { name: "Global Sources", icon: Globe },
  { name: "COSCO Shipping", icon: Ship },
  { name: "SGS Verified", icon: Shield },
  { name: "TUV Rheinland", icon: BadgeCheck },
]

export default function PartnerLogos() {
  return (
    <section className="py-12 border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate text-xs tracking-[0.2em] mb-8 uppercase">
          {content.partners.text}
        </p>
        
        {/* Logo strip with hover effect */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
          {partners.map((partner, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-2 text-lg md:text-xl font-bold text-navy hover:text-brand-blue transition-colors cursor-default"
            >
              <partner.icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden sm:inline">{partner.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
