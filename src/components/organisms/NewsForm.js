import { useEffect, useState } from "react";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import { TableForm } from "../molecules/Table";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaPenToSquare } from "react-icons/fa6";
import Link from "next/link";
import { GetNews, UpdateNews, UpdateNewsStatus } from "../../utils/auth";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import Notification from "../atoms/Notification";

export const NewsForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetNews();
        setDataAll(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleChangeStatus = async (e, item) => {
    const value = e.target.checked ? 1 : 0;

    const payload = {
      news_id: item.news_id,
      news_status: value,
    };
    await UpdateNewsStatus(payload);

    setIsReload(!isReload);
    Notification.success("Updated status successfully!");
  };

  const dataThead = ["No.", "Name", "Content", "Status", "Action"];
  const dataBody = [];

  dataBody.push(
    dataAll?.data.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="py-3 px-5  text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold flex gap-2 items-center justify-center">
            <img src={item.news_image} className="h-10 w-auto" />
            {item.news_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.news_content}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item)}
            checked={item.news_status === 1 ? true : false}
          />
        </td>

        <td className="py-3 px-5  text-center ">
          <p className="flex justify-center gap-5">
            <Link href={"/product/" + item.product_id}>
              <FaPenToSquare className="h-5" />
            </Link>
            <button
              onClick={() => {
                setIsOpen(true);
                setDataUpdate(item);
              }}
            >
              <HiArchiveBoxXMark className="h-5 hover:text-red" />
            </button>
          </p>
        </td>
      </tr>
    ))
  );
  return (
    <>
      <TableForm dataThead={dataThead} dataBody={dataBody} />
      <ConfirmDelete
        title={"Do you want to delete the customer?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
