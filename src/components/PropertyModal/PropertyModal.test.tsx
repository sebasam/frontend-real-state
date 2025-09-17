import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyModal from "./PropertyModal";
import type { PropertyDto } from "@/services/propertyService";

describe("PropertyModal", () => {
  const mockProperty: PropertyDto = {
    id: "1",
    name: "Casa Bonita",
    address: "Bogotá, Colombia",
    price: 350000,
    ownerName: "Juan Pérez",
    imageUrl: "/casa.jpg",
    ownerId: "sdddd"
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("no renderiza nada si property es null", () => {
    render(<PropertyModal property={null} onClose={mockOnClose} />);
    expect(screen.queryByText(/casa bonita/i)).not.toBeInTheDocument();
  });

  it("renderiza correctamente la información de la propiedad", () => {
    render(<PropertyModal property={mockProperty} onClose={mockOnClose} />);

    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
    expect(
      screen.getByText(`💰 Precio: $${mockProperty.price.toLocaleString()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`👤 Dueño: ${mockProperty.ownerName}`)
    ).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toHaveAttribute("src", mockProperty.imageUrl);
    expect(img).toHaveAttribute("alt", mockProperty.name);
  });

  it("muestra 'Desconocido' si ownerName es null o undefined", () => {
    render(
      <PropertyModal
        property={{ ...mockProperty, ownerName: undefined }}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText("👤 Dueño: Desconocido")).toBeInTheDocument();
  });

  it("llama a onClose al hacer click en el botón de cerrar", () => {
    render(<PropertyModal property={mockProperty} onClose={mockOnClose} />);
    const closeButton = screen.getByText("✕");

    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
