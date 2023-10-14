import { Spinner, Card } from "@material-tailwind/react";
import React from "react";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spinner color="blue" className="h-8 w-8" />
    </div>
  );
};

export const JobLoader = () => {
  return (
    <div className="flex justify-center items-center h-[60vh]">
      <Spinner color="blue" className="h-8 w-8" />
    </div>
  );
};

export const JobCardLoader = () => {
  return (
    <div className="flex flex-wrap gap-5">
      {Array(2)
        .fill()
        .map((index) => (
          <div
            key={index}
            className="h-32 w-full md:w-[640px] px-4 mb-10 bg-blue-50 border-b-2 border-b-blue-500 animate-pulse rounded-md"
          ></div>
        ))}
    </div>
  );
};
