import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Loader from "./Loader";
import { motion } from "framer-motion";

import BgImg from "../assets/hero-bg.svg";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch(
        "https://job-portal-app-kzk0.onrender.com/getJobs"
      );
      const jsonData = await response.json();
      setJobs(jsonData.jobs);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (jobs.length === 0) {
    return <Loader />;
  }

  return (
    <section id="jobs" className="bg-blueGray-50 overflow-hidden ">
      <div
        style={{
          backgroundImage: `url(${BgImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-center items-center min-h-[30vh] mb-10"
      >
        <h2 className="text-4xl text-center font-bold font-heading tracking-px-n leading-none text-white mb-2">
          All Jobs
        </h2>
        <p className="text-center text-white text-lg font-semibold mb-6">
          {jobs.length === 0
            ? "Sorry, there are no jobs available at this time."
            : `We have ${jobs.length} jobs available.`}
        </p>
        <p className="text-center text-white text-base mb-4">
          Looking for a new career opportunity? Explore the latest job listings
          and find the perfect fit for you.
        </p>
      </div>

      <motion.div
        className="flex flex-wrap mx-auto md:mx-52"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={{
              company: job.company,
              position: job.position,
              workLocation: job.workLocation,
              locationType: job.locationType,
              id: job._id,
              author: job?.author?.name,
              authorId: job?.author?._id,
              updatedAt: job?.updatedAt,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default AllJobs;
