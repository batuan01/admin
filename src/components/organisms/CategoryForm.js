import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import {
  DeleteCategory,
  ListCategories,
  PostCategory,
  UpdateCategories,
} from "../../utils/auth";
import Link from "next/link";
import { FaPenToSquare } from "react-icons/fa6";
import { HiArchiveBoxXMark } from "react-icons/hi2";

import { ConfirmDelete } from "../molecules/ConfirmDelete";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { FaPlus } from "react-icons/fa6";
import { Modal } from "../molecules/Modal";
import { InputForm, InputModal, InputSearch } from "../atoms/Input";
import { useForm } from "react-hook-form";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import Notification from "../atoms/Notification";

export const CategoryForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNew, setIsNew] = useState(false);
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
        const result = await ListCategories();
        setDataAll(result);
        setDataFilter(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleChangeStatus = async (e, item) => {
    const value = e.target.checked ? 1 : 0;

    const payload = {
      category_id: item.category_id,
      category_name: item.category_name,
      category_status: value,
    };
    await UpdateCategories(payload);

    setIsReload(!isReload);
    Notification.success("Updated status successfully!");
  };

  const dataThead = ["No.", "Name", "Description", "Status", "Action"];
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
            {item.category_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal font-semibold">
            {item.category_desc}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item)}
            checked={item.category_status === 1 ? true : false}
          />
        </td>
        <td className="py-3 px-5  text-center  flex justify-center gap-5">
          <button
            onClick={() => {
              setDataUpdate(item);
              setIsNewCategory(true);
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

  const handleDelete = async () => {
    setIsOpen(false);
    const payload = {
      category_id: dataUpdate.category_id,
    };
    await DeleteCategory(payload);

    setIsReload(!isReload);
    Notification.success("Delete category successfully!");
  };

  const handleCloseModal = () => {
    setIsNewCategory(false);
  };

  const handleCreate = async (data) => {
    const payload = {
      category_name: data.name,
      category_desc: data.description,
      category_status: 1,
    };
    await PostCategory(payload);

    await handleCloseModal();
    setIsReload(!isReload);
    Notification.success("Create category successfully!");
    reset({
      name: null,
      description: null,
    });
  };

  const handleUpdate = async (data) => {
    const payload = {
      category_id: dataUpdate.category_id,
      category_name: data.name,
      category_desc: data.description,
    };
    await UpdateCategories(payload);

    handleCloseModal();
    setIsReload(!isReload);
    Notification.success("Update category successfully!");
    reset({
      name: null,
      description: null,
    });
  };

  const ContentModal = (
    <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
      <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
        {isNew ? "Create" : "Update"} Category
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
        name: null,
        description: null,
      });
    } else {
      reset({
        name: dataUpdate?.category_name || "",
        description: dataUpdate?.category_desc || "",
      });
    }
  }, [dataUpdate, isNew]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const inputValue = event.target.value.toLowerCase();
      const dataFilterName = dataAll?.filter((category) =>
        category.category_name.toLowerCase().includes(inputValue)
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
              setDataFilter(dataAll);
            }
          }}
        />

        <div className="flex justify-end">
          <ButtonIcon
            title={"Add Category"}
            icon={<FaPlus />}
            type={"submit"}
            onClick={() => {
              setIsNewCategory(true);
              setIsNew(true);
            }}
          />
          <Modal
            isOpen={isNewCategory}
            setIsOpen={handleCloseModal}
            content={ContentModal}
          />
        </div>
      </div>

      <div className="mx-10">
        <TableForm dataThead={dataThead} dataBody={dataBody} />
        {(!dataAll || dataAll?.length === 0) && (
          <p className="text-center font-medium py-10">No data</p>
        )}
      </div>
      <ConfirmDelete
        title={"Do you want to delete the category?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
