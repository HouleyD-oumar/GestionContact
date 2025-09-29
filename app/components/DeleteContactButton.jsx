"use client"; 
import toast from "react-hot-toast";

export default function DeleteContactButton({ id, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Contact supprimé avec succès ");
        onDeleteSuccess(id); 
      } else {
        toast.error("Erreur lors de la suppression ");
      }
    } catch (err) {
      console.error(err);
      toast.error("Impossible de supprimer (erreur réseau) ");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
    >
      Supprimer
    </button>
  );
}
