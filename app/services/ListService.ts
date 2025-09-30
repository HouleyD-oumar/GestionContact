'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { showToast } from '../utils/toast';
import { Contact } from '../types/Contact';
import { ContactFormData, contactSchema, ContactFormErrors } from '../types/ContactForm';
import { initialContacts } from '../data/contactsData';

interface ListContextType {
  contacts: Contact[];
  addContact: (formData: ContactFormData) => Promise<{
    success: boolean;
    errors: ContactFormErrors | null;
  }>;
  updateContact: (id: string | number, contact: Partial<Contact>) => void;
  deleteContact: (id: string | number) => void;
  loading: boolean;
  error: string | null;
}

const ListContext = createContext<ListContextType | undefined>(undefined);


export function ListProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  // Ajouter un nouveau contact
  const addContact = useCallback(async (formData: ContactFormData) => {
    console.log('[À IMPLEMENTER] Validation et ajout d\'un contact:', formData);
    setLoading(true);
    try {
      // Validation du formulaire avec Zod
      const result = contactSchema.safeParse(formData);
      
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        const errorMessage = fieldErrors.name?.[0] || fieldErrors.phoneNumber?.[0] || 'Erreur de validation';
        showToast.error(errorMessage);
        return { success: false, errors: {
          name: fieldErrors.name?.[0] || '',
          phoneNumber: fieldErrors.phoneNumber?.[0] || ''
        }};
      }

      // Création du contact (placeholder pour l'API)
      const id = Date.now();
      const newContact = {
        id,
        nom: formData.name,
        numero: parseInt(formData.phoneNumber)
      };

      // Simulation d'ajout (à remplacer par l'appel API)
      console.log('Données à envoyer à l\'API:', newContact);
      setContacts(prevContacts => [...prevContacts, newContact]);
      showToast.success('Contact ajouté avec succès');
      return { success: true, errors: null };
    } catch (error) {
      console.error('Erreur lors de l\'ajout:', error);
      showToast.error('Erreur lors de l\'ajout du contact');
      return { success: false, errors: null };
    } finally {
      setLoading(false);
    }
  }, []);

  // Mettre à jour un contact existant
  const updateContact = useCallback(async (id: string | number, updatedFields: Partial<Contact>) => {
    setLoading(true);
    try {
      // Validation des données mises à jour
      const contactData = {
        name: updatedFields.nom,
        phoneNumber: String(updatedFields.numero)
      };
      
      const result = contactSchema.safeParse(contactData);
      
      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        showToast.error(fieldErrors.name?.[0] || fieldErrors.phoneNumber?.[0] || 'Erreur de validation');
        return;
      }

      // Simulation d'appel API
      setContacts(prevContacts =>
        prevContacts.map(contact =>
          contact.id === id ? { ...contact, ...updatedFields } : contact
        )
      );
      
      showToast.success('Contact mis à jour avec succès');
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      showToast.error('Erreur lors de la mise à jour du contact');
    } finally {
      setLoading(false);
    }
  }, []);

  // Supprimer un contact
  const deleteContact = useCallback(async (id: string | number) => {
    setLoading(true);
    try {
      // Simulation d'appel API
      setContacts(prevContacts => 
        prevContacts.filter(contact => contact.id !== id)
      );
      
      showToast.success('Contact supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      showToast.error('Erreur lors de la suppression du contact');
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