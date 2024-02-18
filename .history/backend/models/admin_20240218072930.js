const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', adminSchema);

// Example usage: create or update an admin
const adminData = {
  name: '',
  username: 'Admin',
  email: 'dem@gmail.com',
  password: bcrypt.hashSync('admin', 6),
};

Admin.findOneAndUpdate(
  { email: adminData.email },
  adminData,
  { upsert: true, new: true }
)
  .then((updatedAdmin) => {
    console.log('Admin saved/updated successfully:', updatedAdmin);
    // Perform other operations
  })
  .catch((error) => {
    console.error('An error occurred while saving/updating the admin:', error);
    // Handle the error appropriately
  });


module.exports = Admin