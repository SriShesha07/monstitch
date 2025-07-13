const Track = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-5 py-10 md:py-14 ">
        {/* Main */}
        <div className="flex flex-wrap -m-4 text-center">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="p-4 md:w-1/3 sm:w-1/2 w-full">
              <div className="border border-gray-700 bg-zinc-900 hover:bg-zinc-800 hover:shadow-lg transition rounded-xl px-6 py-8 shadow-[inset_0_0_4px_rgba(255,255,255,0.05)] hover:-translate-y-1 transform transition-all duration-300">
                <svg
                  className="text-pink-500 w-12 h-12 mb-4 inline-block"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>

                <h2 className="text-lg font-semibold text-white mb-2">
                  Premium T-Shirts
                </h2>
                <p className="text-gray-400 leading-relaxed">
                  Our T-Shirts are 100% made of cotton.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Track;
