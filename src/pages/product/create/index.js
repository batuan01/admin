import CreateProductForm from "../../../components/organisms/CreateProductForm";

const CreateProduct = () => {
  return (
    <>
      <div className="pb-10 mx-10 w-auto">
        <CreateProductForm isNew={true} />
      </div>
    </>
  );
};
export default CreateProduct;
