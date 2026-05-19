import NavHeader from '@/components/NavHeader'
import Footer from '@/components/Footer'
import ArchRenderingContent from '@/components/ArchRenderingContent'
import Breadcrumb from '@/components/Breadcrumb'
import ExploreServices from '@/components/ExploreServices'

export const metadata = {
  title: 'Architectural Rendering Services — SeeIt Studio',
  description:
    'Studio-grade photorealistic architectural renders for architects, property developers and design studios. Exterior, interior, aerial and animation — UK-based team with 48hr turnaround.',
}

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Architectural Rendering' },
]

export default function ArchitecturalRenderingPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen">
        <Breadcrumb items={BREADCRUMB} />
        <ArchRenderingContent />
      </main>
      <ExploreServices currentSlug="architectural-rendering" />
      <Footer />
    </>
  )
}
