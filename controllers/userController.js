const req = require("express/lib/request");
const multer = require("multer");

const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const filename = file.originalname;
    callback(null, filename);
  },
});

const isFile = (req, file, callback) => {
  if (file.mimetype.startsWith("application")) {
    callback(null, true);
  } else {
    callback(new Error("Only File Document is Allowed.."));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isFile,
});

exports.uploadFile = upload.single("document");

exports.upload = (req, res) => {
  console.log(req.file);

  res.status(200).json({
    success: "Success",
  });
};
