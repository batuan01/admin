import "../styles/atoms.css";
import "../styles/globals.css";
import "../styles/header.css";
import "../styles/navbar.css";
import "../styles/pagination.css";
import "../styles/switch.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../components/contexts/AuthContext";
import { LayoutAdmin } from "../components/templates/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer />
      <LayoutAdmin>
        <Component {...pageProps}/>
      </LayoutAdmin>
    </AuthProvider>
  );
}

export default MyApp;
