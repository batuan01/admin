import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateNewsForm } from "../../../components/organisms/CreateNewsForm";
import { FcHome } from "react-icons/fc";

const CreateNews = () => {
  return (
    <>
      <div className="mx-10">
        <CreateNewsForm isNew={true} />
      </div>
    </>
  );
};
export default CreateNews;
