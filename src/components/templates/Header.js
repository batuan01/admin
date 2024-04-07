import { FiSettings } from "react-icons/fi";
import { FaBell, FaCircleUser } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/router";
import { LogoutIcon } from "../atoms/Icon";

export const Header = () => {
  const router = useRouter();
  const admin = 1;
  const changeRole = () => {
    router.push("/");
  };
  const logOut = () => {
    router.push("/signin");
  };

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <>
      <div className="flex items-center justify-between h-[56px] px-7 bg-white border-solid border-b-[1px] border-slate-300">
        <div className="text-2xl flex justify-center items-center font-bold bg-[#f7f9fa] gradient-text ">
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
          <button
            className="relative align-middle select-none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-blue-gray-500 hover:bg-[#6a778e] hover:text-white hover:fill-[#fff]"
            type="button"
            onClick={handleLogout}
          >
            <span className="flex justify-center items-center text-lg notification-hover">
              <LogoutIcon className="text-3xl w-4 rotate-180" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
