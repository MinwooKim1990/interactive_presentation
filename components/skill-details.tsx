"use client"

import { motion } from "framer-motion"
import type { Skill } from "@/data/skills-data"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SkillDetailsProps {
  skill: Skill
  onClose: () => void
}

export default function SkillDetails({ skill, onClose }: SkillDetailsProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-4xl max-h-[90vh] overflow-auto rounded-xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Card className="border-none bg-gray-900/90 text-white shadow-2xl">
          <div className="relative p-6 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: skill.color }}
              >
                <span className="text-white text-xl font-bold">{skill.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{skill.name}</h2>
                <p className="text-blue-300">Importance: {Array(skill.importance).fill("★").join("")}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <CardContent className="p-6 space-y-6">
            {/* Images Section */}
            {skill.images && skill.images.length > 0 && (
              <div className="image-section">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Images</h3>
                <div className={`grid ${skill.images.length > 1 ? "grid-cols-2 gap-4" : "grid-cols-1"}`}>
                  {skill.images.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${skill.name} - image ${index + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description Section */}
            <div className="description-section">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Description</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{skill.details}</p>

                {skill.achievements && skill.achievements.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mt-4 mb-2">Key Achievements</h3>
                    <ul className="space-y-2">
                      {skill.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Video Section */}
            {skill.videoUrl && (
              <div className="video-section">
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Video</h3>
                <div className="aspect-video bg-gray-800/50 rounded-lg overflow-hidden">
                  <iframe
                    src={skill.videoUrl}
                    title={`${skill.name} video`}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

