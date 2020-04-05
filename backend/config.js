const path = require('path');
const multer = require('multer');
const nanoid = require('nanoid');



module.exports={
  storage:  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname ,'public/uploads'))
    },
    filename: (req, file, cb) => {
      cb(null, nanoid() + path.extname(file.originalname))
    }
  }),
  database: 'mongodb://localhost/playlist',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  facebook:{
    appId: '1342251599302385',
    appSecret: '382272bfacf29e5c59a796425d6e1d2e'
  }
};
