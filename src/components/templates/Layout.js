import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../contexts/AuthContext";
import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const LayoutAdmin = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const whiteList = ["/signin"];

  // const admin = Cookies.get("admin");
  // useEffect(() => {
  //   if (!admin) {
  //     router.push("/signin");
  //   }
  // }, []);

  return (
    <>
      <AuthProvider>
        <ToastContainer />
        {!whiteList.includes(pathname) ? (
          <>
            <Header />
            <Navbar />
            <div className="ml-[90px]">{children}</div>
          </>
        ) : (
          <>{children}</>
        )}
      </AuthProvider>
    </>
  );
};
