import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import { DeleteCustomer, GetCustomers } from "../../utils/auth";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import Notification from "../atoms/Notification";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { DateForm } from "../molecules/Date";
import { useForm } from "react-hook-form";
import { InputModal } from "../atoms/Input";
import { Modal } from "../molecules/Modal";

export const CouponForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNew, setIsNew] = useState(false);
  const [isNewCoupon, setIsNewCoupon] = useState(false);

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

  const dataThead = ["No.", "Code", "Discount", "Expiry Date", "Action"];
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
            {item.coupon_code}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.coupon_discount}
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
              setIsOpen(true);
              setDataUpdate(item);
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
  const handleUpdate = () => {};
  const ContentModal = (
    <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
      <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
        {isNew ? "Create" : "Update"} Coupon
      </p>
      <div className="flex gap-5">
        <div>
          <InputModal
            register={register("name", {
              required: "Name cannot be left blank",
            })}
            type="text"
            placeholder={"Name"}
            label={"Category Name"}
            required={true}
          />
          {errors.name && errors.name.type === "required" && (
            <span className="text-red text-xs italic">
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <InputModal
            register={register("description")}
            type="text"
            placeholder={"Description"}
            label={"Category Description"}
          />
        </div>
      </div>
      <DateForm />
      <div className="flex justify-end mt-5 gap-4">
        <ButtonModal
          title={"Cancel"}
          type={"button"}
          sizeSm={true}
          onClick={() => handleCloseModal()}
          textBlack={true}
          className={"border-black border-[1px] bg-slate-300 w-20"}
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
    // if (isNew) {
    //   reset({
    //     name: null,
    //     description: null,
    //   });
    // } else {
    //   reset({
    //     name: dataUpdate?.category_name || "",
    //     description: dataUpdate?.category_desc || "",
    //   });
    // }
  }, [dataUpdate, isNew]);

  const handleCloseModal = () => {
    setIsNew(false);
    setIsNewCategory(false);
  };

  return (
    <>
      <div className="flex justify-end mb-5">
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
      <TableForm dataThead={dataThead} dataBody={dataBody} />
      <ConfirmDelete
        title={"Do you want to delete the coupon?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
