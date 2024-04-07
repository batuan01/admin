import Cookies from "js-cookie";
import Notification from "../components/atoms/Notification";
import SERVICES from "../assets";

/* <ADMIN> */
export const LoginAdmin = async (payload) => {
  try {
    const { data, status } = await SERVICES.loginAdmin(payload);
    if (status === 200) {
      const dataAdmin = {
        admin_id: data.admin.admin_id,
        admin_name: data.admin.admin_name,
        admin_phone: data.admin.admin_phone,
        admin_image: data.admin.admin_image,
        admin_role: data.admin.admin_role,
      };

      Cookies.set("admin", dataAdmin);
      Notification.success("Success !");
    } else {
      logError(data);
    }
  } catch (error) {
    Notification.error("Username or password is incorrect!");
  }
};

/* <CATEGORY> */
export const ListCategories = async () => {
  try {
    const { data, status } = await SERVICES.getCategories();
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateCategories = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateCategories(payload);
    if (status === 200) {
      return data.data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostCategory = async (payload) => {
  try {
    const { data, status } = await SERVICES.postCategory(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteCategory = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteCategory(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <PRODUCT> */
export const ListProducts = async () => {
  try {
    const { data, status } = await SERVICES.getProducts();
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.postProduct(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteProduct = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteProduct(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetProductDetail = async (payload) => {
  try {
    const { data, status } = await SERVICES.getProductDetail(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateProducts = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateProduct(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateProductsStatus = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateProductStatus(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteProductColor = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteProductColor(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <GALLERY> */
export const ListGalleries = async (payload) => {
  try {
    const { data, status } = await SERVICES.listGalleries(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostGalleries = async (payload) => {
  try {
    const { data, status } = await SERVICES.postGalleries(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteGallery = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteGallery(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <ORDER> */
export const GetOrders = async (payload) => {
  try {
    const { data, status } = await SERVICES.getOrders(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
export const UpdateOrderStatus = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateOrderStatus(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
export const GetOrdersDetail = async (payload) => {
  try {
    const { data, status } = await SERVICES.getOrdersDetail(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetDailySales = async (payload) => {
  try {
    const { data, status } = await SERVICES.getDailySales(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetDistinctPayments = async (payload) => {
  try {
    const { data, status } = await SERVICES.getDistinctPayments(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <CUSTOMER> */
export const GetCustomers = async (payload) => {
  try {
    const { data, status } = await SERVICES.getCustomer(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteCustomer = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteCustomer(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <NEWS> */
export const GetNews = async (payload) => {
  try {
    const { data, status } = await SERVICES.getNews(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const GetNewsDetail = async (payload) => {
  try {
    const { data, status } = await SERVICES.getNewsDetail(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteNews = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteNews(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostNews = async (payload) => {
  try {
    const { data, status } = await SERVICES.postNews(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateNews = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateNews(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateNewsStatus = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateNewsStatus(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <COUPON> */
export const GetCoupon = async (payload) => {
  try {
    const { data, status } = await SERVICES.getCoupon(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteCoupon = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteCoupon(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostCoupon = async (payload) => {
  try {
    const { data, status } = await SERVICES.postCoupon(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateCoupon = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateCoupon(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

/* <SLIDER> */
export const GetSliders = async (payload) => {
  try {
    const { data, status } = await SERVICES.getSliders(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const DeleteSlider = async (payload) => {
  try {
    const { data, status } = await SERVICES.deleteSlider(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const PostSlider = async (payload) => {
  try {
    const { data, status } = await SERVICES.postSlider(payload);
    if (status === 200) {
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};

export const UpdateSlider = async (payload) => {
  try {
    const { data, status } = await SERVICES.updateSlider(payload);
    if (status === 200) {
      return data;
    } else {
      logError(data);
    }
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
};
