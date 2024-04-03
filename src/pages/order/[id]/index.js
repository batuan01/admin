const OrderDetailPage = () => {
  const listProduct = () => {
    <>
      <div className="flex items-center justify-between gap-5 my-5" key={index}>
        <img
          className="w-16 h-16"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEBqYEUHs9SPync2bo8AmdYjzW5WYicOWF8lreCXnMcQ&s"
        />
        <div className="w-[60%]">
          <p className="text-black font-semibold">sdfsdf</p>
          <p className="text-[#8e8e8e] font-bold text-xs pb-1">dfs</p>
        </div>
      </div>
    </>;
  };
  return (
    <>
      <div className="container">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="col-span-3 lg:col-span-2">{listProduct}</div>

          <div class="col-span-3 lg:col-span-1 bg-blue-400">Block 2 (30%)</div>
        </div>
      </div>
    </>
  );
};
export default OrderDetailPage;
