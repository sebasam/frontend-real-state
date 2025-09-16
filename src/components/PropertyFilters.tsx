'use client'
import { useState } from 'react'
import type { PropertyFiltersDto } from '@/services/propertyService'

export default function PropertyFilters({ onFilter, initial }: { onFilter: (f: PropertyFiltersDto) => void, initial?: PropertyFiltersDto }) {
  const [name, setName] = useState(initial?.name ?? '')
  const [address, setAddress] = useState(initial?.address ?? '')
  const [min, setMin] = useState(initial?.minPrice ?? '')
  const [max, setMax] = useState(initial?.maxPrice ?? '')

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault()
    onFilter({
      name: name.trim() || undefined,
      address: address.trim() || undefined,
      minPrice: min === '' ? undefined : Number(min),
      maxPrice: max === '' ? undefined : Number(max),
      page: 1,
      pageSize: 24
    })
  }

  return (
    <form onSubmit={submit} className="bg-white rounded-2xl shadow p-6 grid gap-4 md:grid-cols-6 items-end">
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-600 mb-1">Buscar</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-brand-500" />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-slate-600 mb-1">Dirección</label>
        <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Dirección o ciudad" className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-brand-500" />
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-slate-600 mb-1">Mín</label>
        <input value={min} onChange={e => setMin(e.target.value)} placeholder="0" type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-brand-500" />
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm font-medium text-slate-600 mb-1">Máx</label>
        <input value={max} onChange={e => setMax(e.target.value)} placeholder="1000000" type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-brand-500" />
      </div>

      <div className="md:col-span-6 flex gap-3 justify-end">
        <button type="button" onClick={() => { setName(''); setAddress(''); setMin(''); setMax(''); onFilter({}) }} className="bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50">Limpiar</button>
        <button type="submit" className="bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-700">Aplicar</button>
      </div>
    </form>
  )
}
