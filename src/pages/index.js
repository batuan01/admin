
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  // useEffect(() => {
  //   const admin = localStorage.getItem("admin");
  //   if (!admin) {
  //     router.push("/signin");
  //   }
  // }, []);
  return (
    <>
      <div className="bg-white w-16 h-16"></div>
    </>
  );
};
export default Home;
