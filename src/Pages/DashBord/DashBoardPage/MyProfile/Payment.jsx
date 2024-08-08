import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutFrom from "./CheckoutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay_Pk);
const Payment = () => {
     return (
          <div>
               <Elements stripe={stripePromise}>
                    <CheckoutFrom></CheckoutFrom>
               </Elements>
          </div>
     );
};

export default Payment;