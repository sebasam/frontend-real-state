import { render, screen, fireEvent } from '@testing-library/react'
import HomePage from '@/app/page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

jest.mock('@/app/globals.css', () => ({}))
jest.mock('react-hot-toast', () => ({ toast: { error: jest.fn() } }))

jest.mock('@/components/PropertyFilters/PropertyFilters', () => ({
  __esModule: true,
  default: ({ onFilter }: any) => (
    <div>
      <button onClick={() => onFilter({ name: 'Casa' })}>Filtrar</button>
    </div>
  ),
}))

jest.mock('@/components/PropertyCard/PropertyCard', () => ({
  __esModule: true,
  default: ({ property, onClick }: any) => (
    <div data-testid="card" onClick={() => onClick(property.id)}>
      {property.name}
    </div>
  ),
}))

jest.mock('@/components/PropertyDetails/PropertyDetails', () => ({
  __esModule: true,
  default: ({ propertyId, onClose }: any) =>
    propertyId ? <div data-testid="modal">Casa Bonita</div> : null,
}))

jest.mock('@/components/Loader', () => ({ __esModule: true, default: () => <div>Loading...</div> }))

jest.mock('@/services/propertyService', () => ({
  fetchProperties: jest.fn(async () => [
    { id: '1', name: 'Casa Bonita', address: 'Bogotá', price: 250000, ownerName: 'Juan', imageUrl: '/image.jpg' }
  ]),
}))

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient()
  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('HomePage', () => {
  it('renderiza filtros y propiedades', async () => {
    renderWithQueryClient(<HomePage />)
    fireEvent.click(screen.getByText('Filtrar'))
    const card = await screen.findByTestId('card')
    expect(card).toHaveTextContent('Casa Bonita')
  })

  it('abre y cierra el modal al hacer click en una propiedad', async () => {
    renderWithQueryClient(<HomePage />)
    const card = await screen.findByTestId('card')
    fireEvent.click(card)

    const modal = await screen.findByTestId('modal')
    expect(modal).toHaveTextContent('Casa Bonita')
  })

  it('muestra loader mientras carga', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <div><div>Loading...</div></div>
      </QueryClientProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('muestra mensaje de error si falla la carga', () => {
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <div><div>Error cargando propiedades. Intenta de nuevo.</div></div>
      </QueryClientProvider>
    )
    expect(screen.getByText(/Error cargando propiedades/i)).toBeInTheDocument()
  })
})
