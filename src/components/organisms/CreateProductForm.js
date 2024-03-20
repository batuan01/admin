import { Controller, useForm } from "react-hook-form";
import { ButtonModal } from "../atoms/Button";
import { InputFormAdmin, InputModal, TextAreaBlack } from "../atoms/Input";
import { UploadImage } from "../molecules/UploadImage";
import { useEffect, useState } from "react";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import { FaPlusCircle } from "react-icons/fa";
import { ConvertFirebase } from "../../utils/firebase";
import { Select } from "../atoms/Select";
import { ComboBoxSelect } from "../atoms/ComboBoxSelect";
import { ListCategories, PostProduct } from "../../utils/auth";
import Notification from "../atoms/Notification";
import { useRouter } from "next/router";

const CreateProductForm = ({ isNew = true }) => {
  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    formState: { errors },
  } = useForm();

  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [dataCategory, setDataCategory] = useState();

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListCategories();
        setDataCategory(result);
        setSelectedCategory(result[0].category_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const allNameCatogory = dataCategory?.map(
    (category) => category.category_name
  );

  function convertColors(data) {
    if (data) {
      const colorProperties = Object.keys(data).filter((key) =>
        key.startsWith("color-")
      );

      // Tạo một mảng colors từ các thuộc tính màu sắc và quantity
      const colors = colorProperties.map((colorKey) => {
        const index = colorKey.split("-")[1];
        return {
          color_name: data[colorKey],
          quantity: data[`quantity-${index}`],
        };
      });
      return colors;
    }
  }

  const handleCreate = async (data) => {
    let urlInfo;
    if (selectedFilesInfo) {
      urlInfo = await ConvertFirebase({ images: selectedFilesInfo });
    }

    const colors = convertColors(data);

    const idCategory = dataCategory.find(
      (e) => e.category_name === selectedCategory
    )?.category_id;

    const dataSend = {
      category_id: idCategory,
      product_sale: Number(data.product_sale) || "",
      product_name: data.product_name,
      product_price: Number(data.product_price),
      product_content: data?.product_content,
      product_image: urlInfo[0] || "",
      product_status: 1,
      product_ram: data.product_ram || "",
      hard_drive: data.hard_drive || "",
      product_card: data.product_card || "",
      desktop: data.desktop || "",
      colors: colors,
    };
    await PostProduct(dataSend);
    Notification.success("Add product successfully!");
    handleClose();
  };
  const handleUpdate = async (data) => {};

  const handleClose = () => {
    router.push("/product");
  };

  const [forms, setForms] = useState([{}]);

  const addForm = () => {
    setForms([...forms, {}]);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}
        className="px-10 pt-5"
      >
        <p className="uppercase text-center mb-5 text-2xl font-bold border-b-2 border-blue-400 pb-4">
          {isNew ? "Create" : "Update"} Product
        </p>

        {/* <div className="h-56 w-56">
            <UploadInfoImage
              name={"Product Image"}
              selectedFiles={selectedFilesInfo}
              setSelectedFiles={setSelectedFilesInfo}
            />
          </div> */}
        <div className="w-full">
          <div className="flex gap-5">
            <div className="w-full flex gap-5 items-center">
              <p className="text-[#3f4657] font-medium text-sm flex gap-1">
                Caregory <span className="text-[#ff0f0f]">*</span>
              </p>
              <Controller
                methods={methods}
                name="caregory"
                control={control}
                // rules={{ required: "Category is required" }}
                render={({ field }) => {
                  const { onChange, value, ref } = field;
                  return (
                    <ComboBoxSelect
                      data={allNameCatogory}
                      selected={selectedCategory}
                      setSelected={setSelectedCategory}
                    />
                  );
                }}
              />

              {errors.caregory && (
                <p className="text-red text-xs italic pt-1">
                  {errors.caregory.message}
                </p>
              )}
            </div>

            <InputFormAdmin
              register={register("product_name", {
                required: "Product Name cannot be left blank",
              })}
              type="text"
              placeholder={"Name"}
              label={"Product Name"}
              required={true}
              errors={errors}
              name={"product_name"}
            />
          </div>
          <div className="flex gap-5">
            <InputFormAdmin
              register={register("product_sale")}
              type="text"
              placeholder={"Product Sale"}
              label={"Product Sale"}
            />
            <InputFormAdmin
              register={register("product_price", {
                required: "Product price cannot be left blank",
              })}
              type="text"
              placeholder={"Product Price"}
              label={"Product Price"}
              required={true}
              errors={errors}
              name={"product_price"}
            />
          </div>
          <div className="flex gap-5 my-5">
            <InputFormAdmin
              register={register("product_ram")}
              type="text"
              placeholder={"Product ram"}
              label={"Product Ram"}
            />
            <InputFormAdmin
              register={register("hard_drive")}
              type="text"
              placeholder={"Hard Drive"}
              label={"Hard Drive"}
            />
            <InputFormAdmin
              register={register("product_card")}
              type="text"
              placeholder={"Product Card"}
              label={"Product Card"}
            />
            <InputFormAdmin
              register={register("desktop")}
              type="text"
              placeholder={"Desktop"}
              label={"Desktop"}
            />
          </div>

          <p className="text-[#3f4657] font-medium text-sm pb-2">
            Product Content
          </p>
          <TextAreaBlack
            register={register("product_content")}
            placeholder={"Product Content"}
            className={"h-32"}
          />
        </div>

        <div className="flex gap-10 mt-10 p-10 rounded-lg bg-slate-300">
          <div className="">
            <ButtonModal
              title={"New form"}
              type={"button"}
              sizeSm={true}
              onClick={addForm}
              textBlack
              className={"border-black border-[1px] border-solid"}
              icon={<FaPlusCircle />}
            />
            <p className="text-[#5c677e] font-medium text-sm pb-2 mt-4">
              Product Colors
            </p>
          </div>
          <div className="flex flex-col gap-5 mt-10">
            {forms.map((form, index) => (
              <div className="flex gap-5" key={index}>
                <InputFormAdmin
                  register={register(`color-${index}`, {
                    required: "Color name cannot be left blank",
                  })}
                  type="text"
                  placeholder={"Color Name"}
                  label={"Color Name"}
                  required={true}
                  errors={errors}
                  name={`color-${index}`}
                />
                <InputFormAdmin
                  register={register(`quantity-${index}`, {
                    required: "Quantity cannot be left blank",
                  })}
                  type="text"
                  placeholder={"Quantity"}
                  label={"Quantity"}
                  required={true}
                  errors={errors}
                  name={`quantity-${index}`}
                />
              </div>
            ))}
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
    </>
  );
};
export default CreateProductForm;
