/* eslint-disable react/no-unescaped-entities */

const Testimonial = () => {
  return (
    <div>
      <section className="bg-black text-white body-font mb-10">
        {/* Main */}
        <div className="container px-5 py-10 mx-auto">
          {/* Heading */}
          <h1 className="text-center text-3xl font-bold">Testimonial</h1>
          {/* Subheading */}
          <h2 className="text-center text-2xl font-semibold mb-10">
            What our <span className="text-pink-500">customers</span> are saying
          </h2>

          <div className="flex flex-wrap -m-4">
            {/* Testimonial Card */}
            {[{
              name: "Kamal Nayan Upadhyay",
              role: "Senior Product Designer",
              img: "https://ecommerce-sk.vercel.app/img/kamal.png",
            },
            {
              name: "S Mishra",
              role: "UI Developer",
              img: "https://www.devknus.com/img/gawri.png",
            },
            {
              name: "XYZ",
              role: "CTO",
              img: "https://firebasestorage.googleapis.com/v0/b/devknus-official-database.appspot.com/o/images%2FScreenshot%202023-07-07%20at%202.20.32%20PM-modified.png?alt=media&token=324ddd80-2b40-422c-9f1c-1c1fa34943fa",
            }].map((person, index) => (
              <div key={index} className="lg:w-1/3 lg:mb-0 mb-6 p-4">
                <div className="h-full text-center bg-zinc-900 border border-gray-700 rounded-xl p-6 hover:shadow-lg hover:shadow-zinc-800 transition">
                  <img
                    alt="testimonial"
                    className="w-20 h-20 mb-6 object-cover object-center rounded-full inline-block border-2 border-zinc-600 bg-zinc-800"
                    src={person.img}
                  />
                  <p className="leading-relaxed text-gray-400">
                    Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-pink-500 mt-6 mb-4" />
                  <h2 className="font-medium title-font tracking-wider text-sm uppercase text-white">
                    {person.name}
                  </h2>
                  <p className="text-gray-500">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
