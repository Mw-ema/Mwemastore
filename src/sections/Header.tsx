import { useState, useEffect } from 'react'
import { ShoppingBag, Menu, X, Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { totalItems, items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 md:px-12 py-4 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-xl md:text-2xl font-bold tracking-tight text-black"
        >
          ARTISAN
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('products')}
            className="text-sm font-medium text-black/70 hover:text-black transition-colors"
          >
            Collection
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-black/70 hover:text-black transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-black/70 hover:text-black transition-colors"
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
                <ShoppingBag className="w-5 h-5 text-black" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-black text-white text-[10px]">
                    {totalItems}
                  </Badge>
                )}
              </button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md bg-white">
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">Your Cart</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col h-[calc(100vh-180px)]">
                {items.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <ShoppingBag className="w-12 h-12 text-black/20 mb-4" />
                    <p className="text-black/50">Your cart is empty</p>
                    <Button
                      onClick={() => {
                        setIsOpen(false)
                        scrollToSection('products')
                      }}
                      className="mt-4"
                      variant="outline"
                    >
                      Browse Collection
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-auto space-y-4 pr-2">
                      {items.map(item => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-3 bg-neutral-50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-black/60 mt-1">
                              ${item.price.toFixed(2)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-black/10 rounded"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-sm w-6 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-black/10 rounded"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 h-fit hover:bg-red-50 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">${totalPrice.toFixed(2)}</span>
                      </div>
                      <Button className="w-full bg-black text-white hover:bg-black/80">
                        Checkout
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('products')}
            className="block w-full text-left text-sm font-medium py-2"
          >
            Collection
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left text-sm font-medium py-2"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="block w-full text-left text-sm font-medium py-2"
          >
            Contact
          </button>
        </div>
      )}
    </header>
  )
}
