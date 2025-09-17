import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyDetails from "./PropertyDetails";
import type { PropertyDto } from "@/services/propertyService";

// Mock fetch solo para este test
global.fetch = jest.fn();

describe("PropertyDetails", () => {
  const mockProperty: PropertyDto = {
    id: "1",
    name: "Casa Bonita",
    address: "Bogotá, Colombia",
    price: 350000,
    ownerName: "Juan Pérez",
    imageUrl: "/casa.jpg",
    ownerId: "owner1",
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    (fetch as jest.Mock).mockReset();
  });

  it("no renderiza nada si propertyId es null", () => {
    render(<PropertyDetails propertyId={null} onClose={mockOnClose} />);
    expect(screen.queryByText(/casa bonita/i)).not.toBeInTheDocument();
  });

  it("renderiza correctamente la información de la propiedad cuando fetch devuelve datos", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProperty,
    });

    render(<PropertyDetails propertyId="1" onClose={mockOnClose} />);

    // Esperamos a que el fetch se resuelva y se renderice el contenido
    await waitFor(() => {
      expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
      expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
      expect(
        screen.getByText(`💰 Precio: $${mockProperty.price.toLocaleString()}`)
      ).toBeInTheDocument();
      expect(
        screen.getByText(`👤 Dueño: ${mockProperty.ownerName}`)
      ).toBeInTheDocument();
    });

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toHaveAttribute("src", mockProperty.imageUrl);
    expect(img).toHaveAttribute("alt", mockProperty.name);
  });

  it("muestra 'Desconocido' si ownerName es null o undefined", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...mockProperty, ownerName: undefined }),
    });

    render(<PropertyDetails propertyId="1" onClose={mockOnClose} />);

    await waitFor(() => {
      expect(screen.getByText("👤 Dueño: Desconocido")).toBeInTheDocument();
    });
  });

  it("llama a onClose al hacer click en el botón de cerrar", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProperty,
    });

    render(<PropertyDetails propertyId="1" onClose={mockOnClose} />);
    await waitFor(() => screen.getByText(mockProperty.name));

    const closeButton = screen.getByRole("button", { name: /✕/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
