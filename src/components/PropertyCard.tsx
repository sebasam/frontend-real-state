"use client";

import type { PropertyDto } from "@/services/propertyService";

interface Props {
  property: PropertyDto;
  onClick: (property: PropertyDto) => void;
}

export default function PropertyCard({ property, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(property)}
      className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
    >
      <img
        src={property.imageUrl || "/placeholder.jpg"}
        alt={property.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h3 className="text-lg font-semibold text-slate-800">
          {property.name}
        </h3>
        <p className="text-sm text-slate-500">{property.address}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-slate-700 font-bold text-lg">
            ${property.price.toLocaleString()}
          </span>
          <span className="text-xs text-slate-400">
            Dueño: {property.ownerName || "Desconocido"}
          </span>
        </div>
      </div>
    </div>
  );
}
