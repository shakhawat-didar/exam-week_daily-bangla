// models/News.js
import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { 
    type: String, 
    enum: ['রাজনীতি', 'খেলাধুলা', 'বিনোদন', 'আন্তর্জাতিক', 'প্রযুক্তি', 'মতামত', 'গ্যালারি', 'অন্যান্য'], 
    default: 'অন্যান্য' 
  },
  gallery: [{ type: String }], // array of image URLs (optional)
  videoUrl: { type: String }, // optional video url
  views: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
export default News;
