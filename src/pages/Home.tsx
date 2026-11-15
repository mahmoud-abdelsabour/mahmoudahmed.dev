import About from '@/sections/About'
import Contact from '@/sections/Contact'
import Hero from '@/sections/Hero'
import Process from '@/sections/Process'
import Projects from '@/sections/Projects'
import Services from '@/sections/Services'
import TechStack from '@/sections/TechStack'
import Testimonials from '@/sections/Testimonials'

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <TechStack />
      <Process />
      <About />
      <Testimonials />
      <Contact />
    </>
  )
}
