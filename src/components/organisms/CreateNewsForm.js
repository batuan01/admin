import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputForm } from "../atoms/Input";
import { CustomEditor } from "../molecules/FormEditor";
import { ButtonModal } from "../atoms/Button";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import { UploadOnlyImage } from "../molecules/UploadOnlyImage";
import { ConvertFirebase } from "../../utils/firebase";
import Notification from "../atoms/Notification";
import { PostNews } from "../../utils/auth";
import { useRouter } from "next/router";

export const CreateNewsForm = ({ isNew = true }) => {
  const [content, setContent] = useState();
  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

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

  const handleUpdate = async (data) => {};

  const handleClose = async () => {
    router.push("/news");
  };

  return (
    <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
      <p className="uppercase text-center mb-5 text-lg font-bold border-b-2 pb-4 border-white">
        {isNew ? "Create" : "Update"} News
      </p>

      <div className="grid grid-cols-10 w-full items-center">
        <p className="text-[#3f4657] font-medium text-sm pb-2 col-span-1">
          News Name
        </p>
        <div className="col-span-9">
          <InputForm
            register={register("news_name", {
              required: "News name cannot be left blank",
            })}
            type="text"
            placeholder={"News name "}
          />
        </div>
      </div>

      <div className="grid grid-cols-10 w-full items-center mt-4">
        <p className="text-[#3f4657] font-medium text-sm pb-2 col-span-1">
          News Image
        </p>
        <div className="col-span-9">
          <UploadOnlyImage
            selectedFiles={selectedFilesInfo}
            setSelectedFiles={setSelectedFilesInfo}
          />
        </div>
      </div>

      <div className="grid grid-cols-10 w-full items-center mt-4">
        <p className="text-[#3f4657] font-medium text-sm pb-2 col-span-1">
          News Content
        </p>
        <div className="col-span-9">
          <CustomEditor content={content} setContent={setContent} />
        </div>
      </div>

      <div className="flex justify-end mt-5 gap-4">
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
    </form>
  );
};
