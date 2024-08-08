import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useProduct from '../../../hooks/useProduct';


const CheckoutFrom = () => {

  const [clintSecret, setClintSecret] = useState();
     const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
 const [product] = useProduct();
 const price = product.reduce( (total, item) => total + item.prices , 0 ) 

  // useEffect(  () => {
  //    axiosSecure.post('/creat-payment-intent', {price: price} )
  //   .then( res => {
  //     console.log(res.data.clintSecret);
  //     setClintSecret(res.data.clintSecret);
  //   })
  // },[axiosSecure,price])

  useEffect(() => {
    if (price >= 0.5) { // Ensure price meets minimum requirement
      axiosSecure.post('/create-payment-intent', { price: price })
        .then(res => {
          console.log(res.data.clientSecret);
      (res.data.clientSecret);
      setClintSecret  });
    } else {
      console.error("The total amount must be at least $0.50.");
    }
  }, [axiosSecure, price]);

     const  handleSubmit = async(event) => {
          event.preventDefault();

          if (!stripe || !elements) {
               
               return;
             }

             const card = elements.getElement(CardElement)
             if (card == null) {
               return;
             }

             const {error, paymentMethod} = await stripe.createPaymentMethod({
               type: 'card',
               card,
             });

             if (error) {
               console.log('[error]', error);
             } else {
               console.log('[PaymentMethod]', paymentMethod);
             }

     }

     return (
          <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <button  className='btn mt-36' type="submit" disabled={!stripe || !clintSecret}>
        Conferm Pay
      </button>
    </form>
     );
};

export default CheckoutFrom;