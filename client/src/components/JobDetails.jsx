import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader } from "./Loader";
import { motion } from "framer-motion";

import { Button, Typography, Input } from "@material-tailwind/react";
import {
  ArrowLeftIcon,
  ArrowUpOnSquareIcon,
  BookmarkIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}job/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data.job);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!job) {
    return <Loader />;
  }

  const date = new Date(job?.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex bg-gray-200  flex-col items-center">
      <div className="w-full bg-gray-100 flex flex-col justify-center items-center min-h-[30vh] mb-10 text-black p-5">
        <div className="flex flex-col justify-center items-center w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl text-center font-bold">
            {job?.position}
          </h2>
          <p className="text-center text-2xl text-blue-600 font-semibold">
            {job?.company}
          </p>
        </div>

        <div className="flex flex-col justify-center items-center md:gap-5 md:flex-row w-full md:w-1/2 ">
          <Typography className="flex items-center my-2">
            <ClockIcon className="w-5 h-5 mr-2" />
            {date}
          </Typography>
          <Typography className="flex items-center my-2">
            <MapPinIcon className="w-5 h-5 mr-2" />
            {job?.workLocation},{job?.locationType}
          </Typography>
        </div>
        <div className="flex gap-4 my-5">
          <Link to={"/jobs"}>
            <Button
              variant="text"
              className="flex items-center gap-2 bg-blue-gray-50"
            >
              <ArrowLeftIcon strokeWidth={2} className="h-5 w-5" />
              All Jobs
            </Button>
          </Link>
          <Button
            variant="gradient"
            color="cyan"
            className="flex items-center gap-2"
          >
            <BookmarkIcon strokeWidth={2} className="h-5 w-5" />
            Save
          </Button>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex md:flex-row w-full justify-center items-center mb-5"
      >
        <div className="w-[95%] gap-5 flex justify-center flex-col md:w-1/2  px-4">
          <div className="bg-white drop-shadow-md rounded-md p-5">
            <Typography variant="h5" className="my-2">
              Job Description
            </Typography>
            <Typography variant="paragraph" className="text-justify">
              We are looking for a strong ReactJS Lead with 5+ years of
              experience to join our engineering team at Ahmedabad. The primary
              responsibility will be to lead the design and develop Enterprise
              Software for our Global Fortune 500 clients in Data Center and Big
              Data segments.
            </Typography>
          </div>
          <div className="bg-white drop-shadow-md rounded-md p-5">
            <Typography variant="h5" className="my-2">
              The Role:
            </Typography>
            <Typography variant="paragraph" className="text-justify">
              Responsible for providing expertise in software development life
              cycle, from concept, architecture, design, implementation, &
              testing.br Leading & mentoring team. Ensuring the code reviews &
              development best practices / processes to be followed. Be part of
              regular client communication. Estimates efforts , identify risks &
              provide technical support whenever needed. Ensures effective
              people management (performance reviews & feedback at very minimal
              level) & task management for smooth execution. Demonstrates
              ability to multitask & re-prioritize responsibilities based on
              dynamic requirements.
            </Typography>
          </div>
          <div className="bg-white drop-shadow-md rounded-md p-5">
            <Typography variant="h5" className="mb-2">
              Requirments:
            </Typography>
            <Typography variant="paragraph" className="text-justify">
              In the world of AI, behavioural predictions are leading the charge
              to better machine learning. There is so much happening in the AI
              space. Advances in the economic sectors have seen automated
              business practices rapidly increasing economic value. While the
              realm of the human sciences has used the power afforded by
              computational capabilities to solve many human based dilemmas.
              Even the art scene has adopted carefully selected ML applications
              to usher in the technological movement. engineering team.
            </Typography>
          </div>

          {/* Apply Part */}
          <div className="bg-white drop-shadow-md rounded-md p-5">
            <Typography variant="h5">Apply Now</Typography>
            <form className="mt-8 mb-2">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name*
                </Typography>
                <Input
                  size="lg"
                  placeholder="Pankaj Kumar"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  aria-required
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email*
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  aria-required
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Mobile No.
                </Typography>
                <Input
                  type="number"
                  size="lg"
                  placeholder="+91 8432832489"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Current Designation *
                </Typography>
                <Input
                  size="lg"
                  placeholder="React Js Developer"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  aria-required
                />
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Resume*
                </Typography>

                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-2 pb-2">
                      <ArrowUpOnSquareIcon className="h-6 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Only PDF File Format Allowed (Max Size 2 MB.)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <Button className="mt-6" color="blue" fullWidth>
                Send
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;
