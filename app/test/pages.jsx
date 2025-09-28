import DeleteContactButton from "../components/DeleteContactButton";

export default function TestPage() {
  const fakeDelete = (id) => {
    console.log("Contact supprimé :", id);
  };

  return (
    <div>
      <h1>Test Suppression</h1>
      <DeleteContactButton id={123} onDeleteSuccess={fakeDelete} />
    </div>
  );
}