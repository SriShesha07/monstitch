// /api/uploadAuthenticatedImage.js
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Disable default body parsing by Vercel
export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Form parse error', details: err });
    }

    const file = files.file;
    const publicId = fields.public_id || `secure_uploads/${Date.now()}`;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        public_id: publicId,
        type: 'authenticated', // Key part for private access
        folder: 'secure_uploads', // Optional folder
      });

      return res.status(200).json({
        message: 'Upload successful',
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (uploadErr) {
      return res.status(500).json({ error: 'Upload failed', details: uploadErr.message });
    }
  });
}
