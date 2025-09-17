'use client'
import { useState } from 'react'
import type { PropertyFiltersDto } from '@/services/propertyService'

interface Props {
  initial: PropertyFiltersDto
  onFilter: (filters: PropertyFiltersDto) => void
}

export default function PropertyFilters({ initial, onFilter }: Props) {
  const [filters, setFilters] = useState<PropertyFiltersDto>({
    minPrice: 0,
    maxPrice: initial.maxPrice ?? 1_000_000,
    ...initial
  })

  const handleChange = (field: keyof PropertyFiltersDto, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }))
  }

  const handleClear = () => {
    const cleared: PropertyFiltersDto = {
      name: '',
      address: '',
      minPrice: 0,
      maxPrice: 1_000_000
    }
    setFilters(cleared)
    onFilter(cleared)
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={filters.name ?? ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
        <input
          type="text"
          placeholder="Buscar por dirección"
          value={filters.address ?? ''}
          onChange={(e) => handleChange('address', e.target.value)}
          className="border rounded-lg px-3 py-2"
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm text-slate-600 mb-2">
          Precio máximo: ${filters.maxPrice?.toLocaleString() ?? '0'}
        </label>
        <input
          type="range"
          min={0}
          max={1_000_000}
          step={10000}
          value={filters.maxPrice ?? 1_000_000}
          onChange={(e) => handleChange('maxPrice', Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={handleClear}
          type="button"
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Limpiar
        </button>
        <button
          onClick={() => onFilter(filters)}
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  )
}
