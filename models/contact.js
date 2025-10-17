const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  middleName: String,
  lastName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: String,
  addressLine1: String,
  addressLine2: String,
  province: String,
  postcode: String,
  country: String
});

module.exports = mongoose.model('Contact', contactSchema);
