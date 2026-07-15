export default function Hero() {
  return (
    <section className="reveal max-w-container-max mx-auto px-12 py-xl md:py-[120px] flex flex-col md:grid md:grid-cols-12 gap-gutter relative overflow-hidden">
      {/* Text column - Left */}
      <div className="md:col-span-7 flex flex-col justify-center z-10 reveal active">
        <span className="font-label-md text-label-md text-secondary mb-base tracking-widest uppercase">
          Ecosystem Intelligence
        </span>
        <h1 className="font-display-lg text-display-lg mb-md leading-tight max-w-[540px] text-primary">
          Cultivating the <span className="italic">Future</span> through Precision Data.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mb-lg max-w-[480px]">
          AetherAg leverages advanced sensor arrays and biomorphic monitoring to bring laboratory-grade precision to global field operations.
        </p>
        <div className="flex gap-md">
          <button
            onClick={() => {
              window.location.hash = "/platform";
            }}
            className="bg-primary text-on-primary px-8 py-3 rounded-DEFAULT font-label-md text-label-md hover:opacity-90 transition-all cursor-pointer border-0"
          >
            Explore Platform
          </button>
          <button
            onClick={() => {
              window.location.hash = "/research";
            }}
            className="border border-primary text-primary px-8 py-3 rounded-DEFAULT font-label-md text-label-md hover:bg-surface-container-high transition-all cursor-pointer"
          >
            Whitepaper
          </button>
        </div>
      </div>

      {/* Asymmetric Overlapping Images - Right */}
      <div className="md:col-span-5 relative mt-xl md:mt-0 reveal active">
        {/* Main large image */}
        <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg shadow-sm">
          <img
            alt="Macro foliage"
            className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqoaFpzZS7SxsYV-Cn4s-G8QfsyW079ryBEFEsv4C8FMlj4bBUGWirYwmiQaCOH6DqUzjnC8zyZ5PvGwvCm2oKhQxr8QBuk81YYlvyi8mOzaaSGei4VJ6GqkQ9NG2ZuUZNw29UQx9IafTcipuQ4ehX0YI__CxFTQzvozuvifgcTBUYIaksd1u6SkIij-AoYi44z5M_BGH4U_ZIY4kX2fZI2QCppPseJOdYulR16nlOWYDw9SAA2oEm8DAG9DZ2ZQgaoI3R3dfLzao"
          />
        </div>

        {/* Overlapping decorative gradient glow */}
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-container z-0 opacity-40 rounded-full blur-3xl"></div>

        {/* Small overlapping image card */}
        <div className="absolute -top-12 -right-4 w-48 h-48 aspect-square z-20 shadow-xl border-[12px] border-surface">
          <img
            alt="Seedling macro"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFbe00KWsQsaBNh8IZypSU-BYo7XUu5JFb-APNFx-O6Xacssf5L9jFdF23yIvvdCazdXCLyOHT37R82ZVDbF-qo--l0tWG4c7BJdKu_UwimGMWtDZUEVKSgY1i-7-LHGv0EpJBLYP7Fl7NzbNJigqrQTtPHmDYktbldz_SneyfxBLHgfQ2Y9As_IUZWqSZI-od3JkeT6cdTl5v4JoBPKO5u5glJfBIIOv1d1BBdsh5D3qViFVjUbzz3gUXoHnBFH8GMq_UT1Brsmg"
          />
        </div>
      </div>
    </section>
  );
}
