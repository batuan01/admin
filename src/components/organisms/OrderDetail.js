import { useEffect, useState } from "react";
import { CgSmartphone } from "react-icons/cg";
import { useRouter } from "next/router";
import { GetOrdersDetail, UpdateOrderStatus } from "../../utils/auth";
import { ButtonModal } from "../atoms/Button";
import { FormatPrice } from "../atoms/FormatPrice";
import { Select, pushData } from "../atoms/Select";
import { ORDER_STATUS } from "../../constants/common";
import Notification from "../atoms/Notification";

export const OrderDetailForm = () => {
  const [dataAll, setDataAll] = useState();
  const [selectedSort, setSelectedSort] = useState();

  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = { order_id: query.id };
        const result = await GetOrdersDetail(payload);
        setDataAll(result);
        setSelectedSort({
          name: ORDER_STATUS.find(
            (item) => item.value === result.data.order_status
          ).label,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query.id) {
      fetchData();
    }
  }, [query]);

  const getColorName = (colorId) => {
    const color = dataAll?.colors?.find((item) => item.color_id === colorId);
    return color ? color.color_name : "";
  };

  const listProduct = (data) => {
    return (
      <>
        {data?.map((item, index) => {
          return (
            <div
              className="flex justify-between items-center border-solid border-[#C7C8CC] border-b py-5"
              key={index}
            >
              <div className="flex gap-5 w-1/2">
                <img
                  src={item.product_image}
                  className="h-16 w-auto"
                  alt="Product"
                />
                <div>
                  <p className="text-base font-semibold">{item.product_name}</p>
                  <p className="text-sm text-slate-400">
                    Color: {getColorName(item.color_id)}
                  </p>
                </div>
              </div>
              <p className="text-base font-semibold">
                {FormatPrice(item.product_price)}
              </p>
              <p className="text-base font-semibold">
                {item.product_sales_quantity}
              </p>
              <p className="text-base font-semibold">
                {FormatPrice(item.product_price * item.product_sales_quantity)}
              </p>
            </div>
          );
        })}
      </>
    );
  };

  const handleClose = () => {
    router.push("/order");
  };

  const dataSelect = ORDER_STATUS.map((item) => ({ name: item.label }));

  let ContentSelect = [];
  pushData({
    arrayForm: ContentSelect,
    data: dataSelect,
  });

  const handleChangeStatus = async (value) => {
    const orderStatus = ORDER_STATUS.find(
      (item) => value.name === item.label
    ).value;
    const payload = {
      order_id: query.id,
      order_status: orderStatus,
    };
    await UpdateOrderStatus(payload);
    Notification.success("Updated status successfully!");
  };

  return (
    <>
      <div className="border-b border-blue-400 bg-[#252525] flex justify-between items-center p-5 sticky top-0 z-[15]">
        <p className="text-white text-2xl font-bold ">Order Details</p>
        <div className="flex justify-end gap-4">
          <ButtonModal
            title={"Cancel"}
            type={"button"}
            sizeSm={true}
            onClick={() => handleClose()}
            textBlack={true}
            className={"border-black border-[1px] bg-slate-300 w-20"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5">
        <div className="col-span-3 lg:col-span-2 ">
          <div className="rounded-xl shadow-lg border-solid border-[#C7C8CC] border">
            <div className="p-5 font-semibold border-solid border-[#C7C8CC] border-b flex justify-between items-center">
              <p>Order details</p>
              <div className="w-fit">
                <Select
                  selected={selectedSort}
                  content={ContentSelect}
                  onChange={(value) => {
                    handleChangeStatus(value);
                    setSelectedSort(value);
                  }}
                />
              </div>
            </div>
            <div className="px-5">
              {listProduct(dataAll?.data.order_detail)}
            </div>
            <div className="flex justify-end p-5">
              <div className="flex gap-10">
                <p>Total:</p>
                <p className="font-semibold">
                  {FormatPrice(dataAll?.data.order_total)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-3 lg:col-span-1">
          <div className="rounded-xl shadow-lg border-solid border-[#C7C8CC] border">
            <div className="p-5 font-semibold border-solid border-[#C7C8CC] border-b">
              Customer
            </div>
            <div className="flex justify-start items-center mx-5 py-5 gap-2 border-solid border-[#C7C8CC] border-b">
              <img
                src={
                  dataAll?.data.customer.customer_image
                    ? dataAll?.data.customer.customer_image
                    : "https://inkythuatso.com/uploads/thumbnails/800/2023/03/6-anh-dai-dien-trang-inkythuatso-03-15-26-36.jpg"
                }
                className="w-10 h-10 rounded-full"
              />
              <p>{dataAll?.data.customer.customer_fullname}</p>
            </div>
            <div className="p-5 border-solid border-[#C7C8CC] border-b">
              <p className="text-[#377DFF] font-semibold">Contact info</p>
              <p className="py-2">@ {dataAll?.data.customer.customer_name}</p>
              <p className="py-2 flex items-center gap-1">
                <CgSmartphone /> {dataAll?.data.customer.customer_phone}
              </p>
            </div>
            <div className="p-5 ">
              <p className="text-[#377DFF] font-semibold">Shipping info</p>
              <p className="py-2">
                <span className="text-slate-500 mr-1">Name:</span>
                {dataAll?.data.shipping.shipping_name}
              </p>
              <p className="py-2">
                <span className="text-slate-500 mr-1"> Phone:</span>
                {dataAll?.data.shipping.shipping_phone}
              </p>
              <p className="py-2">
                <span className="text-slate-500 mr-1">Address:</span>
                {dataAll?.data.shipping.shipping_address}
              </p>
              <p className="py-2">
                <span className="text-slate-500 mr-1"> Notes: </span>
                {dataAll?.data.shipping.shipping_notes}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
