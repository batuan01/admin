import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateNewsForm } from "../../../components/organisms/CreateNewsForm";

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
    <div className="pr-10 mt-2">
      <CreateNewsForm />
    </div>
  );
};
export default UpdateNews;
