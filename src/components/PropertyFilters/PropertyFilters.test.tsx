import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import PropertyFilters from './PropertyFilters'

describe('PropertyFilters', () => {
  const mockOnFilter = jest.fn()

  beforeEach(() => {
    mockOnFilter.mockClear()
  })

  it('renderiza los campos del formulario correctamente', () => {
    render(<PropertyFilters initial={{}} onFilter={mockOnFilter} />)

    expect(screen.getByPlaceholderText(/buscar por nombre/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/buscar por dirección/i)).toBeInTheDocument()
    expect(screen.getByRole('slider')).toBeInTheDocument() // input range
    expect(screen.getByRole('button', { name: /aplicar filtros/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument()
  })

  it('llama a onFilter con los datos correctos al aplicar filtros', () => {
    render(<PropertyFilters initial={{}} onFilter={mockOnFilter} />)

    fireEvent.change(screen.getByPlaceholderText(/buscar por nombre/i), {
      target: { value: 'Casa' },
    })
    fireEvent.change(screen.getByPlaceholderText(/buscar por dirección/i), {
      target: { value: 'Bogotá' },
    })
    fireEvent.change(screen.getByRole('slider'), {
      target: { value: 500000 },
    })

    fireEvent.click(screen.getByRole('button', { name: /aplicar filtros/i }))

    expect(mockOnFilter).toHaveBeenCalledWith({
      name: 'Casa',
      address: 'Bogotá',
      minPrice: 0,
      maxPrice: 500000,
    })
  })

  it('resetea los campos cuando se hace click en limpiar', () => {
    render(<PropertyFilters initial={{}} onFilter={mockOnFilter} />)

    fireEvent.change(screen.getByPlaceholderText(/buscar por nombre/i), {
      target: { value: 'Casa' },
    })
    fireEvent.change(screen.getByPlaceholderText(/buscar por dirección/i), {
      target: { value: 'Bogotá' },
    })
    fireEvent.change(screen.getByRole('slider'), {
      target: { value: 500000 },
    })

    fireEvent.click(screen.getByRole('button', { name: /limpiar/i }))

    expect(screen.getByPlaceholderText(/buscar por nombre/i)).toHaveValue('')
    expect(screen.getByPlaceholderText(/buscar por dirección/i)).toHaveValue('')
    expect(screen.getByRole('slider')).toHaveValue('1000000')
    expect(mockOnFilter).toHaveBeenCalledWith({
      name: '',
      address: '',
      minPrice: 0,
      maxPrice: 1000000,
    })
  })
})
