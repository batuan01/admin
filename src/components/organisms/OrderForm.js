import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TableForm } from "../molecules/Table";
import { DeleteCustomer, GetCustomers, GetOrders } from "../../utils/auth";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import Notification from "../atoms/Notification";
import { InputSearch } from "../atoms/Input";
import { formatDateTime } from "../atoms/FormatDateTime";
import { ORDER_STATUS, PAYMENT_STATUS } from "../../constants/common";
import { FaEye } from "react-icons/fa";
import { Select, pushData } from "../atoms/Select";

export const OrderForm = () => {
  const [dataAll, setDataAll] = useState();
  const [dataFilter, setDataFilter] = useState();
  const [selectedSort, setSelectedSort] = useState({ name: "All" });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetOrders();
        setDataAll(result);
        setDataFilter(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  function getStatusLabel(orderStatus) {
    const statusObject = ORDER_STATUS.find(
      (status) => status.value === orderStatus
    );
    return statusObject;
  }
  const getValueFromLabel = (label) => {
    const status = ORDER_STATUS.find((status) => status.label === label);
    return status ? status.value : null;
  };
  function getPaymentsLabel(paymentStatus) {
    const statusObject = PAYMENT_STATUS.find(
      (status) => status.value === paymentStatus
    );
    return statusObject;
  }
  const dataThead = [
    "No.",
    "Customer Name",
    "Order Date",
    "Payments",
    "Order Status",
    "Action",
  ];
  const dataBody = dataFilter?.map((item, index) => (
    <tr key={index} className="border-b border-[#bdbdbd]">
      <td className="py-3 px-5  text-center">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
          {index + 1}
        </p>
      </td>
      <td className="py-3 px-5  text-center ">
        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
          {item.customer.customer_fullname}
        </p>
      </td>
      <td className="py-3 px-5  text-center ">
        <p className="block antialiased font-sans text-sm leading-normal font-semibold">
          {formatDateTime(item.created_at)}
        </p>
      </td>
      <td className="py-3 px-5  text-center ">
        <p
          className="block antialiased font-sans text-sm leading-normal font-semibold"
          style={{ color: `${getPaymentsLabel(item.payment_id).color}` }}
        >
          {getPaymentsLabel(item.payment_id).label}
        </p>
      </td>
      <td className="py-3 px-5 text-center ">
        <div className="flex justify-center">
          <p
            className="block antialiased font-sans text-sm leading-normal font-semibold py-2 px-4 rounded-full text-white w-fit "
            style={{ background: `${getStatusLabel(item.order_status).color}` }}
          >
            {getStatusLabel(item.order_status).label}
          </p>
        </div>
      </td>

      <td className="py-3 px-5  text-center">
        <button
          onClick={() => {
            router.push("/order/" + item.order_id);
          }}
        >
          <FaEye className="h-5 hover:text-blue-600" />
        </button>
      </td>
    </tr>
  ));

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.toLowerCase();
      const dataFilterName = dataAll?.data.filter((order) =>
        order.customer.customer_fullname.toLowerCase().includes(inputValue)
      );
      setDataFilter(dataFilterName);
    }
  };

  const dataSelect = [
    { name: "All" },
    ...ORDER_STATUS.map((item) => ({ name: item.label })),
  ];

  let ContentSelect = [];
  pushData({
    arrayForm: ContentSelect,
    data: dataSelect,
  });

  const handleSortData = (value) => {
    if (value === "All") {
      setDataFilter(dataAll.data);
    } else {
      const orderStatus = getValueFromLabel(value);
      const dataSort = dataAll.data.filter(
        (data) => data.order_status === orderStatus
      );
      setDataFilter(dataSort);
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
        <div className="w-fit">
          <Select
            selected={selectedSort}
            content={ContentSelect}
            onChange={(value) => {
              setSelectedSort(value);
              handleSortData(value.name);
            }}
          />
        </div>
      </div>
      <div className="mx-10">
        <TableForm dataThead={dataThead} dataBody={dataBody} />
        {(!dataAll || dataAll?.length === 0) && (
          <p className="text-center font-medium py-10">No data</p>
        )}
      </div>
    </>
  );
};
