import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListGrid from './components/ListGrid';
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ListGrid />
      <ToastContainer position="bottom-right" />
    </div>
  );
}
