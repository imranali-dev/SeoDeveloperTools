// pathCreationMiddleware.js
const fs = require('fs');

module.exports = (req, res, next) => {
  const defaultImagePath = 'images'; // Adjust as needed
  if (!fs.existsSync(defaultImagePath)) {
    try {
      fs.mkdirSync(defaultImagePath);
    } catch (err) {
      console.error('Error creating default image path:', err);
      res.status(500).json({ message: 'Internal server error' });
      return; 
    }
  }
  next(); 
};

