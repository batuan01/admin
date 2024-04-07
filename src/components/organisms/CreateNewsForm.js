import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm, InputFormAdmin } from "../atoms/Input";
import { ButtonModal } from "../atoms/Button";
import { UploadOnlyImage } from "../molecules/UploadOnlyImage";
import { ConvertFirebase } from "../../utils/firebase";
import Notification from "../atoms/Notification";
import { GetNewsDetail, PostNews, UpdateNews } from "../../utils/auth";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { UploadInfoImage } from "../molecules/UploadInfoImage";

const CustomEditor = dynamic(
  () => {
    return import("../molecules/FormEditor");
  },
  { ssr: false }
);

export const CreateNewsForm = ({ isNew }) => {
  const [content, setContent] = useState();
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const [dataUpdate, setDataUpdate] = useState();

  const router = useRouter();
  const query = router.query;

  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await GetNewsDetail({ news_id: query.id });
        setDataUpdate(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!isNew && query.id) {
      fetchDetail();
    }
  }, [query.id]);
  console.log(dataUpdate);

  const handleCreate = async (data) => {
    let urlInfo;
    if (selectedFilesInfo) {
      urlInfo = await ConvertFirebase({ images: selectedFilesInfo });
    }

    const dataSend = {
      news_name: data.news_name,
      news_content: content || "",
      news_image: urlInfo[0] || "",
      news_status: 1,
    };
    await PostNews(dataSend);
    Notification.success("Add news successfully!");
    handleClose();
  };

  const handleUpdate = async (data) => {
    let urlInfo;
    if (typeof selectedFilesInfo[0] === "object") {
      urlInfo = await ConvertFirebase({ images: selectedFilesInfo });
    } else {
      urlInfo = selectedFilesInfo;
    }

    const dataSend = {
      news_id: query.id,
      news_name: data.news_name,
      news_content: content || "",
      news_image: urlInfo[0] || "",
      news_status: dataUpdate.news_status,
    };
    await UpdateNews(dataSend);
    Notification.success("Update news successfully!");
    handleClose();
  };

  const handleClose = async () => {
    router.push("/news");
  };

  useEffect(() => {
    if (isNew) {
      reset({
        news_name: null,
      });
    } else {
      reset({
        news_name: dataUpdate?.news_name || "",
      });
      if (dataUpdate?.news_content) {
        setContent(dataUpdate?.news_content);
      }
      if (dataUpdate?.news_image) {
        setSelectedFilesInfo([dataUpdate?.news_image]);
      }
    }
  }, [dataUpdate, isNew]);

  return (
    <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
      <div className="border-b border-blue-400 bg-[#252525] flex justify-between items-center p-5 sticky top-0 z-[20]">
        <p className="text-white text-2xl font-bold ">
          {isNew ? "Create" : "Update"} News
        </p>
        <div className="flex justify-end gap-4">
          <ButtonModal
            title={"Cancel"}
            type={"button"}
            sizeSm={true}
            onClick={() => handleClose()}
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
      </div>

      <div className="flex gap-10">
        <div className="w-[300px]">
          <UploadInfoImage
            selectedFiles={selectedFilesInfo}
            setSelectedFiles={setSelectedFilesInfo}
          />
        </div>
        <div className="flex-grow " style={{ maxWidth: "calc(100% - 340px)" }}>
          <div className="bg-white rounded-lg px-10 py-8 shadow-lg">
            <h2 className="font-bold text-xl mb-5">General</h2>
            <InputFormAdmin
              register={register("news_name", {
                required: "News name cannot be left blank",
              })}
              type="text"
              placeholder={"Name"}
              label={"News Name"}
              required={true}
              errors={errors}
              name={"news_name"}
            />
            <p className="text-[#252F4A] font-semibold text-sm pb-3 pt-5">
              News Content
            </p>
            <CustomEditor content={content} setContent={setContent} />
          </div>
        </div>
      </div>
    </form>
  );
};
