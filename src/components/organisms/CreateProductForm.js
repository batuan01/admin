import { Controller, useForm } from "react-hook-form";
import { ButtonModal } from "../atoms/Button";
import {
  InputFormAdmin,
  InputModal,
  InputTable,
  TextAreaBlack,
} from "../atoms/Input";
import { UploadImage } from "../molecules/UploadImage";
import { useEffect, useState } from "react";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import { FaPlusCircle } from "react-icons/fa";
import { ConvertFirebase } from "../../utils/firebase";
import { Select } from "../atoms/Select";
import { ComboBoxSelect } from "../atoms/ComboBoxSelect";
import { GetProductDetail, ListCategories, PostProduct } from "../../utils/auth";
import Notification from "../atoms/Notification";
import { useRouter } from "next/router";
import { UploadOnlyImage } from "../molecules/UploadOnlyImage";
import { TableForm } from "../molecules/Table";
import { HiArchiveBoxXMark } from "react-icons/hi2";

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
    const fetchDetail = async () => {
      try {
        const result = await GetProductDetail();
        setDataCategory(result);
        setSelectedCategory(result[0].category_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDetail();
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
          price: data[`price-${index}`],
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

  const removeForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  const dataThead = ["No.", "Name", "Quantity", "Price", "Action"];
  const dataBody = [];

  dataBody.push(
    forms.map((item, index) => (
      <tr key={index} className="border-b border-[#bdbdbd]">
        <td className="text-center">
          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-semibold">
            {index + 1}
          </p>
        </td>
        <td className="text-center">
          <InputTable
            register={register(`color-${index}`)}
            type="text"
            placeholder={"Color"}
          />
        </td>
        <td className="text-center ">
          <InputTable
            register={register(`quantity-${index}`)}
            type="text"
            placeholder={"Quantity"}
          />
        </td>
        <td className="text-center ">
          <InputTable
            register={register(`price-${index}`)}
            type="text"
            placeholder={"Price"}
          />
        </td>
        <td className="text-center ">
          <button onClick={() => removeForm(index)}>
            <HiArchiveBoxXMark className="h-5 hover:text-red" />
          </button>
        </td>
      </tr>
    ))
  );

  return (
    <>
      <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
        <p className="text-white p-5 text-2xl font-bold border-b border-blue-400 pb-4 bg-[#252525]">
          {isNew ? "Create" : "Update"} Product
        </p>

        <div className="px-10 pt-5">
          <div className="w-full">
            <div className="flex gap-5">
              <div className="flex flex-col w-full">
                <div className="w-full flex gap-5 items-center">
                  <p className="text-[#3f4657] font-medium text-sm flex gap-1 w-[100px]">
                    Caregory <span className="text-[#ff0f0f]">*</span>
                  </p>
                  <Controller
                    methods={methods}
                    name="caregory"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => {
                      const { onChange, value, ref } = field;
                      return (
                        <div className="flex-grow">
                          <ComboBoxSelect
                            data={allNameCatogory}
                            selected={selectedCategory}
                            setSelected={setSelectedCategory}
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                {errors.caregory && (
                  <p className="text-red text-xs italic pt-1 ml-[120px]">
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
            <div className="flex gap-5 my-5">
              <InputFormAdmin
                register={register("product_sale")}
                type="text"
                placeholder={"Product Sale"}
                label={"Product Sale"}
              />
              <div className="w-full flex items-center gap-5">
                <p className="text-[#3f4657] font-medium text-sm w-[100px]">
                  Product Image
                </p>
                <UploadOnlyImage
                  selectedFiles={selectedFilesInfo}
                  setSelectedFiles={setSelectedFilesInfo}
                />
              </div>
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
            </div>
            <div className="flex gap-5 my-5">
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

            <p className="text-[#3f4657] font-medium text-sm pb-2 pt-2">
              Product Content
            </p>
            <TextAreaBlack
              register={register("product_content")}
              placeholder={"Product Content"}
              className={"h-32"}
            />
          </div>

          <div className="mt-10 mb-5 flex justify-end">
            <ButtonModal
              title={"Add New Color"}
              type={"button"}
              sizeSm={true}
              onClick={addForm}
              textBlack
              className={"border-black border-[1px] border-solid"}
              icon={<FaPlusCircle />}
            />
          </div>
          <TableForm dataThead={dataThead} dataBody={dataBody} />

          <div className="flex justify-end mt-10 gap-4">
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
      </form>
    </>
  );
};
export default CreateProductForm;
