'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Contact } from '../types/Contact';

interface ListContextType {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id'>) => void;
  updateContact: (id: string | number, contact: Partial<Contact>) => void;
  deleteContact: (id: string | number) => void;
  loading: boolean;
  error: string | null;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

import { initialContacts } from '../data/contactsData';

export function ListProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ajouter un nouveau contact
  const addContact = useCallback(async (newContact: Omit<Contact, 'id'>) => {
    console.log('[À IMPLEMENTER] Ajout d\'un contact:', newContact);
    // TODO: Implémenter l'ajout de contact avec l'API
    setLoading(true);
    try {
      const id = Date.now(); // Temporaire pour la démonstration
      const contactWithId = { ...newContact, id };
      console.log('Données à envoyer à l\'API:', contactWithId);
      setContacts(prevContacts => [...prevContacts, contactWithId]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un contact existant
  const updateContact = useCallback(async (id: string | number, updatedFields: Partial<Contact>) => {
    console.log('[À IMPLEMENTER] Mise à jour du contact:', { id, updatedFields });
    // TODO: Implémenter la mise à jour de contact avec l'API
    setLoading(true);
    try {
      console.log('Données à envoyer à l\'API:', { id, ...updatedFields });
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === id ? { ...contact, ...updatedFields } : contact
        )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un contact
  const deleteContact = useCallback(async (id: string | number) => {
    console.log('[À IMPLEMENTER] Suppression du contact:', id);
    // TODO: Implémenter la suppression de contact avec l'API
    setLoading(true);
    try {
      console.log('ID à envoyer à l\'API pour suppression:', id);
      setContacts(prevContacts => 
        prevContacts.filter(contact => contact.id !== id)
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const value: ListContextType = {
    contacts,
    addContact,
    updateContact,
    deleteContact,
    loading,
    error
  };

  return React.createElement(ListContext.Provider, { value }, children);
}

// Hook personnalisé pour utiliser le context
export function useList() {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useList doit être utilisé à l\'intérieur d\'un ListProvider');
  }
  return context;
}