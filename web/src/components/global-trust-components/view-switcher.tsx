"use client"

import { motion } from "framer-motion"
import { Building2, Landmark } from "lucide-react"
import { useView } from "@/lib/view-context"

export default function ViewSwitcher() {
  const { viewMode, toggleViewMode } = useView()

  return (
    <div className="fixed top-4 right-4 z-50">
      <motion.button
        onClick={toggleViewMode}
        className="flex items-center gap-2 px-4 py-2 bg-slate-50/90 backdrop-blur-md border border-gray-200 rounded-full text-sm font-medium text-navy hover:bg-gray-100 transition-colors shadow-lg"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className={`p-1.5 rounded-full ${viewMode === "enterprise" ? "bg-brand-blue/20 text-brand-blue" : "bg-brand-blue/20 text-brand-blue"}`}>
          {viewMode === "enterprise" ? (
            <Building2 className="w-4 h-4" />
          ) : (
            <Landmark className="w-4 h-4" />
          )}
        </div>
        <span className="hidden sm:inline">
          {viewMode === "enterprise" ? "Enterprise View" : "Government View"}
        </span>
        <span className="text-[10px] px-1.5 py-0.5 bg-[#334155] rounded text-slate">
          Switch
        </span>
      </motion.button>
    </div>
  )
}
