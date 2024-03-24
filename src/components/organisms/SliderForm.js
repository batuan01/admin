import { useEffect, useState } from "react";
import { TableForm } from "../molecules/Table";
import {
  DeleteCustomer,
  DeleteSlider,
  GetCustomers,
  GetSliders,
  PostSlider,
  UpdateSlider,
} from "../../utils/auth";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { ConfirmDelete } from "../molecules/ConfirmDelete";
import Notification from "../atoms/Notification";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { ButtonIcon, ButtonModal } from "../atoms/Button";
import { DateForm } from "../molecules/Date";
import { useForm } from "react-hook-form";
import { InputFormAdmin, InputModal, InputSearch } from "../atoms/Input";
import { Modal } from "../molecules/Modal";
import { ToggleSwitch } from "../atoms/ToggleSwitch";
import { limitText } from "../atoms/Text";
import { useRouter } from "next/router";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import dynamic from "next/dynamic";
import { ConvertFirebase } from "../../utils/firebase";

const CustomEditor = dynamic(
  () => {
    return import("../molecules/FormEditor");
  },
  { ssr: false }
);

export const SliderForm = () => {
  const [dataAll, setDataAll] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const [isNewSlider, setIsNewSlider] = useState(false);
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const [content, setContent] = useState();

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
        const result = await GetSliders();
        setDataAll(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isReload]);

  const handleDelete = async () => {
    const payload = {
      slider_id: dataUpdate.slider_id,
    };
    await DeleteSlider(payload);
    setIsReload(!isReload);
    setIsOpen(false);
    Notification.success("Delete slider successfully!");
  };

  const handleChangeStatus = async (e, item) => {
    const value = e.target.checked ? 1 : 0;

    const payload = {
      slider_id: item.slider_id,
      slider_name: item.slider_name,
      slider_content: item.slider_content,
      slider_image: item.slider_image,
      slider_status: value,
    };
    await UpdateSlider(payload);

    setIsReload(!isReload);
    Notification.success("Updated status successfully!");
  };

  const dataThead = ["No.", "Name", "Image", "Status", "Action"];
  const dataBody = [];

  dataBody.push(
    dataAll?.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="py-3 px-5  text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {item.slider_name}
          </p>
        </td>
        <td className="py-3 px-5  text-center ">
          <div className="flex justify-center">
            <img src={item.slider_image} className="h-10 w-auto" />
          </div>
        </td>
        <td className="py-3 px-5  text-center ">
          <ToggleSwitch
            onChange={(e) => handleChangeStatus(e, item)}
            checked={item.slider_status === 1 ? true : false}
          />
        </td>

        <td className="py-3 px-5  text-center ">
          <p className="flex justify-center gap-5 cursor-pointer">
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

  const handleCreate = async (data) => {
    let urlInfo;
    if (selectedFilesInfo) {
      urlInfo = await ConvertFirebase({ images: selectedFilesInfo });
    }

    const dataSend = {
      slider_name: data.slider_name,
      slider_content: content || "",
      slider_image: urlInfo[0] || "",
      slider_status: 1,
    };
    await PostSlider(dataSend);
    Notification.success("Create slider successfully!");
    setIsNewSlider(false);
    setIsReload(!isReload);
  };

  const ContentModal = (
    <form onSubmit={handleSubmit(handleCreate)} className="">
      <p className="uppercase text-center mb-5 font-bold border-b-2 pb-4">
        Create Slider
      </p>
      <div className="flex gap-5">
        <UploadInfoImage
          selectedFiles={selectedFilesInfo}
          setSelectedFiles={setSelectedFilesInfo}
        />
        <div className="bg-white rounded-lg px-10 py-8 shadow-lg">
          <InputFormAdmin
            register={register("slider_name", {
              required: "Slider name cannot be left blank",
            })}
            type="text"
            placeholder={"Slider Name"}
            label={"Slider Name"}
            required={true}
            errors={errors}
            name={"slider_name"}
          />
          <p className="text-[#252F4A] font-semibold text-sm pb-3 pt-5">
            News Content
          </p>
          <div className="max-w-[700px]">
            <CustomEditor content={content} setContent={setContent} />
          </div>
        </div>
      </div>
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
          title={"Create"}
          type={"submit"}
          sizeSm={true}
          className={"w-20 bg-blue-500"}
        />
      </div>
    </form>
  );

  const handleCloseModal = () => {
    setIsNewSlider(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
    }
  };

  return (
    <>
      <div className="flex justify-between py-7 px-10">
        <InputSearch
          type="text"
          placeholder={"Search"}
          onKeyDown={handleKeyDown}
        />

        <div className="flex justify-end">
          <ButtonIcon
            title={"Add Slider"}
            icon={<FaPlus />}
            type={"button"}
            onClick={() => {
              setIsNewSlider(true);
            }}
          />
          <Modal
            isOpen={isNewSlider}
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
        title={"Do you want to delete the coupon?"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onClick={handleDelete}
      />
    </>
  );
};
