import Breadcrumbs from "@/components/common/Breadcrumbs";
import CheckoutClient from "@/components/checkout/CheckoutClient";

const Checkout = () => {
  return (
    <div className="mt-[70px]">
      <Breadcrumbs home="/" curent="checkout" />
      <CheckoutClient />
    </div>
  )
}

export default Checkout