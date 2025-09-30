'use client';

import React, { useState } from 'react';
import { useList } from '../services/ListService';
import { 
  ContactValidation, 
  contactSchema, 
  validateContactField,
  getNameHelperText,
  getPhoneHelperText,
  formatPhoneNumber
} from '../utils/validation';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddContactModal: React.FC<AddContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactValidation>({ name: '', phoneNumber: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactValidation, string>>>({});

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
  const { addContact } = useList();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await addContact(formData);
    
    if (!result.success && result.errors) {
      setErrors(result.errors);
    } else if (result.success) {
      setFormData({ name: '', phoneNumber: '' });
      setErrors({});
      onClose();
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
      <div className="relative bg-white/95 rounded-3xl p-10 w-full max-w-lg mx-auto shadow-2xl transform transition-all duration-300 ease-out scale-100">
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">Ajouter un contact</h2>

          {/* Champ Nom */}
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
              Nom
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder="Entrez le nom"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                onBlur={() => handleBlur('name')}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 w-full pr-10 ${
                  errors.name
                    ? 'border-red-500 focus:ring-red-400'
                    : formData.name && !errors.name
                    ? 'border-green-500 focus:ring-green-400'
                    : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {formData.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
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
              <div className="mt-1 text-xs">
                <p className={errors.name ? "text-red-500" : "text-gray-500"}>
                  {getNameHelperText(formData.name, errors.name)}
                </p>
              </div>
            )}
          </div>

          {/* Champ Numéro */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="mb-1 text-sm font-medium text-gray-700">
              Numéro de téléphone
            </label>
            <div className="relative">
              <input
                id="phoneNumber"
                type="text"
                placeholder="Ex: 6XX XX XX XX"
                value={formatPhoneNumber(formData.phoneNumber)}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                onBlur={() => handleBlur('phoneNumber')}
                className={`border p-2 rounded-lg focus:outline-none focus:ring-2 w-full pr-10 ${
                  errors.phoneNumber
                    ? 'border-red-500 focus:ring-red-400'
                    : formData.phoneNumber && !errors.phoneNumber
                    ? 'border-green-500 focus:ring-green-400'
                    : 'border-gray-300 focus:ring-blue-400'
                }`}
              />
              {formData.phoneNumber && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
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
              <div className="mt-1 text-xs">
                <p className={errors.phoneNumber ? "text-red-500" : "text-gray-500"}>
                  {getPhoneHelperText(formData.phoneNumber, errors.phoneNumber)}
                </p>
              </div>
            )}
          </div>

          {/* Bouton */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-2 px-4 rounded-lg transition-all duration-200 sm:py-3 sm:text-lg ${
              isFormValid()
                ? 'bg-blue-600 text-white hover:bg-blue-700 transform hover:-translate-y-0.5'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isFormValid() ? 'Ajouter' : 'Remplissez tous les champs'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;