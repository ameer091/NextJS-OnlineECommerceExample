import mongoose from "mongoose"
import {mongooseConnect} from "@/lib/mongoose"
import Product from "@/models/Product"

// export default async function handle(req,res){
//   await mongooseConnect();
//   const ids = req.body.ids;
//   res.json(await Product.find({_id:ids}));
// }

export default async function handle(req, res) {
  try {
      await mongooseConnect();

if (mongoose.connection.readyState !== 1) {
    console.log("Mongoose is not connected!");
    res.status(500).send("Database connection error");
    return;
}
  } catch (err) {
      console.error("Error connecting to MongoDB:", err.message);
      return res.status(500).json({ error: "Failed to connect to MongoDB." });
  }

  const ids = req.body.ids;

  try {
      const products = await Product.find({ _id: ids });
      res.json(products);
  } catch (err) {
      console.error("Error querying the Product model:", err.message);
      return res.status(500).json({ error: "Failed to fetch products." });
  }
}

