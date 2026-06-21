const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
      min: 0
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/400x400?text=Product+Image'
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
