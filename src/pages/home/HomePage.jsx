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
      <HeroSection />
      {/* <Category /> */}
      <HomePageProductCard />
      <Track />
      <Testimonial /> 
    
    </Layout>
  );
}
