import React from "react";
import Banner from "../../images/banner.png"

export default function HeroSection() {
  return (
    <div className="w-full h-[500px] bg-black">
      <img
        className="w-full h-full object-contain"
        src={Banner}
        alt="Hero Section Banner"
      />
    </div>
  );
}
