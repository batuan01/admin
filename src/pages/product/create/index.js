import CreateProductForm from "../../../components/organisms/CreateProductForm";
import { FcHome } from "react-icons/fc";

const CreateProduct = () => {
  return (
    <>
      <div className="bg-slate-400 py-3 px-10 flex gap-3 items-center">
        <FcHome className="text-xl" />
        <span className="text-white">Home / Product / Create</span>
      </div>
      <div className="pb-10 mx-5 w-auto">
        <CreateProductForm isNew={true} />
      </div>
    </>
  );
};
export default CreateProduct;
