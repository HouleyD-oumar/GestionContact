"use client"; 
export default function DeleteContactButton({ id, onDeleteSuccess }) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDeleteSuccess(id); 
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (err) {
      console.error(err);
      alert("Impossible de supprimer (erreur réseau)");
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
