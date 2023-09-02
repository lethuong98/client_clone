import Breadcrumbs from "@/components/common/Breadcrumbs";
import CartClient from "@/components/cart/CartClient";

const WishList = () => {
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" curent="cart" />
      <CartClient />
    </div>
  );
};

export default WishList;
