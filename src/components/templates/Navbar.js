import Link from "next/link";

import {
  FcBusinessman,
  FcEditImage,
  FcHome,
  FcIphone,
  FcNews,
  FcSurvey,
  FcViewDetails,
} from "react-icons/fc";
import { BiSolidDiscount } from "react-icons/bi";
import { useRouter } from "next/router";
import { CouponIcon, LogoutIcon } from "../atoms/Icon";

export const Navbar = () => {
  const router = useRouter();

  const pathname = router.pathname;

  const listCategory = [
    {
      name: "Home",
      icon: <FcHome className="text-3xl" />,
      link: "/",
    },
    {
      name: "Category",
      icon: <FcSurvey className="text-3xl" />,
      link: "/category",
    },
    {
      name: "Product",
      icon: <FcIphone className="text-3xl" />,
      link: "/product",
    },
    {
      name: "Orders",
      icon: <FcViewDetails className="text-3xl" />,
      link: "/order",
    },
    {
      name: "Sliders",
      icon: <FcEditImage className="text-3xl" />,
      link: "/slider",
    },
    {
      name: "User",
      icon: <FcBusinessman className="text-3xl" />,
      link: "/user",
    },
    {
      name: "News",
      icon: <FcNews className="text-3xl" />,
      link: "/news",
    },
    {
      name: "Coupon",
      icon: <CouponIcon className="text-3xl w-7" />,
      link: "/coupon",
    },
  ];

  const handleLogout = () => {
    router.push("/signin");
  };

  return (
    <nav className="navbar bg-white shadow-sm z-10 transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100">
      <div className="h-[55px] text-2xl flex justify-center items-center font-bold border-solid border-b-[1px] border-slate-300 bg-[#f7f9fa] gradient-text">
        <Link href="/">TGDD</Link>
      </div>

      <ul className="navbar__menu mt-10">
        {listCategory.map((item, index) => (
          <li className="navbar__item" key={index}>
            <Link href={item.link}>
              <div
                className={`navbar__link ${
                  pathname === item.link
                    ? "bg-[#406ff3] w-[3.5rem] rounded-[17.5px] m-auto"
                    : ""
                }`}
                style={{
                  width: pathname === item.link ? "3.5rem" : "5.5rem",
                  margin: pathname === item.link ? "10px auto" : "10px 0",
                }}
              >
                {item.icon}
                <span>{item.name}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* <div className="navbar__item absolute bottom-10">
        <div className={`navbar__link`} onClick={handleLogout}>
          <LogoutIcon className="text-3xl w-7 rotate-180 hover:fill-[#406ff3]" />
          <span>Logout</span>
        </div>
      </div> */}
    </nav>
  );
};
