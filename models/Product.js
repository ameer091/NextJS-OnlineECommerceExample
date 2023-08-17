import {Schema, model, models, mongoose} from'mongoose';

const ProductSchema = new Schema({
 title: {type: String, required: true},
 description: String,
 price: {type: Number, required: true},
 images: [{type:String}],
 category: {type:mongoose.Types.ObjectId, ref: 'Category'},
 properties: {type:Object},
}, {
  timestamps: true,
});

let Product;

if (!mongoose.models.Product) {
  Product = model('Product', ProductSchema);
} else {
  Product = mongoose.models.Product;
}

export default Product;