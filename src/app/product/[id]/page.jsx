import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductDetail from "@/components/productdetail/ProductDetail";
import api from "@/api/Request";
import RelatedProducts from "@/components/productdetail/RelatedProducts";
import GoToTop from "@/components/home/GoToTop";

const getData = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const DetailProduct = async ({ params }) => {
  const product = await getData(`/product/get-one/${params.id}`);
  const size = await getData(`/size/get-all?page=0&rowsPerPage=100`);
  const color = await getData(`/color/get-all?page=0&rowsPerPage=100`);
  const category = await getData(`/category/get-all?page=0&rowsPerPage=100`);
  const relatedProducts = await getData(
    `/product/get-all/?category=${product?.categoryId}&rowsPerPage=6`
  );
  return (
    <>
    
    <div className="mt-[70px]">
      <Breadcrumbs home='/' product='/product' curent={params.id} />
      <div className="row">
        <ProductDetail
          product={JSON.stringify(product)}
          size={JSON.stringify(size)}
          color={JSON.stringify(color)}
          category={JSON.stringify(category)}
        />
        <RelatedProducts relatedProducts={JSON.stringify(relatedProducts)} />
      </div>
    </div>
    <GoToTop />
    </>
  );
};

export default DetailProduct;
