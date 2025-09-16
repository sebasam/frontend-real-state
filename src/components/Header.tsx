import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-brand-500">RealEstate</h1>
        </Link>

        <nav className="hidden md:flex gap-6 text-sm text-slate-600">
          <a className="hover:text-slate-900" href="#">Propiedades</a>
          <a className="hover:text-slate-900" href="#">Contacto</a>
        </nav>

      </div>
    </header>
  )
}
