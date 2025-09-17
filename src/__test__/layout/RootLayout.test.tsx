import { render, screen } from '@testing-library/react'
import RootLayout from '@/app/layout'

jest.mock('@/app/globals.css', () => ({}))
jest.mock('react-hot-toast', () => ({ Toaster: () => <div data-testid="toaster" /> }))
jest.mock('@/components/Header', () => () => <header data-testid="header" />)
jest.mock('@/providers/ReactQueryProvider', () => ({ children }: any) => <>{children}</>)

describe('RootLayout', () => {
  it('renderiza children correctamente junto con Header y Toaster', () => {
    render(
      <RootLayout>
        <div data-testid="child">Contenido de prueba</div>
      </RootLayout>
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('toaster')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
