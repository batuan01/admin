import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import {
  DeleteCoupon,
  DeleteCustomer,
  GetCoupon,
  GetCustomers,
  PostCoupon,
  UpdateCoupon,
} from "../../utils/auth";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import Notification from "../atoms/Notification";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { DateForm, getCurrentDate } from "../molecules/Date";
import { useForm } from "react-hook-form";
import { InputFormAdmin, InputModal, InputSearch } from "../atoms/Input";
import { Modal } from "../molecules/Modal";
import { RandomTextGenerator } from "../atoms/Text";
import { FormatPrice } from "../atoms/FormatPrice";

export const CouponForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNew, setIsNew] = useState(false);
  const [isNewCoupon, setIsNewCoupon] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const [dataFilter, setDataFilter] = useState();

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetCoupon();
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
      coupon_id: dataUpdate.coupon_id,
    };
    await DeleteCoupon(payload);
    setIsReload(!isReload);
    setIsOpen(false);
    Notification.success("Delete coupon successfully!");
  };

  const dataThead = ["No.", "Code", "Discount", "Expiry Date", "Action"];
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
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.coupon_code}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {FormatPrice(item.coupon_discount)}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.coupon_expiry_date}
          </p>
        </td>

        <td className="py-3 px-5  text-center  flex justify-center gap-5">
          <button
            onClick={() => {
              setIsNewCoupon(true);
              setDataUpdate(item);
              setIsNew(false);
            }}
          >
            <FaPenToSquare className="h-5" />
          </button>
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

  const handleCreate = async (data) => {
    const dataSend = {
      coupon_code: data.coupon_code,
      coupon_discount: data.coupon_discount,
      coupon_expiry_date: selectedDate,
    };
    await PostCoupon(dataSend);
    Notification.success("Create coupon successfully!");
    setIsReload(!isReload);
    setIsNewCoupon(false);
    reset({
      coupon_code: null,
      coupon_discount: null,
    });
  };
  const handleUpdate = async (data) => {
    const dataSend = {
      coupon_id: dataUpdate.coupon_id,
      coupon_code: data.coupon_code,
      coupon_discount: data.coupon_discount,
      coupon_expiry_date: selectedDate,
    };
    await UpdateCoupon(dataSend);
    Notification.success("Update coupon successfully!");
    setIsReload(!isReload);
    setIsNewCoupon(false);
    reset({
      coupon_code: null,
      coupon_discount: null,
    });
  };

  const randomText = () => {
    const text = RandomTextGenerator({ length: 6 });
    reset({
      coupon_code: text,
    });
  };

  const ContentModal = (
    <form
      onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}
      className="min-w-[700px]"
    >
      <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
        {isNew ? "Create" : "Update"} Coupon
      </p>
      <div className="flex gap-5 items-center justify-between">
        <div className="w-3/4">
          <InputFormAdmin
            register={register("coupon_code", {
              required: "Coupon code cannot be left blank",
            })}
            type="text"
            placeholder={"Coupon code"}
            label={"Coupon code"}
            required={true}
            errors={errors}
            name={"coupon_code"}
          />
        </div>
        <div className="w-1/4">
          <ButtonModal
            title={"Random"}
            type={"button"}
            sizeSm={true}
            onClick={randomText}
            textBlack
            className={
              "mt-5 bg-blue-200 text-[#1B84FF] hover:bg-[#1B84FF] hover:text-white w-full"
            }
          />
        </div>
      </div>

      <div className="flex gap-5 items-center justify-between mt-5">
        <div className="w-2/3">
          <InputFormAdmin
            register={register("coupon_discount", {
              required: "Coupon discount cannot be left blank",
            })}
            type="text"
            placeholder={"Coupon discount"}
            label={"Coupon discount"}
            required={true}
            errors={errors}
            name={"coupon_discount"}
          />
        </div>
        <div className="w-1/3">
          <DateForm
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            label={"Expiry date"}
          />
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-4">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          onClick={() => handleCloseModal()}
          textBlack={true}
          className={"bg-slate-300 w-20"}
        />
        <ButtonModal
          title={isNew ? "Create" : "Update"}
          type={"submit"}
          sizeSm={true}
          className={"w-20 bg-blue-500"}
        />
      </div>
    </form>
  );

  useEffect(() => {
    if (isNew) {
      reset({
        coupon_code: null,
        coupon_discount: null,
      });
      setSelectedDate(getCurrentDate());
    } else {
      reset({
        coupon_code: dataUpdate?.coupon_code || "",
        coupon_discount: dataUpdate?.coupon_discount || "",
      });
      setSelectedDate(dataUpdate?.coupon_expiry_date);
    }
  }, [dataUpdate, isNew]);

  const handleCloseModal = () => {
    setIsNewCoupon(false);
    reset({
      coupon_code: null,
      coupon_discount: null,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.toLowerCase();
      const dataFilterName = dataAll?.data.filter((coupon) =>
        coupon.coupon_code.toLowerCase().includes(inputValue)
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
            title={"Add Coupon"}
            icon={<FaPlus />}
            type={"button"}
            onClick={() => {
              setIsNewCoupon(true);
              setIsNew(true);
            }}
          />
          <Modal
            isOpen={isNewCoupon}
            setIsOpen={handleCloseModal}
            content={ContentModal}
          />
        </div>
      </div>

      <div className="mx-10">
        <TableForm dataThead={dataThead} dataBody={dataBody} />
        {(!dataAll || dataAll?.data.length === 0) && (
          <p className="text-center font-medium py-10">No data</p>
        )}
      </div>
      <ConfirmDelete
        title={"Do you want to delete the coupon?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
