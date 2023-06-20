import { Spinner } from "@material-tailwind/react";
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
