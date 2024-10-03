const multer = require("multer");
const multerUp = multer({
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
module.exports = { multerUp };
