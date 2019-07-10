import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default image => new Promise((resolve, reject) => {
  cloudinary.v2.uploader
    .upload_stream({ folder: 'CLSC' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
    .end(image.buffer);
});
