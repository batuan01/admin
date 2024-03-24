import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import {
  DeleteCategory,
  DeleteProduct,
  ListCategories,
  ListProducts,
  PostCategory,
  UpdateCategories,
  UpdateProductsStatus,
} from "../../utils/auth";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { AiOutlineFileSearch } from "react-icons/ai";

import { ConfirmDelete } from "../molecules/ConfirmDelete";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { FaPlus } from "react-icons/fa6";
import { Modal } from "../molecules/Modal";
import { InputForm, InputModal, InputSearch } from "../atoms/Input";
import { useForm } from "react-hook-form";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import Notification from "../atoms/Notification";
import { UploadImage } from "../molecules/UploadImage";
import { ConvertFirebase } from "../../utils/firebase";
import { useRouter } from "next/router";

export const ProductForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [dataFilter, setDataFilter] = useState();

  const router = useRouter();

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
        const result = await ListProducts();
        setDataAll(result.data);
        setDataFilter(result.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleChangeStatus = async (e, item) => {
    const value = e.target.checked ? 1 : 0;

    const payload = {
      product_id: item.product_id,
      product_status: value,
    };
    await UpdateProductsStatus(payload);

    setIsReload(!isReload);
    Notification.success("Updated status successfully!");
  };

  const dataThead = ["No.", "Name", "Sale", "Status", "Gallery", "Action"];
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
            <img src={item.product_image} className="h-10 w-auto" />
            {item.product_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.product_sale}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item)}
            checked={item.product_status === 1 ? true : false}
          />
        </td>
        <td className="py-3 px-5  text-center ">
          <Link href={"/product/" + item.product_id + "/gallery"}>
            <ButtonModal
              title={"Upload"}
              type={"button"}
              sizeSm={true}
              textBlack
              className={
                "bg-blue-200 text-[#1B84FF] hover:bg-[#1B84FF] hover:text-white w-full"
              }
            />
          </Link>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="flex justify-center gap-5 cursor-pointer">
            <Link href={"/product/" + item.product_id + "/update"}>
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

  const handleDelete = async () => {
    setIsOpen(false);
    const payload = {
      product_id: dataUpdate.product_id,
    };
    await DeleteProduct(payload);

    setIsReload(!isReload);
    Notification.success("Delete category successfully!");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.toLowerCase();
      const dataFilterName = dataAll?.data.filter((product) =>
        product.product_name.toLowerCase().includes(inputValue)
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
            title={"Add Product"}
            icon={<FaPlus />}
            type={"submit"}
            onClick={() => {
              router.push("/product/create");
            }}
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
        title={"Do you want to delete the product?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
