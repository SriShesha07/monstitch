// /api/getSignedImageUrl.js
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  console.log('[API] Received request to /api/getSignedImageUrl');

  if (req.method !== 'POST') {
    console.warn('[API] Invalid method:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { publicId } = req.body;
  console.log('[API] publicId received:', publicId);

  if (!publicId) {
    console.error('[API] Missing publicId in request body');
    return res.status(400).json({ message: 'Missing publicId' });
  }

  try {
    const expiresAt = Math.floor(Date.now() / 1000) + 3600; // 1 hour
    console.log('[API] Generating signed URL with expiry:', expiresAt);

    const signedUrl = cloudinary.url(publicId, {
      type: 'authenticated',
      resource_type: 'image', // <-- important!
      sign_url: true,
      secure: true,
      expires_at: expiresAt,
    });

    console.log('[API] Signed URL generated successfully:', signedUrl);
    return res.status(200).json({ url: signedUrl });
  } catch (err) {
    console.error('[API] Error generating signed URL:', err);
    return res.status(500).json({ message: 'Failed to sign URL', error: err.message });
  }
}
