import React from "react";
import Layout from "../../componentss/layout/Layout";

const ShippingPolicy = () => {
  return (
    <Layout>
      <div className="bg-black text-white min-h-screen px-6 py-12 font-sans leading-relaxed">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-4">
            SHIPPING & DELIVERY POLICY
          </h1>
          <p className="text-sm text-gray-400 mb-10">
            Last updated on <span className="text-white">Jul 15th 2025</span>
          </p>

          {/* ==== START EDITING BELOW THIS LINE ==== */}
          <section className="space-y-6 text-gray-300">
            <p>
              For International buyers, orders are shipped and delivered through
              registered international courier companies and/or International
              speed post only. For domestic buyers, orders are shipped through
              registered domestic courier companies and /or speed post only.
              Orders are shipped within 7 days or as per the delivery date
              agreed at the time of order confirmation and delivering of the
              shipment subject to Courier Company / post office norms. Srinithy
              properties is not liable for any delay in delivery by the courier
              company / postal authorities and only guarantees to hand over the
              consignment to the courier company or postal authorities within
             7 days from the date of the order and payment or as per the
              delivery date agreed at the time of order confirmation. Delivery
              of all orders will be to the address provided by the buyer.
              Delivery of our services will be confirmed on your mail ID as
              specified during registration. For any issues in utilizing our
              services you may contact our helpdesk on 9499961707 or
              monstitchclothing@gmail.com
            </p>
          </section>
          {/* ==== END EDITING ABOVE THIS LINE ==== */}
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPolicy;
