import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag, Eye } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

gsap.registerPlugin(ScrollTrigger)

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Nordic Oak Chair',
    price: 349.00,
    image: '/images/chair1.jpg',
    category: 'Chairs',
    description: 'Handcrafted from solid oak with a woven rattan seat. A perfect blend of Scandinavian minimalism and timeless comfort.',
  },
  {
    id: 2,
    name: 'Velvet Lounge Chair',
    price: 599.00,
    image: '/images/chair2.jpg',
    category: 'Chairs',
    description: 'Luxurious emerald green velvet upholstery with elegant gold metal legs. A statement piece for any living space.',
  },
  {
    id: 3,
    name: 'Marble Dining Table',
    price: 1299.00,
    image: '/images/table1.jpg',
    category: 'Tables',
    description: 'Minimalist round marble top with thin black metal legs. Elegant Scandinavian design for modern dining.',
  },
  {
    id: 4,
    name: 'Brass Floor Lamp',
    price: 279.00,
    image: '/images/lamp1.jpg',
    category: 'Lighting',
    description: 'Stylish floor lamp with a natural linen drum shade on a slim brass stand. Warm ambient lighting for cozy evenings.',
  },
  {
    id: 5,
    name: 'Terracotta Sofa',
    price: 1899.00,
    image: '/images/sofa1.jpg',
    category: 'Sofas',
    description: 'Cozy modern fabric sofa in warm terracotta. Minimalist Scandinavian design with soft plush cushions and wooden legs.',
  },
  {
    id: 6,
    name: 'Walnut Bookshelf',
    price: 749.00,
    image: '/images/shelf1.jpg',
    category: 'Storage',
    description: 'Geometric asymmetrical bookshelf in dark walnut. A sculptural storage solution that doubles as wall art.',
  },
  {
    id: 7,
    name: 'Oak Sideboard',
    price: 899.00,
    image: '/images/sideboard1.jpg',
    category: 'Storage',
    description: 'Minimalist sideboard in light oak with thin black metal legs. Sliding doors and drawers for elegant organization.',
  },
  {
    id: 8,
    name: 'Boucle Armchair',
    price: 449.00,
    image: '/images/chair3.jpg',
    category: 'Chairs',
    description: 'Rounded organic armchair with cream boucle fabric. Solid wood legs and a cozy, enveloping silhouette.',
  },
  {
    id: 9,
    name: 'Oak Desk',
    price: 599.00,
    image: '/images/desk1.jpg',
    category: 'Tables',
    description: 'Clean Scandinavian home office desk in natural oak. Thin metal legs and a spacious workspace surface.',
  },
]

const categories = ['All', 'Chairs', 'Tables', 'Sofas', 'Lighting', 'Storage']

export default function Products() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const { addItem } = useCart()

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const section = sectionRef.current
    const grid = gridRef.current
    if (!section || !grid) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.products-title',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        }
      )

      gsap.fromTo(
        '.product-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [selectedCategory])

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
  }

  return (
    <section
      id="products"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-white"
    >
      <div className="px-6 md:px-12">
        {/* Section Header */}
        <div className="products-title mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium text-black/50 tracking-widest uppercase mb-4">
            Our Collection
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black">
            Featured Pieces
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-10 md:mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 md:px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-black text-white'
                  : 'bg-neutral-100 text-black/60 hover:bg-neutral-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="product-card group cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-3 bg-white rounded-full hover:bg-black hover:text-white transition-colors shadow-lg"
                    data-cursor="pointer"
                  >
                    <ShoppingBag className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="p-3 bg-white rounded-full hover:bg-black hover:text-white transition-colors shadow-lg"
                    data-cursor="pointer"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-black/50 tracking-wider uppercase">
                  {product.category}
                </p>
                <h3 className="text-lg font-medium text-black group-hover:text-black/70 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-black">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-2xl bg-white">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedProduct.name}
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="aspect-square bg-neutral-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-black/50 tracking-wider uppercase mb-2">
                      {selectedProduct.category}
                    </p>
                    <p className="text-black/70 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    <p className="text-2xl font-bold text-black mt-4">
                      ${selectedProduct.price.toFixed(2)}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      handleAddToCart(selectedProduct)
                      setSelectedProduct(null)
                    }}
                    className="w-full mt-6 bg-black text-white hover:bg-black/80"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
