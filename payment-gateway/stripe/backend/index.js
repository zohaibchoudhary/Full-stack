import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Stripe from "stripe"

dotenv.config()

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())

const stripe = new Stripe(process.env.STRIPE_KEY)

app.post("/", async (req, res) => {
  const {product, token} = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
    })

    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      amount: product.price * 100,
      currency: "usd",
      description: "One time verification payment"
    })

    const result = await stripe.invoices.create({
      customer: invoiceItem.customer,
      collection_method: "charge_automatically"
    })

    return res.status(200).json(result)

  } catch (error) {
    console.error(error);
  }
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
})