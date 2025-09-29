'use client';
import React, { useState } from "react";
import { Contact } from '../types/Contact';
import { useList } from '../services/ListService';

interface ContactCardProps {
  contact: Contact;
}

const ContactCard = ({ contact }: ContactCardProps) => {
  const { updateContact, deleteContact } = useList();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState(contact);
  const handleUpdate = () => {
    if (isEditing) {
      updateContact(contact.id, editedContact);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      deleteContact(contact.id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedContact(prev => ({
      ...prev,
      [name]: name === 'numero' ? parseInt(value) || 0 : value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-lg">
              {contact.nom.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-2">
                <input
                  type="text"
                  name="nom"
                  value={editedContact.nom}
                  onChange={handleChange}
                  className="w-full p-1 border rounded"
                />
                <input
                  type="tel"
                  name="numero"
                  value={editedContact.numero}
                  onChange={handleChange}
                  className="w-full p-1 border rounded"
                />
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-gray-900">{contact.nom}</h3>
                <p className="text-gray-600">{contact.numero}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-2 pt-2">
          <button
            onClick={handleUpdate}
            className="p-2 text-blue-600 hover:text-blue-800"
          >
            {isEditing ? 'Enregistrer' : 'Modifier'}
          </button>
          {!isEditing && (
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
