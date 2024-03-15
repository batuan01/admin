import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./Navbar";
import { Header } from "./Header";

export const LayoutAdmin = ({ children }) => {
  const router = useRouter();

  const pathname = router.pathname;

  const whiteList = ["/signin"];
  return (
    <>
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
    </>
  );
};
