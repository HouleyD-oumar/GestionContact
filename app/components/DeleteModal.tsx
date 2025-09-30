'use client';
import React from 'react';
import { Contact } from '../types/Contact';

interface DeleteModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ contact, isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 min-h-screen w-full bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative bg-white/95 rounded-3xl p-10 w-full max-w-lg mx-auto shadow-2xl transform transition-all duration-300 ease-out scale-100 border-l-8 border-red-500">
        <div className="absolute top-0 right-0 -mt-4 -mr-4">
          <button 
            onClick={onClose} 
            className="bg-white p-2 rounded-full shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none group"
          >
            <svg className="w-6 h-6 text-gray-600 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-red-100 rounded-2xl transform rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl transform -rotate-3 flex items-center justify-center shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              Supprimer le contact
            </h3>
            <div className="space-y-2">
              <p className="text-lg text-gray-700">
                Êtes-vous sûr de vouloir supprimer
              </p>
              <p className="text-xl font-bold text-red-600">
                {contact.nom}
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="text-sm">Cette action est irréversible</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-gray-700 bg-gray-100 rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200 hover:shadow-md active:scale-95"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-2xl hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition-all duration-200 hover:shadow-md active:scale-95"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;