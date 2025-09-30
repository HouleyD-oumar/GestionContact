'use client';

// Service principal pour gérer la liste des contacts
// Utilise Context API pour partager les données entre composants

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { showToast } from '../utils/toast';
import { Contact } from '../types/Contact';
import { ContactFormData, contactSchema, ContactFormErrors } from '../types/ContactForm';
import { initialContacts } from '../data/contactsData';
import { API_CONFIG, isApiAvailable } from '../config/api';

// Type pour le contexte de la liste des contacts
interface ListContextType {
  // La liste des contacts
  contacts: Contact[];
  // Ajoute un nouveau contact et renvoie le résultat
  addContact: (formData: ContactFormData) => Promise<{
    success: boolean;
    errors: ContactFormErrors | null;
  }>;
  // Met à jour un contact existant
  updateContact: (id: string | number, contact: Partial<Contact>) => void;
  // Supprime un contact
  deleteContact: (id: string | number) => void;
  // Indique si une opération est en cours
  loading: boolean;
  // Message d'erreur s'il y en a un
  error: string | null;
}

const ListContext = createContext<ListContextType | undefined>(undefined);


/**
 * Fournisseur de contexte pour la gestion des contacts
 * Gère l'état global des contacts et expose les méthodes CRUD
 * 
 * @param {Object} props - Les propriétés du composant
 * @param {React.ReactNode} props.children - Les composants enfants
 */
export function ListProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Effet pour charger les contacts au montage du composant
   * Tente d'abord de charger depuis l'API, utilise les données locales en fallback
   */
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      console.log('Tentative de chargement des contacts...');
      try {
        const apiAvailable = await isApiAvailable();
        console.log(`État de l'API: ${apiAvailable ? 'Disponible' : 'Indisponible'}`);
        
        if (apiAvailable) {
          console.log('Récupération des contacts depuis l\'API...');
          const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}`);
          if (response.ok) {
            const data = await response.json();
            setContacts(data);
          } else {
            throw new Error('Erreur lors de la récupération des contacts');
          }
        } else {
          setContacts(initialContacts);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
        console.error('Erreur lors de la récupération des contacts:', errorMessage);
        setError(`Erreur lors de la récupération des contacts: ${errorMessage}`);
        console.log('Utilisation des données locales comme fallback');
        setContacts(initialContacts);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Ajouter un nouveau contact
  const addContact = useCallback(async (formData: ContactFormData) => {
    setLoading(true);
    console.log('Tentative d\'ajout d\'un nouveau contact:', formData);
    try {
      console.log('Validation des données du formulaire...');
      const result = contactSchema.safeParse(formData);
      
      if (!result.success) {
        console.warn('Erreurs de validation détectées:', result.error.flatten().fieldErrors);
        const fieldErrors = result.error.flatten().fieldErrors;
        const errorMessage = fieldErrors.name?.[0] || fieldErrors.phoneNumber?.[0] || 'Erreur de validation';
        showToast.error(errorMessage);
        return {
          success: false,
          errors: {
            name: fieldErrors.name?.[0] || '',
            phoneNumber: fieldErrors.phoneNumber?.[0] || ''
          }
        };
      }

      if (await isApiAvailable()) {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nom: formData.name,
            numero: parseInt(formData.phoneNumber)
          })
        });

        if (!response.ok) {
          throw new Error('Erreur lors de l\'ajout du contact');
        }

        const newContact = await response.json();
        setContacts(prev => [...prev, newContact]);
        console.log('Contact ajouté avec succès:', newContact);
        showToast.success('Contact ajouté avec succès');
        return { success: true, errors: null };
      } else {
        const newContact = {
          id: Date.now(),
          nom: formData.name,
          numero: parseInt(formData.phoneNumber)
        };

        setContacts(prevContacts => [...prevContacts, newContact]);
        showToast.success('Contact ajouté avec succès (mode hors ligne)');
        return { success: true, errors: null };
      }
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
    console.log(`Tentative de mise à jour du contact ${id}:`, updatedFields);
    try {
      if (await isApiAvailable()) {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedFields)
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la mise à jour du contact');
        }

        const updatedContact = await response.json();
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact.id === id ? updatedContact : contact
          )
        );
        console.log('Contact mis à jour avec succès:', updatedContact);
      } else {
        console.log('Mode hors ligne: mise à jour locale');
        setContacts(prevContacts =>
          prevContacts.map(contact =>
            contact.id === id ? { ...contact, ...updatedFields } : contact
          )
        );
      }
      
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
    console.log(`Tentative de suppression du contact ${id}`);
    try {
      if (await isApiAvailable()) {
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTACTS}/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la suppression du contact');
        }
      }
      
      const contactToDelete = contacts.find(contact => contact.id === id);
      setContacts(prevContacts => 
        prevContacts.filter(contact => contact.id !== id)
      );
      
      console.log('Contact supprimé:', contactToDelete);
      showToast.success('Contact supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      showToast.error('Erreur lors de la suppression du contact');
    } finally {
      setLoading(false);
    }
  }, [contacts]);

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