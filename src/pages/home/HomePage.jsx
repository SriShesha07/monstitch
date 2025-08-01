import React from "react";
import Layout from "../../componentss/layout/Layout";
import HeroSection from "../../componentss/heroSection/HeroSection";
import Category from "../../componentss/category/Category";
import HomePageProductCard from "../../componentss/homePageProductCard/HomePageProductCard";
import Track from "../../componentss/track/Track";
import Testimonial from "../../componentss/testimonial/Testimonial";


export default function HomePage() {

  return (
    
    <Layout>
      <div className="bg-yellow-100 text-yellow-800 text-center p-3 font-medium">
        Note: The website is still under development, so some components may not be fully functional yet.
      </div>
      <HeroSection />
      {/* <Category /> */}
      {/* <HomePageProductCard /> */}
      <Track />
      {/* <Testimonial />  */}
    
    </Layout>
  );
}
