import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  console.log('[UPLOAD] Request received');

  if (req.method !== 'POST') {
    console.log('[UPLOAD] Invalid method:', req.method);
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('[UPLOAD] Error parsing form:', err);
      return res.status(500).json({ error: 'Form parse error', details: err });
    }

    const file = files.file;
    const publicId = fields.public_id || `secure_uploads/${Date.now()}`;

    if (!file) {
      console.warn('[UPLOAD] No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('[UPLOAD] File received:', file.originalFilename);
    console.log('[UPLOAD] Saving to public_id:', publicId);

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        public_id: publicId,
        type: 'authenticated',
        folder: 'secure_uploads',
      });

      console.log('[UPLOAD] Upload successful:', result.secure_url);

      return res.status(200).json({
        message: 'Upload successful',
        url: result.secure_url,
        public_id: result.public_id,
      });
    } catch (uploadErr) {
      console.error('[UPLOAD] Upload failed:', uploadErr.message);
      return res.status(500).json({ error: 'Upload failed', details: uploadErr.message });
    }
  });
}
