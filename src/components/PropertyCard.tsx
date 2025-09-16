'use client'
import { Tag, MapPin } from 'lucide-react'
import type { PropertyDto } from '@/services/propertyService'

export default function PropertyCard({ property }: { property: PropertyDto }) {
  const price = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(property.price)

  return (
    <article className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      <div className="h-52 w-full bg-gray-100">
        <img src={property.image ?? '/images/placeholder-house.jpg'} alt={property.name} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900">{property.name}</h3>
        <p className="text-sm text-slate-500 mt-1 flex items-center gap-2"><MapPin className="w-4 h-4" />{property.address}</p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400">Propietario</p>
            <p className="text-sm font-medium text-slate-800">{property.idOwner}</p>
          </div>
          <div className="text-right">
            <p className="text-indigo-600 font-bold">{price}</p>
            <p className="text-xs text-slate-400">Precio</p>
          </div>
        </div>

        <div className="mt-4">
          <button className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            <Tag className="w-4 h-4" /> Ver más
          </button>
        </div>
      </div>
    </article>
  )
}
