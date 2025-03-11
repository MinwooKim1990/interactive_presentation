"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import SkillsBubblesFallback from "@/components/skills-bubbles-fallback"
import SkillDetails from "@/components/skill-details"
import type { Skill } from "@/data/skills-data"

// Dynamically import the SkillsBubbles component with no SSR
// This prevents hydration errors with window-dependent code
const SkillsBubbles = dynamic(() => import("@/components/skills-bubbles"), {
  ssr: false,
  loading: () => <SkillsBubblesFallback onSelectSkill={() => {}} selectedSkill={null} />,
})

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative h-screen flex flex-col" ref={containerRef}>
        <div className="text-center mb-8">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            My Skills & Projects
          </motion.h1>
          <motion.p
            className="text-lg text-blue-300 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Click on any bubble to see details
          </motion.p>
        </div>

        <div className="relative flex-grow">
          <SkillsBubbles onSelectSkill={setSelectedSkill} selectedSkill={selectedSkill} containerRef={containerRef} />
        </div>

        <AnimatePresence>
          {selectedSkill && <SkillDetails skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
        </AnimatePresence>
      </div>
    </main>
  )
}

