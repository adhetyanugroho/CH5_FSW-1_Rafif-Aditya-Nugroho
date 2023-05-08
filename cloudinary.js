// Require the Cloudinary library
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: "dlf3pvbmi", // TODO: Ganti dengan cloudname-mu
    api_key: "152574543389444", // TODO: Ganti dengan API Key-mu
    api_secret: "3G9PhX8csLFZORSA-GY2rThY69M", // TODO: Ganti dengan API Secret-mu
    secure: true,
});

module.exports = cloudinary;
