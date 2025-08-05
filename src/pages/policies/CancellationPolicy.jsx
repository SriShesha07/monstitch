import React from 'react'
import Layout from '../../componentss/layout/Layout'

export default function CancellationPolicy() {
  return (
    <Layout>
        <div className="bg-black text-white min-h-screen px-6 py-12 font-sans leading-relaxed">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-extrabold mb-4">CANCELLATION & REFUND POLICY</h1>
            <p className="text-sm text-gray-400 mb-10">Last updated on <span className="text-white">Jul 15th 2025</span></p>
    
            {/* ==== START EDITING BELOW THIS LINE ==== */}
            <section className="space-y-6 text-gray-300">
              <p>
               Srinithy properties (Monstitch) believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy: 
              </p>
               <ul className="list-disc list-inside space-y-1">
                <li>
                    Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them. 
                </li>
                <li>
                    Srinithy properties does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good. 
                </li>
                <li>
                    In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products. 
                </li>
                <li>
                    In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision. 
                </li>
                <li>
                    In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them. 
                </li>
                <li>
                    In case of any Refunds approved by the Srinithy properties, it’ll take 6-8 days for the refund to be processed to the end customer. 
                </li>
               </ul>
    
              
            </section>
            {/* ==== END EDITING ABOVE THIS LINE ==== */}
          </div>
        </div>
        </Layout>
  )
}
