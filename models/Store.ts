import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  ownerPublicKey: { type: String, required: true },
  logo: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Store = mongoose.models.Store || mongoose.model('Store', storeSchema); 