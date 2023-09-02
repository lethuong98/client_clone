import Breadcrumbs from "@/components/common/Breadcrumbs";
import FilterProducts from "@/components/product/FilterProducts";
import ListProducts from "@/components/product/ListProducts";
import api from "@/api/Request";
import GoToTop from "@/components/home/GoToTop";

const getData = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const Product = async (props) => {
  const size = await getData(`/size/get-all?page=0&rowsPerPage=100`);
  const color = await getData(`/color/get-all?page=0&rowsPerPage=100`);
  const category = await getData(`/category/get-all?page=0&rowsPerPage=100`);
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home='/' curent='product' />
      <FilterProducts 
      size={JSON.stringify(size)}
      color={JSON.stringify(color)}
      category={JSON.stringify(category)}
      >
        <ListProducts filter={props.searchParams} />
      </FilterProducts>
      <GoToTop />
    </div>
  );
};

export default Product;
