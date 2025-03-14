"use client"

import React, { useEffect, useRef, useState, type RefObject, useCallback } from "react"
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
  originalPosition?: Vector // 원래 위치 저장용
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
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]) // 여러 클릭 지원
  const clickIdCounterRef = useRef(0) // 클릭 ID 생성용 카운터
  const bubblesRef = useRef<BubbleState[]>([]) // 참조 저장용
  const containerDivRef = useRef<HTMLDivElement | null>(null); // 직접 DOM 참조 저장

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

  // 버블 상태가 변경될 때마다 참조 업데이트
  useEffect(() => {
    bubblesRef.current = bubbles;
  }, [bubbles]);

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

      const position = {
        x: Math.max(radius, Math.min(containerWidth - radius, x)),
        y: Math.max(radius, Math.min(containerHeight - radius, y)),
      }

      return {
        ...skill,
        radius,
        position,
        originalPosition: { ...position }, // 원래 위치 저장
        velocity: {
          x: (Math.random() - 0.5) * 0.2, // 초기 속도 더 감소
          y: (Math.random() - 0.5) * 0.2,
        },
      }
    })

    setBubbles(initialBubbles)
    bubblesRef.current = initialBubbles

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
            originalPosition: { x: newX, y: newY },
          }
        }),
      )
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [containerRef, isMobile])

  // 파동 효과를 위한 클릭 추가 함수 - useCallback으로 안정화
  const addClick = useCallback((x: number, y: number) => {
    const newClickId = clickIdCounterRef.current++;
    
    setClicks(prevClicks => [...prevClicks, { id: newClickId, x, y }]);
    
    // 1.5초 후에 해당 클릭 제거
    setTimeout(() => {
      setClicks(prevClicks => prevClicks.filter(click => click.id !== newClickId));
    }, 1500);
  }, []);

  // 완전히 새로운 클릭 핸들러
  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedSkill) return; // 스킬 선택 중이면 무시
    
    // 현재 컨테이너의 정확한 위치 계산
    if (!containerDivRef.current) return;
    
    const rect = containerDivRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    
    // 클릭한 위치가 버블 내부인지 확인
    const clickedOnBubble = bubblesRef.current.some(bubble => {
      const dx = bubble.position.x - clickX;
      const dy = bubble.position.y - clickY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance <= bubble.radius;
    });
    
    // 버블 외부 클릭시에만 클릭 효과 및 힘 적용
    if (!clickedOnBubble) {
      // 새 클릭 추가
      addClick(clickX, clickY);
      
      // 버블에 튕기는 힘 적용
      setBubbles(prevBubbles => {
        return prevBubbles.map(bubble => {
          // 클릭 위치에서 버블까지의 벡터
          const dx = bubble.position.x - clickX;
          const dy = bubble.position.y - clickY;
          const distance = Math.sqrt(dx * dx + dy * dy) + 5; // 최소 거리 추가로 0으로 나누는 것 방지
          
          // 클릭 위치에서 멀어지는 방향 - 정규화된 벡터
          const normalizedDx = dx / distance;
          const normalizedDy = dy / distance;
          
          // 거리에 따른 기본 힘 계산 (가까울수록 강한 힘)
          const adjustedDistance = Math.min(distance, 300);
          
          // 힘에 대한 기본 설정
          const maxForce = 80; // 51에서 20% 증가
          const minForce = 40; // 8에서 50% 증가 (멀리서도 확실히 움직이도록)
          
          // 거리에 따른 비선형적 감소 수정 (제곱에서 1.5승으로 변경 - 더 멀리까지 영향을 줌)
          const distanceRatio = adjustedDistance / 300;
          const forceMagnitude = maxForce * (1 - Math.pow(distanceRatio, 1.5));
          
          // 버블 크기(반지름)에 반비례하는 힘 조정 계수 (큰 버블은 더 적게 움직임)
          // 40은 기본 크기, 최소 0.7배에서 최대 1.3배까지 영향
          const sizeMultiplier = 1.3 - (bubble.radius / 40) * 0.6;
          
          // 방향에 약간의 변화 추가 (위치에 따라 다른 방향으로 퍼지게 함)
          // 중심에서의 상대적 위치에 따라 각도 조정
          const containerWidth = containerRef.current!.clientWidth;
          const containerHeight = containerRef.current!.clientHeight;
          const centerX = containerWidth / 2;
          const centerY = containerHeight / 2;
          
          // 중심에서 버블 위치의 상대적 각도 (라디안)
          const bubbleToCenterDx = bubble.position.x - centerX;
          const bubbleToCenterDy = bubble.position.y - centerY;
          const bubbleAngle = Math.atan2(bubbleToCenterDy, bubbleToCenterDx);
          
          // 각도에 기반한 방향 조정 (삼각함수 이용)
          // 이렇게 하면 위치에 따라 약간 다른 방향으로 움직임
          const angleEffect = 0.4; // 방향 다양성 정도 (0-1)
          const adjustedDx = normalizedDx + Math.cos(bubbleAngle) * angleEffect;
          const adjustedDy = normalizedDy + Math.sin(bubbleAngle) * angleEffect;
          
          // 조정된 방향 다시 정규화
          const adjustedMagnitude = Math.sqrt(adjustedDx * adjustedDx + adjustedDy * adjustedDy);
          const finalDx = adjustedDx / adjustedMagnitude;
          const finalDy = adjustedDy / adjustedMagnitude;
          
          // 최종 속도 계산 
          const finalForce = forceMagnitude * sizeMultiplier;
          
          return {
            ...bubble,
            velocity: {
              // 속도 누적 효과 (크기에 따른 누적 정도도 다르게 설정)
              x: bubble.velocity.x * (0.2 + 0.1 * (bubble.radius / 40)) + finalDx * finalForce,
              y: bubble.velocity.y * (0.2 + 0.1 * (bubble.radius / 40)) + finalDy * finalForce,
            }
          };
        });
      });
    }
  }, [addClick, selectedSkill, containerRef]);

  // 버블 클릭 핸들러
  const handleBubbleClick = useCallback((e: React.MouseEvent, bubble: BubbleState) => {
    e.stopPropagation(); // 이벤트 전파 중지
    onSelectSkill(bubble);
  }, [onSelectSkill]);

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

        // 모든 버블이 중앙 근처에 있는지 확인 (안정화 조건)
        const stabilizationRadius = containerWidth * 0.2; // 화면 너비의 20% 이내
        const allBubblesNearCenter = newBubbles.every(bubble => {
          const dx = centerX - bubble.position.x;
          const dy = centerY - bubble.position.y;
          const distanceToCenter = Math.sqrt(dx * dx + dy * dy);
          return distanceToCenter < stabilizationRadius;
        });

        // 버블들이 서로 충분히 가까운지 확인
        const averageDistance = calculateAverageDistance(newBubbles);
        const bubblesDensity = containerWidth * containerHeight / (newBubbles.length * 10000);
        const densityThreshold = bubblesDensity * 2; // 밀도에 따른 기준값 동적 계산
        
        // 안정화 상태 결정 - 모든 버블이 중앙 근처에 있고 서로 충분히 가까움
        const shouldStabilize = allBubblesNearCenter && averageDistance < densityThreshold;

        // Update positions based on velocities
        for (let i = 0; i < newBubbles.length; i++) {
          const bubble = newBubbles[i]

          // 중앙으로 끌어당기는 힘 적용
          const dx = centerX - bubble.position.x
          const dy = centerY - bubble.position.y
          const distanceToCenter = Math.sqrt(dx * dx + dy * dy)

          // 안정화 조건이 충족되면 중앙 힘과 랜덤 움직임을 매우 작게 적용
          if (shouldStabilize) {
            // 현재 속도의 크기 계산
            const currentVelocityMagnitude = Math.sqrt(
              bubble.velocity.x * bubble.velocity.x + 
              bubble.velocity.y * bubble.velocity.y
            );
            
            // 정지 임계값 - 속도가 이 값보다 작으면 완전히 정지
            const stoppingThreshold = 0.01;
            
            if (currentVelocityMagnitude < stoppingThreshold) {
              // 속도가 매우 작으면 완전히 정지
              bubble.velocity.x = 0;
              bubble.velocity.y = 0;
            } else {
              // 중심으로 향하는 힘 (크게 감소)
              const reducedCenterForce = 0.0001 * (distanceToCenter / 400);
              bubble.velocity.x += dx * reducedCenterForce;
              bubble.velocity.y += dy * reducedCenterForce;
              
              // 안정화 상태에서는 랜덤 움직임을 완전히 제거
              
              // 감쇠 효과 강화 (빨리 안정화되도록)
              bubble.velocity.x *= 0.9; // 더 강한 감쇠 적용
              bubble.velocity.y *= 0.9;
            }
          } else {
            // 일반 상태의 중심으로 향하는 힘
            const centerForce = 0.00085 * (1 + distanceToCenter / 200);
            bubble.velocity.x += dx * centerForce;
            bubble.velocity.y += dy * centerForce;

            // 일반 상태의 랜덤 움직임
            bubble.velocity.x += (Math.random() - 0.5) * 0.003;
            bubble.velocity.y += (Math.random() - 0.5) * 0.003;

            // 일반 상태의 감쇠 효과
            bubble.velocity.x *= 0.985;
            bubble.velocity.y *= 0.985;
          }

          // 위치 업데이트
          bubble.position.x += bubble.velocity.x
          bubble.position.y += bubble.velocity.y

          // 화면 경계 충돌 처리
          if (bubble.position.x - bubble.radius < 0) {
            bubble.position.x = bubble.radius
            bubble.velocity.x *= -0.85 // 15% 감소된 반발력
          } else if (bubble.position.x + bubble.radius > containerWidth) {
            bubble.position.x = containerWidth - bubble.radius
            bubble.velocity.x *= -0.85
          }

          if (bubble.position.y - bubble.radius < 0) {
            bubble.position.y = bubble.radius
            bubble.velocity.y *= -0.85
          } else if (bubble.position.y + bubble.radius > containerHeight) {
            bubble.position.y = containerHeight - bubble.radius
            bubble.velocity.y *= -0.85
          }
        }

        // 버블 간 충돌 처리
        for (let i = 0; i < newBubbles.length; i++) {
          for (let j = i + 1; j < newBubbles.length; j++) {
            const bubbleA = newBubbles[i]
            const bubbleB = newBubbles[j]

            // 두 버블 사이의 거리 계산
            const dx = bubbleB.position.x - bubbleA.position.x
            const dy = bubbleB.position.y - bubbleA.position.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            // 충돌 확인
            const minDistance = bubbleA.radius + bubbleB.radius

            if (distance < minDistance) {
              // 정규화된 충돌 방향
              const nx = dx / distance
              const ny = dy / distance

              // 상대 속도 계산
              const relVelX = bubbleB.velocity.x - bubbleA.velocity.x
              const relVelY = bubbleB.velocity.y - bubbleA.velocity.y

              // 노말 방향의 상대 속도
              const relVelDotNormal = relVelX * nx + relVelY * ny

              // 이미 분리 중이면 충돌 처리 안함
              if (relVelDotNormal > 0) continue

              // 반발력 계수 (탄성)
              // 안정화 상태에서는 반발력 감소
              const restitution = shouldStabilize ? 0.3 : 0.6;

              // 충격량 계산
              const impulseScalar = -(1 + restitution) * relVelDotNormal
              const massA = bubbleA.radius * bubbleA.radius
              const massB = bubbleB.radius * bubbleB.radius
              const impulseScalarA = impulseScalar * (massB / (massA + massB))
              const impulseScalarB = impulseScalar * (massA / (massA + massB))

              // 충격량 적용
              bubbleA.velocity.x -= impulseScalarA * nx
              bubbleA.velocity.y -= impulseScalarA * ny
              bubbleB.velocity.x += impulseScalarB * nx
              bubbleB.velocity.y += impulseScalarB * ny

              // 겹침 해결 (더 강하게)
              const overlap = minDistance - distance
              const moveX = nx * overlap * 0.9
              const moveY = ny * overlap * 0.9

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

    // 버블들 간의 평균 거리를 계산하는 헬퍼 함수
    const calculateAverageDistance = (bubbles: BubbleState[]) => {
      if (bubbles.length <= 1) return Infinity;
      
      let totalDistance = 0;
      let pairCount = 0;
      
      // 모든 버블 쌍의 거리 평균 계산
      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          const dx = bubbles[j].position.x - bubbles[i].position.x;
          const dy = bubbles[j].position.y - bubbles[i].position.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          totalDistance += distance;
          pairCount++;
        }
      }
      
      return totalDistance / pairCount;
    };

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [bubbles, containerRef])

  return (
    <div 
      ref={containerDivRef}
      className="absolute inset-0 cursor-pointer" 
      onClick={handleContainerClick}
    >
      {/* 다중 파동 효과 지원 - z-index 낮춤 */}
      {clicks.map(click => (
        <React.Fragment key={click.id}>
          {/* 첫 번째 파동 (작고 빠른) */}
          <motion.div
            className="absolute rounded-full border-[3px] border-blue-400 pointer-events-none z-[5]"
            style={{
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)',
              willChange: 'width, height, opacity', // 성능 최적화
              zIndex: 5 // 더 낮은 z-index로 버블 아래에 위치하도록 함
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ 
              width: [0, 250], 
              height: [0, 250], 
              opacity: [1, 0],
              borderWidth: [4, 1]
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          
          {/* 두 번째 파동 (크고 느린) */}
          <motion.div
            className="absolute rounded-full border-[3px] border-indigo-500 pointer-events-none z-[5]"
            style={{
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)',
              willChange: 'width, height, opacity', // 성능 최적화
              zIndex: 5 // 더 낮은 z-index로 버블 아래에 위치하도록 함
            }}
            initial={{ width: 0, height: 0, opacity: 0.9 }}
            animate={{ 
              width: [0, 350], 
              height: [0, 350], 
              opacity: [0.9, 0],
              borderWidth: [3, 0]
            }}
            transition={{ duration: 1.6, ease: "easeOut", delay: 0.1 }}
          />
          
          {/* 중앙 점 효과 */}
          <motion.div
            className="absolute rounded-full bg-white pointer-events-none z-[5]"
            style={{
              left: click.x,
              top: click.y,
              transform: 'translate(-50%, -50%)',
              willChange: 'width, height, opacity', // 성능 최적화
              zIndex: 5 // 더 낮은 z-index로 버블 아래에 위치하도록 함
            }}
            initial={{ width: 8, height: 8, opacity: 1 }}
            animate={{ 
              width: [8, 0], 
              height: [8, 0], 
              opacity: [1, 0]
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </React.Fragment>
      ))}
      
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
              zIndex: isSelected ? 30 : 20 // 버블의 z-index 증가 - 항상 파동보다 위에 표시
            }}
            animate={{
              scale: isSelected ? 1.1 : 1,
              zIndex: isSelected ? 30 : 20, // 애니메이션에서도 z-index 값 수정
            }}
            onClick={(e) => handleBubbleClick(e, bubble)}
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

