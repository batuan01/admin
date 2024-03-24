import CreateProductForm from "../../../../components/organisms/CreateProductForm";

const UpdateProductPage = () => {
  return (
    <>
      <div className="pb-10 mx-10 w-auto">
        <CreateProductForm isNew={false} />
      </div>
    </>
  );
};
export default UpdateProductPage;
