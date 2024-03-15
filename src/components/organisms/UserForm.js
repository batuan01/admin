import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import { DeleteCustomer, GetCustomers } from "../../utils/auth";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import Notification from "../atoms/Notification";

export const UserForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetCustomers();
        setDataAll(result);
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
    dataAll?.data.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="py-3 px-5  text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.customer_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.customer_phone}
          </p>
        </td>

        <td className="py-3 px-5  text-center  flex justify-center gap-5">
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
