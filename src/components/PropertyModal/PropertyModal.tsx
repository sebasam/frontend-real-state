"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { PropertyDto } from "@/services/propertyService";

interface Props {
  property: PropertyDto | null;
  onClose: () => void;
}

export default function PropertyModal({ property, onClose }: Props) {
  return (
    <AnimatePresence>
      {property && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 text-xl"
            >
              ✕
            </button>

            <img
              src={property.imageUrl || "/placeholder.jpg"}
              alt={property.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold text-slate-800">
              {property.name}
            </h3>
            <p className="text-slate-500 mt-1">{property.address}</p>

            <div className="mt-4 space-y-2">
              <p className="text-lg font-semibold text-slate-700">
                💰 Precio: ${property.price.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">
                👤 Dueño: {property.ownerName || "Desconocido"}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}