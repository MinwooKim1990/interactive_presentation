"use client"

import { useState, useEffect } from "react"

// Change to default export
export default function useMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Adjust breakpoint as needed
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

  return isMobile
}

