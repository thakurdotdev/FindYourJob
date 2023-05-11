import { ArrowRightIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="relative md:min-h-[82vh] overflow-hidden">
      <div className="container relative flex flex-col lg:flex-row items-center justify-between px-6 py-8 mx-auto">
        <div className="flex flex-col">
          <h1 className="w-full text-4xl font-light text-center text-gray-800 uppercase sm:text-5xl">
            "Connecting You to Your
            <span className="font-semibold text-light-blue-700 mx-2">
              Dream
            </span>
            Career"
          </h1>
          <h2 className="w-full py-8 mx-auto text-xl font-light text-center text-gray-500">
            Our job website is designed to simplify the job search process and
            help job seekers land their dream careers. We offer a wide range of
            job opportunities from top employers, along with helpful resources
            and tools to enhance your job search experience.
          </h2>
          <div className="flex items-center justify-center mt-4">
            <Link to="/jobs">
              <Button
                color="blue"
                variant="gradient"
                className="mr-4 flex justify-center items-center gap-2"
                fullWidth={true}
              >
                <BriefcaseIcon className="h-5 w-5" />
                See Jobs
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative block w-full mx-auto mt-6 md:mt-0">
          <img
            src="https://img.freepik.com/premium-photo/man-sitting-desk-working-laptop-3d-illustration-isolated-contains-clipping-path_1401-3900.jpg?size=626&ext=jpg"
            className="max-w-xs m-auto md:max-w-xl"
          />
        </div>
      </div>
    </main>
  );
};

export default Hero;
