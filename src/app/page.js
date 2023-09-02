import OurBlog from "@/components/home/OurBlog";
import CardSupport from "@/components/home/CardSupport";
import Banners from "@/components/home/Banners";
import GoToTop from "@/components/home/GoToTop";
import Products from "@/components/home/Products";

import NewArrivals from "@/components/home/NewArrivals";
import BestSellers from "@/components/home/BestSellers";
import SaleItems from "@/components/home/SaleItems";
import api from "@/api/Request";

const getData = async (url) => {
  const res = await api.get(url);

  if (res) {
    return res.data.data;
  }
};

const Home = async () => {
  const banners = await getData("/banners/get-all");
  return (
    <div className="m-auto mt-[70px] transition-all duration-500">
      {/* slider */}

      <Banners banners={JSON.stringify(banners)} />

      {/* support */}
      <div className="cateogry pt-[60px] pb-[65px] row grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <CardSupport
          linkImage="/images/support/support-1.png"
          title="Miễn phí vận chuyển"
          subTitle="Miễn phí ship tất cả đơn hàng"
        />
        <CardSupport
          linkImage="/images/support/support-2.png"
          title="Hỗ trợ 24/7"
          subTitle="Hỗ trợ khách hàng mọi lúc"
        />
        <CardSupport
          linkImage="/images/support/support-3.png"
          title="Hoàn tiền"
          subTitle="Hoàn tiền nhanh chóng"
        />
        <CardSupport
          linkImage="/images/support/support-4.png"
          title="Giảm giá đặt hàng"
          subTitle="Giảm giá cho khách hàng cũ"
        />
      </div>

      {/* start list products */}
      <Products>
        <NewArrivals />
        <BestSellers />
        <SaleItems />
      </Products>
      {/* end list products */}

      {/* start blog */}
      <OurBlog />
      {/* end blog */}
      <GoToTop />
    </div>
  );
};

export default Home;
