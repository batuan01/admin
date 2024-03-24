import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateNewsForm } from "../../../components/organisms/CreateNewsForm";
import { FcHome } from "react-icons/fc";

const UpdateNews = () => {
  return (
    <>
      <div className="pb-10 mx-10 ">
        <CreateNewsForm isNew={false} />
      </div>
    </>
  );
};
export default UpdateNews;
