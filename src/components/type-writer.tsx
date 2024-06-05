"use client";

import Typewriter from "typewriter-effect";

export const TypeWriterComponent = () => {
  return (
    <Typewriter
      options={{
        strings: ["Restaurants", "IT Consulting", "Real State"],
        autoStart: true,
        loop: true,
        cursor: "",
      }}
    />
  );
};
