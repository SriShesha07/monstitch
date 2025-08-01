import React, { useEffect, useState } from "react";

const HeroSection = () => {
  const originalImageUrl = "https://res.cloudinary.com/doh27cvlb/image/authenticated/s--E9-pN7fB--/v1754014604/secure_uploads/secure_uploads/1754014604151.jpg";
  const [signedUrl, setSignedUrl] = useState("");

  // Function to extract publicId from Cloudinary URL
  const extractPublicId = (url) => {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    return parts[1].replace(/\.[^/.]+$/, ""); // removes file extension
  };

  useEffect(() => {
    const fetchSignedUrl = async () => {
      const publicId = extractPublicId(originalImageUrl);
      if (!publicId) {
        console.error("Failed to extract publicId from URL");
        return;
      }

      try {
        const res = await fetch("/api/getSignedImageUrl", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ publicId }),
        });

        const data = await res.json();
        if (res.ok && data.url) {
          setSignedUrl(data.url);
        } else {
          console.error("Failed to get signed URL:", data);
        }
      } catch (error) {
        console.error("Error fetching signed URL:", error);
      }
    };

    fetchSignedUrl();
  }, []);

  return (
    <div className="w-full h-[500px] bg-black flex items-center justify-center">
      {signedUrl ? (
        <img
          className="w-full h-full object-contain"
          src={signedUrl}
          alt="Hero Section Banner"
        />
      ) : (
        <p className="text-white">Loading banner...</p>
      )}
    </div>
  );
};

export default HeroSection;
