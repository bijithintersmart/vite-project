import React from "react";

const PageView = ({ title, description }) => {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 text-white p-4 overflow-hidden">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 drop-shadow-lg">
        {title}
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl font-light text-center max-w-3xl leading-relaxed opacity-90">
        {description}
      </p>
    </section>
  );
};

export default PageView;
