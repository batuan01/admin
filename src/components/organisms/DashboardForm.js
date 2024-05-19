import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  GetDailySales,
  GetDistinctPayments,
  GetProductsSoldByDay,
  ListCategories,
} from "../../utils/auth";
import { formatDate } from "../atoms/FormatDateTime";
import { DateForm } from "../molecules/Date";
import { Select, pushData } from "../atoms/Select";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

export const DashboardForm = () => {
  const [dataAll, setDataAll] = useState();
  const [allDataPayment, setAllDataPayment] = useState();
  const [allDataProductsSold, setAllDataProductsSold] = useState();

  const today = new Date();
  // Lấy ngày đầu tiên của tháng hiện tại
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const formattedFirstDayOfMonth = formatDate(firstDayOfMonth);
  // Lấy ngày hiện tại
  const formattedToday = formatDate(today);

  const [startDate, setStartDate] = useState(formattedFirstDayOfMonth);
  const [endDate, setEndDate] = useState(formattedToday);

  const [startDateProductsSold, setStartDateProductsSold] = useState(
    formattedFirstDayOfMonth
  );
  const [endDateProductsSold, setEndDateProductsSold] =
    useState(formattedToday);

  const [dataCategory, setDataCategory] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListCategories();
        setDataCategory(result);

        setSelectedCategory({
          name: result[0].category_name,
          id: result[0].category_id,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          start_date: startDate ?? formattedFirstDayOfMonth,
          end_date: endDate ?? formattedToday,
        };
        const result = await GetDailySales(payload);
        setDataAll(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataPayment = async () => {
      try {
        const result = await GetDistinctPayments();
        setAllDataPayment(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchDataPayment();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchDataProductsSold = async () => {
      try {
        const payload = {
          start_date: startDateProductsSold ?? formattedFirstDayOfMonth,
          end_date: endDateProductsSold ?? formattedToday,
          category_id: selectedCategory?.id,
        };
        const result = await GetProductsSoldByDay(payload);
        setAllDataProductsSold(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (selectedCategory) {
      fetchDataProductsSold();
    }
  }, [startDateProductsSold, endDateProductsSold, selectedCategory]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Revenue Chart",
      },
    },
  };

  const dataLine = {
    labels: dataAll?.map((item) => item.date),
    datasets: [
      {
        label: "Total",
        data: dataAll?.map((item) => item.total_sales),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  let dataPay;
  if (allDataPayment) {
    dataPay = Object.values(allDataPayment);
  }

  const dataPayment = {
    labels: ["Payment on delivery", "Pay with VNPAY"],
    datasets: [
      {
        label: "Total Amount",
        data: dataPay,
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 159, 64, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const dataBar = {
    labels: allDataProductsSold?.map((o) => o.product_name),
    datasets: [
      {
        label: "Number of products sold",
        backgroundColor: "rgba(0, 255, 0, 0.2)",
        borderColor: "rgb(0, 255, 0)",
        borderWidth: 1,
        data: allDataProductsSold?.map((o) => o.total_sales_quantity),
      },
    ],
  };

  const optionsBar = {
    plugins: {
      title: {
        display: true,
      },
    },
  };
  const dataSelect = dataCategory?.map((item) => ({
    name: item.category_name,
    id: item.category_id,
  }));

  let ContentSelect = [];
  pushData({
    arrayForm: ContentSelect,
    data: dataSelect,
  });

  return (
    <div>
      <div className="py-5 border-b border-blue-300 border-solid">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex gap-5 justify-between w-full pt-5">
        <div className="rounded-xl shadow-xl border-solid border-[#C7C8CC] border bg-white w-2/3">
          <div className="p-5 font-semibold border-solid border-[#C7C8CC] border-b flex justify-between items-center">
            <p>Statistics by day</p>
            <div className="flex gap-5">
              <div className="flex items-center gap-2">
                From:
                <DateForm
                  selectedDate={startDate}
                  setSelectedDate={setStartDate}
                />
              </div>
              <div className="flex items-center gap-2">
                To:
                <DateForm selectedDate={endDate} setSelectedDate={setEndDate} />
              </div>
            </div>
          </div>

          <div className="p-5 w-full h-full">
            <Line options={options} data={dataLine} />
          </div>
        </div>
        <div className="rounded-xl shadow-xl border-solid border-[#C7C8CC] border bg-white w-1/3">
          <div className="px-5 py-[30px] font-semibold border-solid border-[#C7C8CC] border-b flex justify-between items-center">
            <p>Payment</p>
          </div>

          <div className="p-5 w-full h-full">
            <Doughnut data={dataPayment} />
          </div>
        </div>
      </div>

      <div className="rounded-xl shadow-xl border-solid border-[#C7C8CC] border bg-white w-full mt-10">
        <div className="p-5 font-semibold border-solid border-[#C7C8CC] border-b flex justify-between items-center">
          <p>Statistics of best-selling products</p>
          <div className="flex gap-5 items-center">
            <div className="flex items-center gap-2">
              Category:
              <Select
                selected={selectedCategory}
                content={ContentSelect}
                onChange={(value) => {
                  setSelectedCategory(value);
                }}
              />
            </div>

            <div className="flex items-center gap-2">
              From:
              <DateForm
                selectedDate={startDateProductsSold}
                setSelectedDate={setStartDateProductsSold}
              />
            </div>
            <div className="flex items-center gap-2">
              To:
              <DateForm
                selectedDate={endDateProductsSold}
                setSelectedDate={setEndDateProductsSold}
              />
            </div>
          </div>
        </div>

        <div className="p-5 w-full h-full">
          <Bar data={dataBar} options={optionsBar} />
        </div>
      </div>
    </div>
  );
};
