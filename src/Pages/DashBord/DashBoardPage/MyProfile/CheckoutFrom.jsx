import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useProduct from '../../../hooks/useProduct';

const CheckoutFrom = ({ onPaymentSuccess }) => {
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [product] = useProduct();

  const price = product.reduce((total, item) => {
    const itemPrice = item.price || 0;
    if (itemPrice > 0) {
      return total + itemPrice;
    }
    console.error('Invalid or missing price for item:', item);
    return total;
  }, 0);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (price > 0) {
        try {
          const res = await axiosSecure.post('/create-payment-intent', { price });
          setClientSecret(res.data.clientSecret);
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      } else {
        console.error("The total amount must be greater than $0.");
      }
    };

    createPaymentIntent();
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (paymentMethodError) {
      console.log('[Payment Method Error]', paymentMethodError);
      // You can display this error to the user
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id
    });

    if (confirmError) {
      console.log('[Confirm Error]', confirmError);
    } else if (paymentIntent.status === 'succeeded') {
      onPaymentSuccess();
    }
  };

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
      <button className='btn mt-36' type="submit">
        Confirm Pay
      </button>
    </form>
  );
};

export default CheckoutFrom;
