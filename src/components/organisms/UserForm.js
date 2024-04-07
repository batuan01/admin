import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import { DeleteCustomer, GetCustomers } from "../../utils/auth";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import Notification from "../atoms/Notification";
import { InputSearch } from "../atoms/Input";

export const UserForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataFilter, setDataFilter] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetCustomers();
        setDataAll(result);
        setDataFilter(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleDelete = async () => {
    const payload = {
      customer_id: dataUpdate.customer_id,
    };
    await DeleteCustomer(payload);
    setIsReload(!isReload);
    setIsOpen(false);
    Notification.success("Delete customer successfully!");
  };

  const dataThead = ["No.", "Name", "Phone", "Action"];
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
            <img src={item.customer_image} className="h-10 w-auto" />
            {item.customer_fullname}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.customer_phone}
          </p>
        </td>

        <td className="py-3 px-5 text-center">
          <button
            onClick={() => {
              setIsOpen(true);
              setDataUpdate(item);
            }}
          >
            <HiArchiveBoxXMark className="h-5 hover:text-red" />
          </button>
        </td>
      </tr>
    ))
  );

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.toLowerCase();
      const dataFilterName = dataAll?.data.filter((user) =>
        user.customer_fullname.toLowerCase().includes(inputValue)
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
      </div>
      <div className="mx-10">
        <TableForm dataThead={dataThead} dataBody={dataBody} />
        {(!dataAll || dataAll?.data.length === 0) && (
          <p className="text-center font-medium py-10">No data</p>
        )}
      </div>
      <ConfirmDelete
        title={"Do you want to delete the customer?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
