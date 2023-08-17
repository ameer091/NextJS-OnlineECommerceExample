import {mongooseConnect} from "@/lib/mongoose"
import Product from "@/models/Product"
import {Order} from "@/models/Order"
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  console.log("Incoming request method:", req.method)
 if (req.method !== 'POST') {
  res.json('should be a POST request');
  return;
 }
 const {name,email,city,postalCode,streetAddress,country, cartProducts} = req.body;
 await mongooseConnect()
 const productsIds = cartProducts;
 //Converted set to array so that when we have unique ids, we can grab product information
 const uniqueIds = [...new Set(productsIds)]
 const productsInfos = await Product.find({_id:uniqueIds});

 let line_items = [];
 for (const productId of uniqueIds) {
  const productInfo = productsInfos.find(p => p._id.toString() === productId);
  const quantity = productsIds.filter(id => id === productId)?.length || 0;
  if (quantity > 0 && productInfo) {
    line_items.push({
     quantity,
     price_data: {
      currency: 'USD',
      product_data: {name:productInfo.title},
      //The times 100 is because I was getting the wrong price, remove it to see what happens
      unit_amount: quantity * productInfo.price * 100,
     }
    })
  }
 }
 const orderDocument = await Order.create({
  line_items,name,email,city,postalCode,streetAddress,country,paid:false,
 })

 const session = await stripe.checkout.sessions.create({
  line_items,
  mode: 'payment',
  customer_email: email,
  //success url is the email that the user will be redirected to if it works
  success_url: process.env.PUBLIC_URL + '/cart?success=1',
  //if it doesn't work
  cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
  metadata: {orderId:orderDocument._id.toString()},
 });

 res.json({
  url:session.url
 })


}