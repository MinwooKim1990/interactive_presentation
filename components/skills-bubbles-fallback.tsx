"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { type Skill, skillsData } from "@/data/skills-data"

interface SkillsBubblesFallbackProps {
  onSelectSkill: (skill: Skill) => void
  selectedSkill: Skill | null
}

export default function SkillsBubblesFallback({ onSelectSkill, selectedSkill }: SkillsBubblesFallbackProps) {
  // Implement mobile detection directly in the component
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Set initial value
    handleResize()

    // Listen for window resize events
    window.addEventListener("resize", handleResize)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4">
        {skillsData.map((skill) => {
          const isSelected = selectedSkill?.id === skill.id
          const baseSize = isMobile ? 30 : 40
          const size = baseSize + skill.importance * 3 // Base size on importance

          return (
            <motion.div
              key={skill.id}
              className="flex items-center justify-center cursor-pointer"
              animate={{
                scale: isSelected ? 1.1 : 1,
                zIndex: isSelected ? 10 : 1,
              }}
              onClick={() => onSelectSkill(skill)}
            >
              <div
                className={`
                  rounded-full flex items-center justify-center text-center overflow-hidden
                  transition-all duration-300 relative
                  ${isSelected ? "shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "shadow-[0_0_15px_rgba(255,255,255,0.1)]"}
                `}
                style={{
                  backgroundColor: skill.color,
                  width: `${size * 2}px`,
                  height: `${size * 2}px`,
                }}
              >
                {/* Background icon image */}
                {skill.iconUrl && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ transform: "translateY(-5%)" }}
                  >
                    <img
                      src={skill.iconUrl || "/placeholder.svg"}
                      alt={`${skill.name} icon`}
                      className="object-contain opacity-80"
                      style={{
                        width: size * 1.4,
                        height: size * 1.4,
                      }}
                    />
                  </div>
                )}

                {/* Text with outline effect */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-bold px-2 text-white relative z-10 text-center"
                    style={{
                      fontSize: `${Math.max(10, size / 2.5)}px`,
                      textShadow: `
                        -1px -1px 0 #000,  
                         1px -1px 0 #000,
                        -1px  1px 0 #000,
                         1px  1px 0 #000,
                         0px  2px 4px rgba(0,0,0,0.5)
                      `,
                      maxWidth: "90%",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: "1.2em",
                      maxHeight: "2.4em", // 2 lines maximum
                    }}
                  >
                    {skill.name}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

