import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Loader from "./Loader";
import { motion } from "framer-motion";

import homeImg from "../assets/bg.jpg";
import ScrollToTop from "./ScrollToTop";
import { Input, Button, Typography } from "@material-tailwind/react";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

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

  const searchJob = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://job-portal-app-kzk0.onrender.com/searchJobs/${search}`
      );
      const jsonData = await response.json();
      setJobs(jsonData.jobs);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section id="jobs" className="bg-gray-100 overflow-hidden ">
      <div
        style={{
          backgroundImage: `url(${homeImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-center items-center min-h-[30vh] mb-10"
      >
        <Typography className="text-light-blue-900 text-4xl font-bold my-5">
          Search Your Dream Job
        </Typography>

        <form className="flex justify-center items-center gap-5">
          <div className="w-[32rem] relative">
            <Input
              type="text"
              variant="outlined"
              label="Search Job Title, Company, Location"
            />
            <Button
              size="sm"
              color={"blue"}
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>
        </form>
      </div>

      {jobs.length === 0 ? (
        <Loader />
      ) : (
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
      )}
      <ScrollToTop />
    </section>
  );
};

export default AllJobs;
