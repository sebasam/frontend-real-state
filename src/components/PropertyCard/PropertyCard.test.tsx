import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PropertyCard from "./PropertyCard";
import type { PropertyDto } from "@/services/propertyService";

describe("PropertyCard", () => {
  const mockProperty: PropertyDto = {
    id: "1",
    name: "Casa Bonita",
    address: "Bogotá, Colombia",
    price: 350000,
    ownerName: "Juan Pérez",
    imageUrl: "/casa.jpg",
    ownerId: "dddddd"
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renderiza correctamente la información de la propiedad", () => {
    render(<PropertyCard property={mockProperty} onClick={mockOnClick} />);

    expect(screen.getByText(mockProperty.name)).toBeInTheDocument();
    expect(screen.getByText(mockProperty.address)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProperty.price.toLocaleString()}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Dueño: ${mockProperty.ownerName}`)).toBeInTheDocument();

    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toHaveAttribute("src", mockProperty.imageUrl);
    expect(img).toHaveAttribute("alt", mockProperty.name);
  });

  it("muestra 'Desconocido' si no hay ownerName", () => {
    render(
      <PropertyCard
        property={{ ...mockProperty, ownerName: undefined }}
        onClick={mockOnClick}
      />
    );
    expect(screen.getByText("Dueño: Desconocido")).toBeInTheDocument();
  });

  it("dispara onClick al hacer click en la tarjeta", () => {
    render(<PropertyCard property={mockProperty} onClick={mockOnClick} />);

    fireEvent.click(screen.getByText(mockProperty.name).closest("div")!);
    expect(mockOnClick).toHaveBeenCalledWith(mockProperty);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
