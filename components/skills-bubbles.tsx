"use client"

import { useEffect, useRef, useState, type RefObject } from "react"
import { motion } from "framer-motion"
import { type Skill, skillsData } from "@/data/skills-data"

interface Vector {
  x: number
  y: number
}

interface BubbleState extends Skill {
  position: Vector
  velocity: Vector
  radius: number
}

interface SkillsBubblesProps {
  onSelectSkill: (skill: Skill) => void
  selectedSkill: Skill | null
  containerRef: RefObject<HTMLDivElement>
}

export default function SkillsBubbles({ onSelectSkill, selectedSkill, containerRef }: SkillsBubblesProps) {
  const [bubbles, setBubbles] = useState<BubbleState[]>([])
  const animationRef = useRef<number>()
  // Implement mobile detection directly in the component
  const [isMobile, setIsMobile] = useState(false)

  // Handle mobile detection
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

  // Initialize bubbles with random positions and velocities
  useEffect(() => {
    if (!containerRef.current) return

    const containerWidth = containerRef.current.clientWidth
    const containerHeight = containerRef.current.clientHeight

    // Calculate center of container
    const centerX = containerWidth / 2
    const centerY = containerHeight / 2

    const initialBubbles = skillsData.map((skill) => {
      // Scale size based on importance (1-10)
      const baseRadius = isMobile ? 30 : 40
      const radius = baseRadius + skill.importance * 3

      // Position bubbles with a tendency to be near the center
      // Use a normal-like distribution instead of uniform
      const distanceFromCenter = Math.random() * 0.6 // 0-0.6 means bubbles are within 60% of the distance to edge
      const angle = Math.random() * Math.PI * 2 // Random angle

      // Calculate position with center bias
      const x = centerX + Math.cos(angle) * distanceFromCenter * (containerWidth / 2 - radius)
      const y = centerY + Math.sin(angle) * distanceFromCenter * (containerHeight / 2 - radius)

      return {
        ...skill,
        radius,
        position: {
          x: Math.max(radius, Math.min(containerWidth - radius, x)),
          y: Math.max(radius, Math.min(containerHeight - radius, y)),
        },
        velocity: {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5,
        },
      }
    })

    setBubbles(initialBubbles)

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return

      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      // Calculate center of new container
      const centerX = newWidth / 2
      const centerY = newHeight / 2

      setBubbles((prev) =>
        prev.map((bubble) => {
          // Calculate how far the bubble is from center
          const dx = bubble.position.x - centerX
          const dy = bubble.position.y - centerY

          // Scale the position to keep relative positioning from center
          // but ensure bubbles stay within bounds
          let newX = centerX + dx * (newWidth / containerRef.current!.clientWidth)
          let newY = centerY + dy * (newHeight / containerRef.current!.clientHeight)

          // Ensure bubbles stay within boundaries
          newX = Math.min(Math.max(bubble.radius, newX), newWidth - bubble.radius)
          newY = Math.min(Math.max(bubble.radius, newY), newHeight - bubble.radius)

          return {
            ...bubble,
            position: { x: newX, y: newY },
          }
        }),
      )
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [containerRef, isMobile])

  // Animation loop for bubble physics
  useEffect(() => {
    if (bubbles.length === 0 || !containerRef.current) return

    const animate = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.clientWidth
      const containerHeight = containerRef.current.clientHeight

      // Calculate center of container
      const centerX = containerWidth / 2
      const centerY = containerHeight / 2

      setBubbles((prevBubbles) => {
        // Create a copy to avoid direct state mutation
        const newBubbles = [...prevBubbles]

        // Update positions based on velocities
        for (let i = 0; i < newBubbles.length; i++) {
          const bubble = newBubbles[i]

          // Apply center-attracting force
          const dx = centerX - bubble.position.x
          const dy = centerY - bubble.position.y
          const distanceToCenter = Math.sqrt(dx * dx + dy * dy)

          // The further from center, the stronger the attraction
          // Adjust the 0.0005 value to control the strength of center attraction
          const centerForce = 0.0005
          bubble.velocity.x += dx * centerForce
          bubble.velocity.y += dy * centerForce

          // Apply slight random movement (Brownian motion)
          bubble.velocity.x += (Math.random() - 0.5) * 0.02
          bubble.velocity.y += (Math.random() - 0.5) * 0.02

          // Apply damping to prevent excessive speeds
          bubble.velocity.x *= 0.99
          bubble.velocity.y *= 0.99

          // Update position
          bubble.position.x += bubble.velocity.x
          bubble.position.y += bubble.velocity.y

          // Boundary collision detection - ensure bubbles stay within visible area
          if (bubble.position.x - bubble.radius < 0) {
            bubble.position.x = bubble.radius
            bubble.velocity.x *= -0.8
          } else if (bubble.position.x + bubble.radius > containerWidth) {
            bubble.position.x = containerWidth - bubble.radius
            bubble.velocity.x *= -0.8
          }

          if (bubble.position.y - bubble.radius < 0) {
            bubble.position.y = bubble.radius
            bubble.velocity.y *= -0.8
          } else if (bubble.position.y + bubble.radius > containerHeight) {
            bubble.position.y = containerHeight - bubble.radius
            bubble.velocity.y *= -0.8
          }
        }

        // Bubble collision detection and response
        for (let i = 0; i < newBubbles.length; i++) {
          for (let j = i + 1; j < newBubbles.length; j++) {
            const bubbleA = newBubbles[i]
            const bubbleB = newBubbles[j]

            // Calculate distance between bubble centers
            const dx = bubbleB.position.x - bubbleA.position.x
            const dy = bubbleB.position.y - bubbleA.position.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Check for collision
            const minDistance = bubbleA.radius + bubbleB.radius

            if (distance < minDistance) {
              // Calculate collision normal
              const nx = dx / distance
              const ny = dy / distance

              // Calculate relative velocity
              const relVelX = bubbleB.velocity.x - bubbleA.velocity.x
              const relVelY = bubbleB.velocity.y - bubbleA.velocity.y

              // Calculate relative velocity in terms of the normal direction
              const relVelDotNormal = relVelX * nx + relVelY * ny

              // Do not resolve if velocities are separating
              if (relVelDotNormal > 0) continue

              // Calculate restitution (bounciness)
              const restitution = 0.8

              // Calculate impulse scalar
              const impulseScalar = -(1 + restitution) * relVelDotNormal
              const massA = bubbleA.radius * bubbleA.radius
              const massB = bubbleB.radius * bubbleB.radius
              const impulseScalarA = impulseScalar * (massB / (massA + massB))
              const impulseScalarB = impulseScalar * (massA / (massA + massB))

              // Apply impulse
              bubbleA.velocity.x -= impulseScalarA * nx
              bubbleA.velocity.y -= impulseScalarA * ny
              bubbleB.velocity.x += impulseScalarB * nx
              bubbleB.velocity.y += impulseScalarB * ny

              // Move bubbles apart to prevent sticking
              const overlap = minDistance - distance
              const moveX = nx * overlap * 0.5
              const moveY = ny * overlap * 0.5

              bubbleA.position.x -= moveX
              bubbleA.position.y -= moveY
              bubbleB.position.x += moveX
              bubbleB.position.y += moveY
            }
          }
        }

        return newBubbles
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [bubbles.length, containerRef])

  return (
    <div className="absolute inset-0">
      {bubbles.map((bubble) => {
        const isSelected = selectedSkill?.id === bubble.id
        const iconSize = Math.max(bubble.radius * 0.7, 20) // Slightly smaller icon to make room for text

        return (
          <motion.div
            key={bubble.id}
            className="absolute flex items-center justify-center cursor-pointer select-none"
            style={{
              left: bubble.position.x - bubble.radius,
              top: bubble.position.y - bubble.radius,
              width: bubble.radius * 2,
              height: bubble.radius * 2,
            }}
            animate={{
              scale: isSelected ? 1.1 : 1,
              zIndex: isSelected ? 10 : 1,
            }}
            onClick={() => onSelectSkill(bubble)}
          >
            <div
              className={`
                rounded-full flex items-center justify-center text-center overflow-hidden
                transition-all duration-300 w-full h-full relative
                ${isSelected ? "shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "shadow-[0_0_15px_rgba(255,255,255,0.1)]"}
              `}
              style={{
                backgroundColor: bubble.color,
              }}
            >
              {/* Background icon image */}
              {bubble.iconUrl && (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transform: "translateY(-5%)" }}
                >
                  <img
                    src={bubble.iconUrl || "/placeholder.svg"}
                    alt={`${bubble.name} icon`}
                    className="object-contain opacity-80"
                    style={{
                      width: iconSize,
                      height: iconSize,
                    }}
                  />
                </div>
              )}

              {/* Text with outline effect */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="font-bold px-2 text-white relative z-10 text-center"
                  style={{
                    fontSize: `${Math.max(10, bubble.radius / 4.5)}px`, // Slightly smaller base font size
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
                  {bubble.name}
                </span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

