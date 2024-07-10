// import multer from "multer";
// import path from "path";
// import dotenv from "dotenv";
// import multerS3 from "multer-s3";
// import AWS from "aws-sdk";

// dotenv.config();

// // Configure AWS SDK
// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// // Create S3 bucket (if not exists)
// const bucketName = process.env.S3_BUCKET_NAME;
// s3.createBucket({ Bucket: bucketName }, (err, data) => {
//   if (err) {
//     console.log(
//       `Bucket ${bucketName} already exists or there was an error:`,
//       err
//     );
//   } else {
//     console.log(`Bucket ${bucketName} created successfully`);
//   }
// });

// // Configure multer for file upload
// const storage = multerS3({
//   s3: s3,
//   bucket: bucketName,
//   acl: "public-read",
//   key: function (req, file, cb) {
//     cb(null, Date.now().toString() + "-" + path.basename(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// export default upload;

// =========================================================

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export { upload };
