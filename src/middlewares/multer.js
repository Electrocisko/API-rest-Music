import multer from "multer";

//multer
const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./src/uploads/avatars/");
    },
    filename: (req,file,cb) => {
       cb(null,"avatar-"+Date.now()+"-"+file.originalname);
    }
})

const upload = multer({storage: storage});

export default upload;