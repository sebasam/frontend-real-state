'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { PropertyDto, PropertyFiltersDto } from '@/services/propertyService'
import { fetchProperties } from '@/services/propertyService'
import PropertyFilters from '@/components/PropertyFilters/PropertyFilters'
import PropertyCard from '@/components/PropertyCard/PropertyCard'
import PropertyDetails from '@/components/PropertyDetails/PropertyDetails'
import Loader from '@/components/Loader'
import toast from 'react-hot-toast'

export default function HomePage() {
  const [filters, setFilters] = useState<PropertyFiltersDto>({})
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const queryParams = useMemo(
    () => ({ ...filters, page, pageSize }),
    [filters, page, pageSize]
  )

  const { data = [], isLoading, isError } = useQuery<PropertyDto[]>({
    queryKey: ['properties', queryParams],
    queryFn: () => fetchProperties(queryParams),
    staleTime: 30_000,
    placeholderData: [],
  })

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => a.price - b.price)
  }, [data])

  const handlePrev = () => {
    if (page > 1) setPage((p) => p - 1)
  }

  const handleNext = () => {
    if (data.length === pageSize) setPage((p) => p + 1)
  }

  const handleFilter = (f: PropertyFiltersDto) => {
    const hasFilter = Object.values(f).some((value) => value !== '' && value !== null && value !== undefined)
    if (!hasFilter) {
      toast('Por favor selecciona al menos un filtro', { icon: '⚠️' })
      return
    }

    setFilters(f)
    setPage(1)
  }


  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto p-6">
        <header className="mb-8 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-slate-900">🏡 Propiedades Disponibles</h2>
          <p className="text-sm text-slate-500 mt-1">
            Filtra por nombre, dirección o rango de precio
          </p>
        </header>

        <PropertyFilters
          onFilter={handleFilter}
          initial={filters}
        />

        {isLoading && <Loader />}
        {isError && (
          <div className="text-center py-6 text-red-600">
            Error cargando propiedades. Intenta de nuevo.
          </div>
        )}

        <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {sortedData.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              onClick={() => setSelectedPropertyId(p.id)}
            />
          ))}
        </section>

        {data.length === 0 && !isLoading && (
          <div className="mt-12 text-center text-slate-500">
            No se encontraron propiedades con esos filtros
          </div>
        )}

        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
          >
            ⬅️ Anterior
          </button>
          <span className="text-slate-600">Página {page}</span>
          <button
            onClick={handleNext}
            disabled={data.length < pageSize}
            className="px-4 py-2 bg-slate-200 rounded disabled:opacity-50"
          >
            Siguiente ➡️
          </button>
        </div>
      </main>

      <PropertyDetails
        propertyId={selectedPropertyId}
        onClose={() => setSelectedPropertyId(null)}
      />
    </div>
  )
}
