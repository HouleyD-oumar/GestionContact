'use client';

import React, { useState } from 'react';
import { Contact } from '../types/Contact';
import { useList } from '../services/ListService';

interface UpdateModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ contact, isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nom: contact.nom,
    numero: contact.numero.toString(),
  });
  const [errors, setErrors] = useState<{ nom?: string; numero?: string }>({});
  const { updateContact } = useList();

  const validateForm = () => {
    const newErrors: { nom?: string; numero?: string } = {};
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nom)) {
      newErrors.nom = "Le nom ne doit contenir que des lettres";
    }

    if (!formData.numero.trim()) {
      newErrors.numero = "Le numéro est requis";
    } else if (!/^6\d{8}$/.test(formData.numero)) {
      newErrors.numero = "Le numéro doit commencer par 6 et contenir 9 chiffres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await updateContact(contact.id, {
        nom: formData.nom,
        numero: parseInt(formData.numero),
      });
      onClose();
    } catch {
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 min-h-screen w-full bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white/95 rounded-3xl p-10 w-full max-w-lg mx-auto shadow-2xl transform transition-all duration-300 ease-out scale-100 border-l-8 border-blue-500">
        <div className="absolute top-0 right-0 -mt-4 -mr-4">
          <button 
            onClick={onClose}
            className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none group"
            title="Fermer"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform -rotate-6 shadow-lg mb-6">
            <span className="text-white font-bold text-3xl select-none">
              {contact.nom.charAt(0).toUpperCase()}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">Modifier le contact</h2>
          <p className="text-gray-500 mt-2">Modifier les informations de {contact.nom}</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <div className="relative">
              <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Nom
              </label>
              <input
                type="text"
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className={`block w-full px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 text-base ${
                  errors.nom
                    ? "border-2 border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
                placeholder="Entrez le nom du contact"
              />
              {errors.nom && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.nom}
                </p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="numero" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Numéro
              </label>
              <input
                type="text"
                id="numero"
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                className={`block w-full px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 text-base ${
                  errors.numero
                    ? "border-2 border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    : "border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                }`}
                placeholder="Exemple: 612345678"
              />
              {errors.numero && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {errors.numero}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 hover:shadow-md active:scale-95"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;