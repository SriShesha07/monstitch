import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

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
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }

  const form = formidable({ keepExtensions: true }); // ✅ fixed

  console.log('[API] Parsing form data...');
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('[API] Form parse error:', err);
      return res.status(500).json({ error: 'Form parse error', details: err.message });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    const publicId = fields.public_id || `secure_uploads/${Date.now()}`;

    if (!file) {
      console.error('[API] No file uploaded.');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('[API] Uploading to Cloudinary →', publicId);

    try {
      const result = await cloudinary.uploader.upload(file.filepath, {
        public_id: publicId,
        type: 'authenticated',
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
