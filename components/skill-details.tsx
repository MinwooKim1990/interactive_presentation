"use client"

import { motion } from "framer-motion"
import type { Skill } from "@/data/skills-data"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface SkillDetailsProps {
  skill: Skill
  onClose: () => void
}

export default function SkillDetails({ skill, onClose }: SkillDetailsProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // 이미지 클릭 핸들러
  const handleImageClick = (imageUrl: string) => {
    if (enlargedImage === imageUrl) {
      setEnlargedImage(null);
    } else {
      setEnlargedImage(imageUrl);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {enlargedImage && (
        <div 
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/80"
          onClick={(e) => {
            e.stopPropagation();
            setEnlargedImage(null);
          }}
          style={{ pointerEvents: 'all' }}
        >
          <motion.img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-w-[90%] max-h-[90vh] object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
          />
        </div>
      )}

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
                      className={`aspect-video bg-gray-800/50 rounded-lg overflow-hidden flex items-center justify-center cursor-pointer ${
                        enlargedImage ? "" : "transition-transform hover:scale-[1.02]"
                      }`}
                      onClick={() => handleImageClick(image)}
                      style={{ 
                        pointerEvents: enlargedImage ? 'none' : 'auto',
                        // 확대 이미지가 표시될 때 클릭한 이미지는 뒤로 숨김
                        zIndex: enlargedImage === image ? -1 : 'auto'
                      }}
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

            {/* Case Studies Section */}
            <div className="case-studies-section">
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Case Studies</h3>
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed">{skill.details}</p>
                
                {/* 마크다운 콘텐츠 렌더링 */}
                {skill.markdownContent && (
                  <div className="markdown-content mt-4 text-lg leading-relaxed">
                    {/* @ts-ignore - 타입 오류 무시 */}
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      rehypePlugins={[rehypeRaw]}
                      components={{
                        p: ({children}) => <p className="text-lg leading-relaxed my-3">{children}</p>,
                        h1: ({children}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-blue-300">{children}</h1>,
                        h2: ({children}) => <h2 className="text-xl font-semibold mt-5 mb-3 text-blue-300">{children}</h2>,
                        h3: ({children}) => <h3 className="text-lg font-medium mt-4 mb-2 text-blue-200">{children}</h3>,
                        ul: ({children}) => <ul className="space-y-2 my-3">{children}</ul>,
                        li: ({children}) => (
                          <li className="ml-4 flex items-start gap-2">
                            <span className="text-blue-300 mt-1">•</span>
                            <span className="text-lg leading-relaxed">{children}</span>
                          </li>
                        ),
                        strong: ({children}) => <strong className="font-semibold text-blue-200">{children}</strong>,
                      }}
                    >
                      {skill.markdownContent}
                    </ReactMarkdown>
                  </div>
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

