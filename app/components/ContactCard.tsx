'use client';

// Carte qui affiche un contact avec des boutons pour modifier/supprimer

import React from 'react';
import { Contact } from '../types/Contact';

// Props du composant
interface ContactCardProps {
  // Le contact à afficher
  contact: Contact;
  // Fonction appelée quand on veut modifier
  onUpdate: (contact: Contact) => void;
  // Fonction appelée quand on veut supprimer
  onDelete: (contact: Contact) => void;
}

// Exemple d'utilisation :
// <ContactCard 
//   contact={{ id: 1, nom: "Jean", numero: "612345678" }}
//   onUpdate={modifierContact}
//   onDelete={supprimerContact}
// />
const ContactCard = ({ contact, onUpdate, onDelete }: ContactCardProps) => {

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 border border-gray-200/80">
      <div className="relative group">
        <div className="flex items-center gap-5">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-6 transition-all duration-300 shadow-lg">
              <span className="text-white font-bold text-2xl select-none">
                {contact.nom.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {contact.nom}
            </h3>
            <p className="text-gray-600 flex items-center gap-3 mt-1.5">
              <svg className="w-5 h-5 text-blue-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-gray-700 font-medium tracking-wide">{contact.numero}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdate(contact)}
              className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all duration-200 group flex items-center gap-2 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
              title="Modifier le contact"
            >
              <svg className="w-4.5 h-4.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              <span className="text-sm font-medium hidden group-hover:inline-block transition-all">
                Modifier
              </span>
            </button>

            <button
              onClick={() => onDelete(contact)}
              className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-200 group flex items-center gap-2 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-red-200"
              title="Supprimer le contact"
            >
              <svg className="w-4.5 h-4.5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="text-sm font-medium hidden group-hover:inline-block transition-all">
                Supprimer
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
