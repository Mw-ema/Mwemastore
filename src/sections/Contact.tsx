import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-content',
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
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-black text-white"
    >
      <div className="px-6 md:px-12 contact-content">
        {/* Newsletter */}
        <div className="max-w-2xl mx-auto text-center mb-20 md:mb-28">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Stay Inspired
          </h2>
          <p className="text-white/60 mb-8">
            Join our newsletter for new arrivals, design tips, and exclusive offers.
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
            />
            <Button className="bg-white text-black hover:bg-white/90 shrink-0">
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Contact Grid */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-20">
          {/* Contact Info */}
          <div>
            <p className="text-xs md:text-sm font-medium text-white/50 tracking-widest uppercase mb-4">
              Get in Touch
            </p>
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
              We Would Love to Hear From You
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-white/60 text-sm">hello@artisanfurniture.co</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium">Showroom</p>
                  <p className="text-white/60 text-sm">
                    123 Design District<br />
                    Brooklyn, NY 11201
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-4 mt-10">
              <a
                href="#"
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 rounded-2xl p-6 md:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-400 mb-4" />
                <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                <p className="text-white/60">We will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-2 block">Message</label>
                  <Textarea
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 min-h-[120px]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-white/90"
                >
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 md:mt-28 pt-10 border-t border-white/10 px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-bold tracking-tight">ARTISAN</div>
          <p className="text-sm text-white/40">
            © 2024 Artisan Furniture Co. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Shipping</a>
          </div>
        </div>
      </footer>
    </section>
  )
}
