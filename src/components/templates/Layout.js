import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { useRouter } from "next/router";

export const LayoutAdmin = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const whiteList = ["/signin"];
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        {!whiteList.includes(pathname) ? (
          <>
            <div className="ml-[150px]">
              <Header />
            </div>
            <Navbar />
            <div className="ml-[150px] mr-10">{children}</div>
          </>
        ) : (
          <>{children}</>
        )}
      </AuthProvider>
    </>
  );
};
