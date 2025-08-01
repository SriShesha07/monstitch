// /api/getSignedImageUrl.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { publicId } = req.body;

  if (!publicId) {
    return res.status(400).json({ message: 'Missing publicId' });
  }

  try {
    const signedUrl = cloudinary.url(publicId, {
      type: 'authenticated',
      sign_url: true,
      secure: true,
      expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour
    });

    res.status(200).json({ url: signedUrl });
  } catch (err) {
    res.status(500).json({ message: 'Failed to sign URL', error: err.message });
  }
}
