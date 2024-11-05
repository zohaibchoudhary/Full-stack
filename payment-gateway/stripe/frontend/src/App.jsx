import { useState } from 'react'
import './App.css'
import axios from "axios"
import StripeCheckout from 'react-stripe-checkout';

function App() {
  const [product, setProduct] = useState({
    name: "Dsa Course",
    price: "399"
  })

  const makePayment = async (token) => {
    try {
      const response = await axios.post("http://localhost:3000", {
        product,
        token
      })

      const {status, data} = response;
      if (status === 200) {
        alert("Payment successfull")
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1>Stripe Payment Gateway</h1>
      <div className="card">
        <StripeCheckout 
        name={`Buy ${product.name}`}
        token={makePayment}
        amount={product.price * 100}
        stripeKey={import.meta.env.VITE_STRIPE_KEY}
        />
        </div>
    </>
  )
}

export default App
