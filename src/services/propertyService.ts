const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5187/api'

export interface PropertyFiltersDto {
  name?: string
  address?: string
  minPrice?: number
  maxPrice?: number
  page?: number
  pageSize?: number
}

export interface PropertyDto {
  id: string
  idOwner: string
  name: string
  address: string
  price: number
  image?: string
}

/**
 * Build query string from filters (only defined fields)
 */
function buildQuery(filters?: PropertyFiltersDto) {
  if (!filters) return ''
  const params = new URLSearchParams()
  if (filters.name) params.append('name', filters.name)
  if (filters.address) params.append('address', filters.address)
  if (filters.minPrice !== undefined) params.append('minPrice', String(filters.minPrice))
  if (filters.maxPrice !== undefined) params.append('maxPrice', String(filters.maxPrice))
  if (filters.page !== undefined) params.append('page', String(filters.page))
  if (filters.pageSize !== undefined) params.append('pageSize', String(filters.pageSize))
  const s = params.toString()
  return s ? `?${s}` : ''
}

export async function fetchProperties(filters?: PropertyFiltersDto): Promise<PropertyDto[]> {
  const q = buildQuery(filters)
  const res = await fetch(`${API_URL}/properties${q}`)
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Fetch properties failed: ${res.status} ${text}`)
  }
  const json = await res.json()
  // ensure shape: map backend fields into frontend DTO if necessary
  return Array.isArray(json) ? json.map((p: any) => ({
    id: p.idProperty ?? p.id ?? p._id ?? '',
    idOwner: p.idOwner ?? p.ownerId ?? '',
    name: p.name ?? '',
    address: p.address ?? '',
    price: Number(p.price ?? 0),
    image: p.image ?? p.file ?? (p.images && p.images[0]) ?? undefined
  })) : []
}
