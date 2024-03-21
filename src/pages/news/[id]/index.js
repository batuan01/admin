import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateNewsForm } from "../../../components/organisms/CreateNewsForm";
import { FcHome } from "react-icons/fc";

const UpdateNews = ({ isNew = true }) => {
  const [content, setContent] = useState();
  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const handleCreate = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="bg-slate-400 py-3 px-10 flex gap-3 items-center">
        <FcHome className="text-xl" />
        <span className="text-white">Home / News / Create</span>
      </div>
      <div className="pb-10 mx-5 bg-white">
        <CreateNewsForm isNew={false} />
      </div>
    </>
  );
};
export default UpdateNews;
