'use client';
import { useState } from 'react';
import ContactCard from './ContactCard';
import { useList } from '../services/ListService';
import Form from './Form';
import UpdateModal from './UpdateModal';
import DeleteModal from './DeleteModal';
import { Contact } from '../types/Contact';

const ListGrid = () => {
  const { contacts, loading, error, deleteContact } = useList();
  const [showForm, setShowForm] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleUpdateClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedContact) {
      try {
        await deleteContact(selectedContact.id);
        setIsDeleteModalOpen(false);
      } catch {
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-600">
        <div className="text-center">
          <svg className="w-12 h-12 mx-auto text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-gray-200/80">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center transform -rotate-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Liste des contacts</h1>
            <p className="text-gray-500 flex items-center gap-2">
              <span className="inline-flex items-center justify-center bg-blue-100 text-blue-600 rounded-lg px-2.5 py-0.5 text-sm font-medium">
                {contacts.length}
              </span>
              contact{contacts.length !== 1 ? 's' : ''} enregistré{contacts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>{showForm ? "Fermer" : "Nouveau contact"}</span>
        </button>
      </div>
      
      {showForm && (
        <div className="animate-slideDown">
          <Form />
        </div>
      )}
      
      {/* Liste des contacts */}
      {contacts.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500 bg-white/95 backdrop-blur-md rounded-2xl p-12 border border-gray-200/80">
          <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 transform -rotate-6">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun contact trouvé</h3>
          <p className="text-base text-gray-500 text-center">
            Commencez par ajouter un contact en cliquant sur <br/>
            <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium mt-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nouveau contact
            </span>
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onUpdate={handleUpdateClick}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Modales */}
      {selectedContact && (
        <>
          <UpdateModal
            contact={selectedContact}
            isOpen={isUpdateModalOpen}
            onClose={() => {
              setIsUpdateModalOpen(false);
              setSelectedContact(null);
            }}
          />

          <DeleteModal
            contact={selectedContact}
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedContact(null);
            }}
            onConfirm={handleDelete}
          />
        </>
      )}
    </div>
  );
};

export default ListGrid;
