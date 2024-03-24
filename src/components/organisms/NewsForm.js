import { useEffect, useState } from "react";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import { TableForm } from "../molecules/Table";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import Link from "next/link";
import {
  DeleteNews,
  GetNews,
  UpdateNews,
  UpdateNewsStatus,
} from "../../utils/auth";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import Notification from "../atoms/Notification";
import { ButtonIcon } from "../atoms/Button";
import { useRouter } from "next/router";
import { InputSearch } from "../atoms/Input";

export const NewsForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataFilter, setDataFilter] = useState();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetNews();
        setDataAll(result);
        setDataFilter(result.data);
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

  const dataThead = ["No.", "Name", "Image", "Status", "Action"];
  const dataBody = [];

  dataBody.push(
    dataFilter?.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="py-3 px-5  text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold flex gap-2 items-center justify-center">
            {item.news_name}
          </p>
        </td>
        <td className="py-3 px-5 text-center flex justify-center">
          <img src={item.news_image} className="h-10 w-auto" />
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item)}
            checked={item.news_status === 1 ? true : false}
          />
        </td>

        <td className="py-3 px-5  text-center ">
          <div className="flex justify-center gap-5">
            <Link href={"/news/" + item.news_id}>
              <FaPenToSquare className="h-5 cursor-pointer" />
            </Link>
            <button
              onClick={() => {
                setIsOpen(true);
                setDataUpdate(item);
              }}
            >
              <HiArchiveBoxXMark className="h-5 hover:text-red" />
            </button>
          </div>
        </td>
      </tr>
    ))
  );

  const handleDelete = async () => {
    setIsOpen(false);
    const payload = {
      news_id: dataUpdate.news_id,
    };
    await DeleteNews(payload);

    setIsReload(!isReload);
    Notification.success("Delete news successfully!");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.toLowerCase();
      const dataFilterName = dataAll?.data.filter((news) =>
        news.news_name.toLowerCase().includes(inputValue)
      );
      setDataFilter(dataFilterName);
    }
  };

  return (
    <>
      <div className="flex justify-between py-7 px-10">
        <InputSearch
          type="text"
          placeholder={"Search"}
          onKeyDown={handleKeyDown}
          onChange={(event) => {
            if (event.target.value === "") {
              setDataFilter(dataAll?.data);
            }
          }}
        />

        <div className="flex justify-end">
          <ButtonIcon
            title={"Add News"}
            icon={<FaPlus />}
            type={"button"}
            onClick={() => {
              router.push("/news/create");
            }}
          />
        </div>
      </div>

      <div className="mx-10">
        <TableForm dataThead={dataThead} dataBody={dataBody} />
        {(!dataAll || dataAll?.data?.length === 0) && (
          <p className="text-center font-medium py-10">No data</p>
        )}
      </div>

      <ConfirmDelete
        title={"Do you want to delete the news?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
