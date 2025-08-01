import React from "react";
import Banner from "../../images/banner.png"

export default function HeroSection() {
  return (
    <div className="w-full h-[500px] bg-black">
      <img
        className="w-full h-full object-contain"
        src="https://res.cloudinary.com/doh27cvlb/image/upload/v1754016115/banner_final_red_lb47et.jpg"
        alt="Hero Section Banner"
      />
    </div>
  );
}
