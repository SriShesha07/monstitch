// /api/uploadAuthenticatedImage.js
import { IncomingForm } from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// Disable Vercel's default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  console.log('[API] Starting upload handler');

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('[API] Form parsing error:', err);
      return res.status(500).json({ error: 'Form parsing error', details: err.message });
    }

    const file = files.file;
    const publicId = fields.public_id || `secure_uploads/${Date.now()}`;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('[API] Uploading file:', file.originalFilename);

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        public_id: publicId,
        type: 'authenticated', // crucial for private assets
        folder: 'secure_uploads',
      });

      console.log('[API] Upload successful:', result.secure_url);

      return res.status(200).json({
        message: 'Upload successful',
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (uploadErr) {
      console.error('[API] Upload failed:', uploadErr);
      return res.status(500).json({ error: 'Upload failed', details: uploadErr.message });
    }
  });
}
