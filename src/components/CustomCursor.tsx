import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorText, setCursorText] = useState('')

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true)
        setCursorText('')
      } else if (target.closest('[data-cursor="drag"]')) {
        setIsHovering(true)
        setCursorText('DRAG')
      } else {
        setIsHovering(false)
        setCursorText('')
      }
    }

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.15
      cursorY += (mouseY - cursorY) * 0.15
      cursor.style.transform = `translate3d(${cursorX - 20}px, ${cursorY - 20}px, 0)`
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    const raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center transition-all duration-300 ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          isHovering
            ? 'border-black bg-white/10'
            : 'border-black/40 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="text-[8px] font-bold tracking-wider text-black">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
