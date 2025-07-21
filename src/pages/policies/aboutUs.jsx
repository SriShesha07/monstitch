import React from "react";
import Layout from "../../componentss/layout/Layout";

const AboutUs = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-black text-white px-6 py-12 md:px-20 lg:px-40">
        <h1 className="text-3xl font-bold mb-6 text-center">About Monstitch</h1>

        {/* Tagline */}
        <p className="text-xl italic text-center text-gray-300 mb-10">
          “Threading Confidence, Stitching Style.”
        </p>

        {/* About Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">About Us</h2>
          <p className="text-gray-300 leading-relaxed">
            Monstitch Clothing is a bold new entrant in the fashion industry, dedicated to crafting stylish, high-quality apparel that blends modern streetwear aesthetics with everyday comfort. Founded in 2025, Monstitch represents a new wave of clothing designed for self-expression, authenticity, and individuality.
            <br /><br />
            We believe that fashion is more than just clothing — it’s a statement. Every Monstitch piece is designed to reflect the spirit of youth, rebellion, and creativity. Whether it’s a graphic tee or a sleek hoodie, our apparel is stitched with purpose, personality, and passion.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Vision</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            To become a leading streetwear brand in India and globally by empowering people to wear their confidence and creativity through our clothing.
          </p>

          <h2 className="text-2xl font-semibold mb-3">Mission</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>To design bold, high-quality apparel that speaks to the youth.</li>
            <li>To create limited-edition drops that maintain exclusivity and hype.</li>
            <li>To build a community that values originality, diversity, and fearless self-expression.</li>
          </ul>
        </section>

        {/* Core Values */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Core Values</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Authenticity</strong> – We stay true to our style and vision.</li>
            <li><strong>Quality First</strong> – Every stitch matters.</li>
            <li><strong>Sustainability</strong> – Conscious designs with a future-friendly approach.</li>
            <li><strong>Community</strong> – Built for the culture, by the culture.</li>
            <li><strong>Innovation</strong> – Designs that push the limits of creativity.</li>
          </ul>
        </section>

        {/* Product Line */}
        {/* <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Product Line</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Graphic T-Shirts</li>
            <li>Oversized Tees & Hoodies</li>
            <li>Caps & Beanies</li>
            <li>Cargo Pants & Shorts</li>
            <li>Limited-Edition Drops & Collaborations</li>
          </ul>
          <p className="text-gray-300 mt-2">
            New collections are launched quarterly, keeping in tune with seasonal trends and customer feedback.
          </p>
        </section> */}

        {/* Target Audience */}
        {/* <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Target Audience</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Gen Z and Millennials</li>
            <li>College students, creatives, and urban trendsetters</li>
            <li>Ages 16 to 30</li>
            <li>Style-conscious and socially aware individuals</li>
          </ul>
        </section> */}

        {/* Business Model */}
        {/* <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Business Model</h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>D2C (Direct to Consumer) via our official website and social media</li>
            <li>Limited Drops to maintain exclusivity</li>
            <li>Collaborations with local artists, musicians, and influencers</li>
            <li>Pop-up shops in select cities</li>
          </ul>
        </section> */}

        {/* Contact */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3">Contact & Socials</h2>
          <p className="text-gray-300 mb-2">📞 <strong>Phone:</strong> 9499961707</p>
          <p className="text-gray-300 mb-2">📧 <strong>Email:</strong> monstitchclothing@gmail.com</p>
          <p className="text-gray-300">📸 <strong>Instagram:</strong> <a href="https://instagram.com/monstitch.clothing" className="underline">monstitch.clothing</a></p>
        </section>

        {/* Founder’s Note */}
        <section className="border-t border-white pt-6">
          <p className="italic text-gray-400">
            “Monstitch Clothing was born out of a dream to make bold, expressive fashion accessible to young India. We’re not just building a brand, we’re building a culture — one stitch at a time.”
          </p>
          <p className="mt-2 text-gray-300 font-semibold">— Founder, Deepan Chakravathy</p>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
