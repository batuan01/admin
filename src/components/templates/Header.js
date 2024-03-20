import { FiSettings } from "react-icons/fi";
import { FaBell, FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  // const admin = JSON.parse(localStorage.getItem("admin"));
  const admin = 1;
  const changeRole = () => {
    // localStorage.setItem("role", "user");
    router.refresh();
    router.push("/");
  };
  const logOut = () => {
    // localStorage.removeItem("admin");
    router.push("/signin");
  };

  return (
    <>
      <div className="flex items-center justify-between h-[56px] pr-7 bg-white border-solid border-b-[1px] border-slate-300">
        <div className="w-[99px] h-full text-2xl flex justify-center items-center font-bold border-solid border-r-[1px] border-slate-300 bg-[#f7f9fa] gradient-text">
          <Link href="/">TGDD</Link>
        </div>
        <div className="flex justify-end w-full">
          <div className="flex items-center gap-2 mr-5" onClick={logOut}>
            <FaCircleUser className="text-lg" />
            {admin?.admin_name}
          </div>
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-[#6a778e] hover:text-white button-notification"
            type="button"
          >
            <span className="flex justify-center items-center text-lg notification-hover">
              <FaBell />
            </span>
          </button>
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-[#6a778e] hover:text-white button-setting"
            type="button"
            onClick={changeRole}
          >
            <span className="flex justify-center items-center text-lg setting-hover">
              <FiSettings />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
