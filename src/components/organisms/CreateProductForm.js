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
import { FaPlusCircle } from "react-icons/fa";
import { ConvertFirebase } from "../../utils/firebase";
import { Select } from "../atoms/Select";
import { ComboBoxSelect } from "../atoms/ComboBoxSelect";
import {
  DeleteProductColor,
  GetProductDetail,
  ListCategories,
  PostProduct,
  UpdateProducts,
} from "../../utils/auth";
import Notification from "../atoms/Notification";
import { useRouter } from "next/router";
import { UploadOnlyImage } from "../molecules/UploadOnlyImage";
import { TableForm } from "../molecules/Table";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { UploadInfoImage } from "../molecules/UploadInfoImage";
import dynamic from "next/dynamic";

const CustomEditor = dynamic(
  () => {
    return import("../molecules/FormEditor");
  },
  { ssr: false }
);

const CreateProductForm = ({ isNew }) => {
  const {
    register,
    handleSubmit,
    reset,
    methods,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  const [selectedFilesInfo, setSelectedFilesInfo] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [dataCategory, setDataCategory] = useState();
  const [content, setContent] = useState();
  const [dataUpdate, setDataUpdate] = useState();
  const [isReload, setIsReload] = useState(false);

  const router = useRouter();
  const query = router.query;

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
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const result = await GetProductDetail({ product_id: query.id });
        setDataUpdate(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!isNew && query.id) {
      fetchDetail();
    }
  }, [query.id, isReload]);

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
      product_content: content || "",
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
  const handleUpdate = async (data) => {
    let urlInfo;
    if (typeof selectedFilesInfo[0] === "object") {
      urlInfo = await ConvertFirebase({ images: selectedFilesInfo });
    } else {
      urlInfo = selectedFilesInfo;
    }

    const colors = convertColors(data);

    const idCategory = dataCategory.find(
      (e) => e.category_name === selectedCategory
    )?.category_id;

    const dataSend = {
      product_id: query.id,
      category_id: idCategory,
      product_sale: Number(data.product_sale) || "",
      product_name: data.product_name,
      product_content: content || "",
      product_image: urlInfo[0] || "",
      product_status: data.product_status,
      product_ram: data.product_ram || "",
      hard_drive: data.hard_drive || "",
      product_card: data.product_card || "",
      desktop: data.desktop || "",
      colors: colors,
    };

    await UpdateProducts(dataSend);
    Notification.success("Update product successfully!");
    handleClose();
  };

  const handleClose = () => {
    router.push("/product");
  };

  const [forms, setForms] = useState([
    {
      product_color_id: "",
      color_id: "",
      quantity: "",
      product_price: "",
    },
  ]);

  const addForm = () => {
    setForms([
      ...forms,
      {
        product_color_id: "",
        color_id: "",
        quantity: "",
        product_price: "",
      },
    ]);
  };

  const removeForm = (index) => {
    const newForms = forms.filter((_, i) => i !== index);
    setForms(newForms);
  };

  const handleRemoveColor = async (item) => {
    await DeleteProductColor({ product_color_id: item.product_color_id });
    setIsReload(!isReload);
    Notification.success("Delete color successfully!");
  };

  useEffect(() => {
    if (isNew) {
      reset({
        product_sale: null,
        product_name: null,
        product_content: null,
        product_image: null,
        product_status: 1,
        product_ram: null,
        hard_drive: null,
        product_card: null,
        desktop: null,
      });
    } else {
      const objResetColor = {};

      dataUpdate?.data.product_colors?.forEach((productColor, index) => {
        const colorName = dataUpdate?.colors.find(
          (color) => color.color_id === productColor.color_id
        )?.color_name;
        if (colorName) {
          objResetColor[`product-color-${index}`] =
            productColor.product_color_id;
          objResetColor[`color-${index}`] = colorName;
          objResetColor[`quantity-${index}`] = productColor.quantity;
          objResetColor[`price-${index}`] = productColor.product_price;
        }
      });

      reset({
        category_id: dataUpdate?.data.category_name,
        product_name: dataUpdate?.data.product_name,
        product_sale: dataUpdate?.data.product_sale || "",
        product_status: dataUpdate?.data.product_status,
        product_ram: dataUpdate?.data.product_detail?.product_ram || "",
        hard_drive: dataUpdate?.data.product_detail?.hard_drive || "",
        product_card: dataUpdate?.data.product_detail?.product_card || "",
        desktop: dataUpdate?.data.product_detail?.desktop || "",
        ...objResetColor,
      });
      if (dataUpdate?.data.product_content) {
        setContent(dataUpdate?.data.product_content);
      }
      if (dataUpdate?.data.product_image) {
        setSelectedFilesInfo([dataUpdate?.data.product_image]);
      }
      setForms(
        dataUpdate?.data.product_colors?.map((data) => ({
          product_color_id: data.product_color_id,
          color_id: data.color_id,
          quantity: data.quantity,
          product_price: data.product_price,
        }))
      );
    }
  }, [dataUpdate, isNew]);

  return (
    <>
      <form onSubmit={handleSubmit(isNew ? handleCreate : handleUpdate)}>
        <div className="border-b border-blue-400 bg-[#252525] flex justify-between items-center p-5 sticky top-0 z-[1]">
          <p className="text-white text-2xl font-bold ">
            {isNew ? "Create" : "Update"} Product
          </p>
          <div className="flex justify-end gap-4">
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

        <div className="flex gap-10">
          <div className="w-[300px]">
            <UploadInfoImage
              selectedFiles={selectedFilesInfo}
              setSelectedFiles={setSelectedFilesInfo}
            />
            <div className="bg-white rounded-lg p-10 shadow-lg mt-10">
              <h2 className="font-bold text-xl mb-5">Caregory</h2>
              <p className="text-[#252F4A] font-semibold text-sm flex gap-1 mb-2">
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
              <ButtonModal
                title={"Create new category"}
                type={"button"}
                sizeSm={true}
                onClick={() => router.push("/category")}
                textBlack
                className={
                  "mt-5 bg-blue-200 text-[#1B84FF] hover:bg-[#1B84FF] hover:text-white w-full"
                }
                icon={<FaPlusCircle />}
              />
            </div>
          </div>
          <div
            className="flex-grow "
            style={{ maxWidth: "calc(100% - 340px)" }}
          >
            <div className="bg-white rounded-lg px-10 py-8 shadow-lg">
              <h2 className="font-bold text-xl mb-5">General</h2>
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
              <p className="text-[#252F4A] font-semibold text-sm pb-3 pt-5">
                Product Content
              </p>
              <CustomEditor content={content} setContent={setContent} />
            </div>

            <div className="bg-white rounded-lg px-10 py-8 mt-10 shadow-lg">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl mb-5">Pricing</h2>
                <ButtonModal
                  title={"Add New Color"}
                  type={"button"}
                  sizeSm={true}
                  onClick={addForm}
                  textBlack
                  className={
                    "bg-blue-200 text-[#1B84FF] hover:bg-[#1B84FF] hover:text-white"
                  }
                  icon={<FaPlusCircle />}
                />
              </div>
              {forms?.map((item, index) => {
                return (
                  <div className="flex gap-5 items-center mt-5" key={index}>
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
                    <InputFormAdmin
                      register={register(`price-${index}`, {
                        required: "Price cannot be left blank",
                      })}
                      type="text"
                      placeholder={"price"}
                      label={"Price"}
                      required={true}
                      errors={errors}
                      name={`price-${index}`}
                    />
                    <input
                      {...register(`product-color-${index}`)}
                      type="hidden"
                      className={"w-0"}
                    />
                    {index === 0 ? (
                      <div className="w-[120px]"></div>
                    ) : (
                      <button
                        onClick={() => {
                          removeForm(index);
                          if (item.product_color_id !== "" && !isNew) {
                            handleRemoveColor(item);
                          }
                        }}
                        className="mt-6 bg-slate-400 p-[10px] rounded"
                      >
                        <HiArchiveBoxXMark className="h-5 hover:text-white" />
                      </button>
                    )}
                  </div>
                );
              })}
              <div className="pt-5 mr-[56px]">
                <InputFormAdmin
                  register={register("product_sale")}
                  type="text"
                  placeholder={"Product Sale"}
                  label={"Product Sale"}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg px-10 py-8 mt-10 shadow-lg">
              <h2 className="font-bold text-xl mb-5">Product Details</h2>
              <div className="flex gap-5 my-5">
                <InputFormAdmin
                  register={register("product_ram")}
                  type="text"
                  placeholder={"ram"}
                  label={"Ram"}
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
                  placeholder={"Pin"}
                  label={"Pin"}
                />
                <InputFormAdmin
                  register={register("desktop")}
                  type="text"
                  placeholder={"Desktop"}
                  label={"Desktop"}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default CreateProductForm;
