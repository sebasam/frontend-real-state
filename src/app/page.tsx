'use client'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { PropertyDto, PropertyFiltersDto } from '@/services/propertyService'
import { fetchProperties } from '@/services/propertyService'
import PropertyFilters from '@/components/PropertyFilters'
import PropertyCard from '@/components/PropertyCard'

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFiltersDto>({})
  const memoFilters = useMemo(() => filters, [filters])

  const { data = [], isLoading, isError } = useQuery<PropertyDto[]>({
    queryKey: ['properties', memoFilters],
    queryFn: () => fetchProperties(memoFilters),
    staleTime: 30_000,
    placeholderData: []
  })

  return (
    <main>
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold">Propiedades</h2>
        <p className="text-sm text-slate-500 mt-1">Busca por nombre, dirección o rango de precio</p>
      </header>

      <PropertyFilters onFilter={setFilters} initial={filters} />

      {isLoading && <div className="text-center py-6 text-slate-500">Cargando...</div>}
      {isError && <div className="text-center py-6 text-red-600">Error cargando propiedades</div>}

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {data.map(p => <PropertyCard key={p.id} property={p} />)}
      </section>

      {data.length === 0 && !isLoading && (
        <div className="mt-12 text-center text-slate-500">No hay propiedades con esos filtros</div>
      )}
    </main>
  )
}
