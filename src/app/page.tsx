'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { PropertyDto, PropertyFiltersDto } from '@/services/propertyService'
import { fetchProperties } from '@/services/propertyService'
import PropertyFilters from '@/components/PropertyFilters'
import PropertyCard from '@/components/PropertyCard'
import PropertyModal from '@/components/PropertyModal'

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFiltersDto>({})
  const [selectedProperty, setSelectedProperty] = useState<PropertyDto | null>(null)

  const memoFilters = useMemo(() => filters, [filters])

  const { data = [], isLoading, isError } = useQuery<PropertyDto[]>({
    queryKey: ['properties', memoFilters],
    queryFn: () => fetchProperties(memoFilters),
    staleTime: 30_000,
    placeholderData: []
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto p-6">
        <header className="mb-8 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-slate-900">🏡 Propiedades Disponibles</h2>
          <p className="text-sm text-slate-500 mt-1">
            Filtra por nombre, dirección o rango de precio
          </p>
        </header>

        <PropertyFilters onFilter={setFilters} initial={filters} />

        {isLoading && (
          <div className="text-center py-6 text-slate-500">Cargando propiedades...</div>
        )}
        {isError && (
          <div className="text-center py-6 text-red-600">
            Error cargando propiedades. Intenta de nuevo.
          </div>
        )}

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {data.map((p) => (
            <PropertyCard key={p.id} property={p} onClick={setSelectedProperty} />
          ))}
        </section>

        {data.length === 0 && !isLoading && (
          <div className="mt-12 text-center text-slate-500">
            No se encontraron propiedades con esos filtros
          </div>
        )}
      </main>

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
      />
    </div>
  )
}
