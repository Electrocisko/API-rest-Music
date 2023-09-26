import multer from 'multer';
import __dirname from '../../aux_dirname.js';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, __dirname + "/src/public/images/artists");
    },
    filename: function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
});

const upLoader = multer({storage: storage});
export default  upLoader;   