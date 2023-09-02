import CardProducts from "@/components/common/card/CardProducts";
import api from "@/api/Request";
import { myDecode } from "@/utils/Convert";
const getProducts = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};
const ListProducts = async ({ filter }) => {
  let data = [];
  data = await getProducts(
    `/product/get-all/?searchKeyword=${
      myDecode(filter.searchKeyword) || ""
    }&category=${filter.category || ""}&size=${filter.size || ""}&color=${
      filter.color || ""
    }&page=${filter.page || 0}&rowsPerPage=12&newProduct=&saleProduct=&sorted=${
      filter.sorted || "desc"
    }&sortBy=${filter.sortBy || "createdAt"}`
  );
  return (
    <div className="list-products  grid gap-6  sm:grid-cols-2 md:grid-cols-3 ">
      {data.map((item, index) => {
        return <CardProducts key={index} product={JSON.stringify(item)} />;
      })}
    </div>
  );
};

export default ListProducts;
