export default function VisualBreak() {
  return (
    <section id="research" className="w-full h-[500px] relative overflow-hidden group">
      {/* Background dark gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/40 to-transparent"></div>

      {/* Image with zoom-hover effect */}
      <img
        alt="Large macro leaf texture"
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]"
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqoaFpzZS7SxsYV-Cn4s-G8QfsyW079ryBEFEsv4C8FMlj4bBUGWirYwmiQaCOH6DqUzjnC8zyZ5PvGwvCm2oKhQxr8QBuk81YYlvyi8mOzaaSGei4VJ6GqkQ9NG2ZuUZNw29UQx9IafTcipuQ4ehX0YI__CxFTQzvozuvifgcTBUYIaksd1u6SkIij-AoYi44z5M_BGH4U_ZIY4kX2fZI2QCppPseJOdYulR16nlOWYDw9SAA2oEm8DAG9DZ2ZQgaoI3R3dfLzao"
      />

      {/* Narrative content block */}
      <div className="absolute inset-0 z-20 flex items-center max-w-container-max mx-auto px-12 reveal">
        <div className="max-w-[400px] text-on-primary">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-md leading-tight">
            Grounded in Biological <span className="italic">Truth</span>.
          </h2>
          <p className="font-body-lg text-body-lg opacity-90">
            Experience the resolution of nature, captured and calculated for enterprise resilience.
          </p>
        </div>
      </div>
    </section>
  );
}
