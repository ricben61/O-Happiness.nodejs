const multer = require('multer');
const path = require('path');


const maxSize = 1 * 2500 * 2500; // 1MB

// const MIME_TYPES = {
//   'image/jpg': 'jpg',
//   'image/jpeg': 'jpg',
//   'image/png': 'png'
// };

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './assets/images');
  },
  filename: (req, file, callback) => {
    console.log(file);
    const name = file.originalname.split(' ').join('_');
    // const extension = MIME_TYPES[file.mimetype];
    const newName = Date.now() + '_' + name;
    callback(null, newName);
    // callback(null, name + Date.now() + '.' + extension);
  },
  
});
const fileFilter = async (req, file, cb) => {

  const ext = path.extname(file.originalname);
  // console.log("ext", ext);

  let validImageExtensions = ['png', 'jpg', 'jpeg'];

  if (validImageExtensions.indexOf(ext.substring(1)) === -1) {
    cb(null, false);
    console.log("invalid extension");
    return cb(new Error("Only " + validImageExtensions + " are allowed with maxsize 1MB"));
    
  }else{
    console.log("valid extension");
    cb(null, true);
  }
}

module.exports = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize: maxSize} }).single('img');