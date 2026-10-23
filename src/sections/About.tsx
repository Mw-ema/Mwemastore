import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Hammer, Truck, Award } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-text',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      )

      gsap.fromTo(
        '.about-stat',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#F2F2F2]"
    >
      <div className="px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Content */}
          <div className="about-text">
            <p className="text-xs md:text-sm font-medium text-black/50 tracking-widest uppercase mb-4">
              About Us
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black mb-8">
              Crafted with
              <br />
              Purpose
            </h2>
            <div className="space-y-4 text-black/70 leading-relaxed max-w-lg">
              <p>
                Artisan Furniture Co. was born from a simple belief: that the furniture
                in your home should be as unique as the life you live. Each piece in our
                collection is carefully curated from independent makers who share our
                passion for sustainable, timeless design.
              </p>
              <p>
                We work directly with craftspeople across Scandinavia and beyond,
                ensuring fair wages while bringing you furniture that tells a story.
                From the grain of solid oak to the weave of natural rattan, every
                detail matters.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mt-10">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Leaf className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-black">Sustainable</h4>
                  <p className="text-xs text-black/50 mt-1">
                    Eco-friendly materials
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Hammer className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-black">Handcrafted</h4>
                  <p className="text-xs text-black/50 mt-1">
                    Made by artisans
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Truck className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-black">Free Shipping</h4>
                  <p className="text-xs text-black/50 mt-1">
                    On orders over $500
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-black/5 rounded-lg">
                  <Award className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-black">5-Year Warranty</h4>
                  <p className="text-xs text-black/50 mt-1">
                    Quality guaranteed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="/images/chair1.jpg"
                  alt="Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/images/table1.jpg"
                  alt="Materials"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src="/images/lamp1.jpg"
                  alt="Design"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-lg overflow-hidden">
                <img
                  src="/images/sofa1.jpg"
                  alt="Quality"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="about-stats grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 md:mt-28 pt-10 border-t border-black/10">
          <div className="about-stat">
            <p className="text-4xl md:text-5xl font-bold text-black">500+</p>
            <p className="text-sm text-black/50 mt-2">Pieces Sold</p>
          </div>
          <div className="about-stat">
            <p className="text-4xl md:text-5xl font-bold text-black">50+</p>
            <p className="text-sm text-black/50 mt-2">Artisan Partners</p>
          </div>
          <div className="about-stat">
            <p className="text-4xl md:text-5xl font-bold text-black">12</p>
            <p className="text-sm text-black/50 mt-2">Countries</p>
          </div>
          <div className="about-stat">
            <p className="text-4xl md:text-5xl font-bold text-black">98%</p>
            <p className="text-sm text-black/50 mt-2">Happy Customers</p>
          </div>
        </div>
      </div>
    </section>
  )
}
