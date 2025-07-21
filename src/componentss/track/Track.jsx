const Track = () => {
  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-5 py-10 md:py-14">
        {/* Main */}
        <div className="flex flex-wrap -m-4 text-center">
          {/* Highlight 1: Bold Streetwear */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
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
                  d="M4.5 6.75l7.5 4.5 7.5-4.5m-15 0v10.5a2.25 2.25 0 002.25 2.25h11.25a2.25 2.25 0 002.25-2.25V6.75m-15 0L12 11.25m0 0l7.5-4.5"
                />
              </svg>
              <h2 className="text-lg font-semibold text-white mb-2">
                Bold Streetwear
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Designed for self-expression and individuality — fashion that speaks loud without saying a word.
              </p>
            </div>
          </div>

          {/* Highlight 2: Limited Edition Drops */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
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
                  d="M17.25 6.75v10.5m-10.5-10.5v10.5m4.5-10.5v10.5m4.5-10.5v10.5M6.75 6.75h10.5a2.25 2.25 0 012.25 2.25v6a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 15V9a2.25 2.25 0 012.25-2.25z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-white mb-2">
                Limited Edition Drops
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Exclusive releases that maintain hype and ensure your style stands out from the crowd.
              </p>
            </div>
          </div>

          {/* Highlight 3: Quality & Culture */}
          <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
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
                  d="M12 6v6l4 2m8-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-lg font-semibold text-white mb-2">
                Built for the Culture
              </h2>
              <p className="text-gray-400 leading-relaxed">
                More than a brand — it’s a movement fueled by quality, creativity, and the spirit of youth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Track;
