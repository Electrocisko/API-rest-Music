import multer from "multer";

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/uploads/songs/");
  },
  filename: (req, file, cb) => {
    cb(null,  Date.now() + "-" + file.originalname);
  },
});

const upLoader = multer({ storage: storage });

export default upLoader;