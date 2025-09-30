'use client';

import React, { useState } from 'react';
import { Contact } from '../types/Contact';
import { useList } from '../services/ListService';
import { 
  ContactValidation,
  contactSchema,
  validateContactField,
  getNameHelperText,
  getPhoneHelperText,
  formatPhoneNumber
} from '../utils/validation';

interface EditModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ contact, isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactValidation>({
    name: contact.nom,
    phoneNumber: contact.numero.toString(),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValidation, string>>>({});
  const { updateContact } = useList();

  // Vérifier si le formulaire est valide
  const isFormValid = () => {
    const result = contactSchema.safeParse(formData);
    return result.success && formData.name && formData.phoneNumber;
  };

  // Gestion des changements de champs
  const handleChange = (field: keyof ContactValidation, value: string) => {
    // Pour le numéro de téléphone, on formate la valeur
    const formattedValue = field === 'phoneNumber' ? formatPhoneNumber(value) : value;
    
    // On stocke toujours la valeur sans espaces dans le formData
    const rawValue = field === 'phoneNumber' ? formattedValue.replace(/\s/g, '') : formattedValue;
    setFormData(prev => ({ ...prev, [field]: rawValue }));

    // Validation du champ
    const error = validateContactField(field, rawValue);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Gestion de la perte de focus
  const handleBlur = (field: keyof ContactValidation) => {
    const error = validateContactField(field, formData[field]);
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  // Soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation finale avant la soumission
    const validationResult = contactSchema.safeParse(formData);
    if (!validationResult.success) {
      const formattedErrors: {[key: string]: string} = {};
      validationResult.error.issues.forEach(issue => {
        const path = issue.path[0];
        formattedErrors[path.toString()] = issue.message;
      });
      setErrors(formattedErrors);
      return;
    }

    try {
      await updateContact(contact.id, {
        nom: formData.name,
        numero: parseInt(formData.phoneNumber),
      });
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contact:', error);
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
            {/* Champ Nom */}
            <div className="relative">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Nom
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  className={`block w-full px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 text-base ${
                    errors.name
                      ? "border-2 border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : formData.name && !errors.name
                      ? "border-2 border-green-300 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      : "border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                  placeholder="Entrez le nom du contact"
                />
                {formData.name && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {errors.name ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {(!formData.name || errors.name) && (
                <div className="mt-2 text-sm">
                  <p className={errors.name ? "text-red-600" : "text-gray-500"}>
                    {getNameHelperText(formData.name, errors.name)}
                  </p>
                </div>
              )}
            </div>

            {/* Champ Numéro */}
            <div className="relative">
              <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Numéro
              </label>
              <div className="relative">
                <input
                  id="phoneNumber"
                  type="text"
                  value={formatPhoneNumber(formData.phoneNumber)}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  onBlur={() => handleBlur('phoneNumber')}
                  className={`block w-full px-5 py-4 rounded-2xl shadow-sm transition-all duration-200 text-base ${
                    errors.phoneNumber
                      ? "border-2 border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                      : formData.phoneNumber && !errors.phoneNumber
                      ? "border-2 border-green-300 bg-green-50 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                      : "border border-gray-200 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  }`}
                  placeholder="Ex: 6XX XX XX XX"
                />
                {formData.phoneNumber && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {errors.phoneNumber ? (
                      <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                )}
              </div>
              {(!formData.phoneNumber || errors.phoneNumber) && (
                <div className="mt-2 text-sm">
                  <p className={errors.phoneNumber ? "text-red-600" : "text-gray-500"}>
                    {getPhoneHelperText(formData.phoneNumber, errors.phoneNumber)}
                  </p>
                </div>
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
              disabled={!isFormValid()}
              className={`w-full sm:w-auto px-8 py-4 text-base font-semibold rounded-2xl transition-all duration-200 hover:shadow-md active:scale-95 ${
                isFormValid()
                  ? 'text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300'
                  : 'text-gray-500 bg-gray-200 cursor-not-allowed'
              }`}
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;