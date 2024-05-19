import { Navbar } from "./Navbar";
import { Header } from "./Header";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

export const LayoutAdmin = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const whiteList = ["/signin"];

  useEffect(() => {
    if (!admin) {
      router.push("/signin");
    }
  }, []);

  const admin = Cookies.get("admin");

  let objAdmin;
  if (admin) {
    objAdmin = JSON.parse(admin);
  }
  const adminRoute = [
    "/",
    "/category",
    "/product",
    "/order",
    "/slider",
    "/user",
    "/news",
    "/coupon",
  ];

  const userRoute = [
    "/product",
    "/product/create",
    "/product/[id]/update",
    "/order",
    "/order/[id]",
    "/slider",
    "/news",
    "/news/create",
    "/news/[id]",
    "/user",
  ];

  if (objAdmin) {
    // if (objAdmin.admin_role === 0) {
    //   if (!adminRoute.includes(pathname)) {
    //     router.push("/");
    //   }
    // }
    if (objAdmin.admin_role === "1") {
      if (!userRoute.includes(pathname)) {
        router.push("/product");
      }
    }
  }

  return (
    <>
      {!whiteList.includes(pathname) ? (
        <>
          <Header />
          <Navbar />
          <div className="ml-[90px]">{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
