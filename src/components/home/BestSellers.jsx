import api from "@/api/Request";
import CardProducts from "../common/card/CardProducts";

const getProducts = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const BestSellers = async () => {
  const data = await getProducts(
    `/product/get-all?searchKeyword&category=&size&color&page=0&rowsPerPage=8&newProduct=&saleProduct=&sorted=desc&sortBy=totalSold`
  );
  return (
    <div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((item, index) => {
          return <CardProducts key={index} product={JSON.stringify(item)} />;
        })}
      </div>
    </div>
  );
};

export default BestSellers;
