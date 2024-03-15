import { FiSettings } from "react-icons/fi";
import { FaBell, FaCircleUser } from "react-icons/fa6";

import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();
  let admin;
  if (process.browser) {
    const local = localStorage.getItem("admin");
    admin = JSON.parse(local);
  }

  return (
    <>
      <div className="flex items-center justify-between py-5 pr-7">
        <div className="w-full text-sm">
          Dashboard/ <span className="text-black">Home</span>
        </div>
        <div className="flex justify-end w-full">
          <Link href="/signin">
            <div className="flex items-center gap-2 mr-5">
              <FaCircleUser className="text-lg" />
              {admin?.admin_name}
            </div>
          </Link>
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
