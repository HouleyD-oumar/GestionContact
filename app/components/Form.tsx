"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";


// validation avec Zod
const contact = z.object({
  name: z
    .string()
    .nonempty("Le nom est obligatoire.")
    .regex(/^[a-zA-Z\s]+$/, "Le nom ne doit pas contenir de caractères spéciaux."),
  phoneNumber: z
    .string()
    .regex(/^6\d{8}$/, "Le numéro doit contenir 9 chiffres et commencer par 6."),
});

type Contact = z.infer<typeof contact>;

const Form: React.FC = () => {
  const [formData, setFormData] = useState<Contact>({ name: "", phoneNumber: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});

  // Soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = contact.safeParse(formData);

   if (!result.success) {
  const fieldErrors = result.error.flatten().fieldErrors;
  setErrors({
    name: fieldErrors.name?.[0] ?? "",
    phoneNumber: fieldErrors.phoneNumber?.[0] ?? "",
  });
  toast.error("Veuillez Remplir les champs ");
}
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col gap-6 p-6 bg-white shadow-lg rounded-2xl mt-20"
    >
      <h1 className="text-2xl font-bold text-gray-800 text-center">Formulaire de Saisie</h1>

      {/* Champ Nom */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          id="name"
          type="text"
          placeholder="Entrez le nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`border p-2 rounded-lg focus:outline-none focus:ring-2 ${
            errors.name
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
      </div>

      {/* Champ Numéro */}
      <div className="flex flex-col">
        <label htmlFor="phoneNumber" className="mb-1 text-sm font-medium text-gray-700">
          Numéro de téléphone
        </label>
        <input
          id="phoneNumber"
          type="text"
          placeholder="Ex: 612345678"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          className={`border p-2 rounded-lg focus:outline-none focus:ring-2 ${
            errors.phoneNumber
              ? "border-red-500 focus:ring-red-400"
              : "border-gray-300 focus:ring-blue-400"
          }`}
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>

      {/* Bouton */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors sm:py-3 sm:text-lg"
      >
        Ajouter
      </button>
    </form>
  );
};

export default Form;
