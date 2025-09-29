import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form";
import ListGrid from "./components/ListGrid";
import Header from "./components/layout/Header";
export default function Home() {
  return (
    <div className="W-full h-screen  grid grid-rows[80px_1fr_3fr] items-center justify-center">
       <Form />
      <ListGrid />
        <ToastContainer />
      {/* FOOTER à implementer */}
    </div>
  );
}
