'use client';
import { useState } from 'react';
import ContactCard from './ContactCard';
import { useList } from '../services/ListService';
import { Contact } from '../types/Contact';

const ListGrid = () => {
  const { contacts, addContact, loading, error } = useList();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center py-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Liste des contacts</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Nouveau contact
        </button>
      </div>
      
      {contacts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Aucun contact trouvé. Commencez par en ajouter un !
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      )}
    </div>
  );
};



export default ListGrid;
