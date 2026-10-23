import Header from '@/sections/Header'
import Hero from '@/sections/Hero'
import Products from '@/sections/Products'
import About from '@/sections/About'
import Contact from '@/sections/Contact'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
  return (
    <div className="relative">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <Products />
        <About />
        <Contact />
      </main>
    </div>
  )
}
