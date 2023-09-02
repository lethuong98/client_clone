import Breadcrumbs from "@/components/common/Breadcrumbs";
import WishListClient from "@/components/wishlist/WishListClient";

const WishList = () => {
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" curent="wishlist" />
      <WishListClient />
    </div>
  );
};

export default WishList;
