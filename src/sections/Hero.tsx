import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleTopRef = useRef<HTMLHeadingElement>(null)
  const titleBottomRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const titleTop = titleTopRef.current
    const titleBottom = titleBottomRef.current
    const meta = metaRef.current
    if (!section || !titleTop || !titleBottom || !meta) return

    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.fromTo(
        titleTop,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
      )
      gsap.fromTo(
        titleBottom,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 }
      )
      gsap.fromTo(
        meta,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, delay: 0.8 }
      )

      // Scroll-driven exit animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 0.5,
        },
      })

      tl.to(titleTop, {
        scale: 0.6,
        letterSpacing: '0.5em',
        opacity: 0,
        duration: 0.5,
      }, 0.3)
      tl.to(
        titleBottom,
        {
          scale: 0.6,
          letterSpacing: '0.5em',
          opacity: 0,
          duration: 0.5,
        },
        0.3
      )
      tl.to(meta, { opacity: 0, duration: 0.3 }, 0.3)
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen w-full bg-[#F2F2F2] overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.jpg"
          alt="Modern furniture interior"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F2F2]/60 via-transparent to-[#F2F2F2]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 md:px-12 py-24 md:py-32">
        {/* Top Left */}
        <div>
          <h1
            ref={titleTopRef}
            className="text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter text-black"
            style={{ willChange: 'transform, opacity' }}
          >
            ARTISAN
          </h1>
        </div>

        {/* Bottom Right */}
        <div className="text-right">
          <h1
            ref={titleBottomRef}
            className="text-[15vw] md:text-[12vw] font-bold leading-none tracking-tighter text-black"
            style={{ willChange: 'transform, opacity' }}
          >
            FURNITURE
          </h1>
        </div>

        {/* Meta Info */}
        <div
          ref={metaRef}
          className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 flex justify-between items-end"
        >
          <div className="space-y-1">
            <p className="text-xs md:text-sm font-medium text-black/60 tracking-widest uppercase">
              Curated Furniture
            </p>
            <p className="text-xs md:text-sm text-black/40">
              Est. 2024
            </p>
          </div>
          <div className="flex items-center gap-2 text-black/60">
            <span className="text-xs md:text-sm tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
          <div className="text-right space-y-1">
            <p className="text-xs md:text-sm font-medium text-black/60 tracking-widest uppercase">
              Handcrafted
            </p>
            <p className="text-xs md:text-sm text-black/40">
              Sustainable Design
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
