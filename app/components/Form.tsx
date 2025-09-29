"use client";

export default function Form() {
  return (
    <form className="bg-blue-500">
      {/* formulaire pour la saisie du nom et du numéro */}
      <h1 className="text-3xl">Formulaire de Saisie</h1>
      <div className="d-flex justify-between space-x-0">
        <input
          type="text"
          className="input input-bordered w-full"

        />
      </div>
    </form>
  );
}
