import NavHeader from '@/components/NavHeader'
import Footer from '@/components/Footer'
import RenderingServicesContent from '@/components/RenderingServicesContent'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata = {
  title: 'Rendering Services — SeeIt Studio',
  description:
    'Professional 3D rendering services for architects and designers across the UK. Architectural, interior, product rendering and animation with fast turnaround.',
}

const BREADCRUMB = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Rendering Services' },
]

export default function RenderingServicesPage() {
  return (
    <>
      <NavHeader />
      <main className="pt-20 md:pt-32 min-h-screen">
        <Breadcrumb items={BREADCRUMB} />
        <RenderingServicesContent />
      </main>
      <Footer />
    </>
  )
}
