import { v2 as cloudinary } from "cloudinary";
import ENV from "../utils/env";

cloudinary.config({
  cloud_name: ENV.cloud_name,
  api_key: ENV.api_key,
  api_secret: ENV.api_secret,
});

export default cloudinary;
