const Admin = require('../models/admin');
// Middleware to check if the requester is an admin
const isAdmin = async (req, res, next) => {
  try {
    const username = req.headers.username;
    const admin = await Admin.findOne({ username: username });
    if (admin) {
      req.admin = admin;
      next();
    } else {
      res.status(401).json({
        message: 'Unauthorized',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'An unexpected error occurred',
      error: err,
    });
  }
};
module.exports =isAdmin