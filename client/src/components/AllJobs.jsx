import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Loader from "./Loader";
import { motion } from "framer-motion";

import homeImg from "../assets/bg.jpg";
import { Input, Typography } from "@material-tailwind/react";

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
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section className="bg-gray-100 overflow-hidden min-h-[85vh] ">
      <div
        style={{
          backgroundImage: `url(${homeImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="flex flex-col justify-center items-center w-full min-h-[30vh] mb-10"
      >
        <Typography className="text-light-blue-900 text-2xl md:text-4xl font-bold my-5">
          Search Your Dream Job
        </Typography>

        <form className="flex justify-center items-center gap-5">
          <div className=" w-[20rem] md:w-[32rem] relative">
            <Input
              type="text"
              label="Search Job Title, Company, Location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
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
          {jobs
            .filter((item) => {
              if (search === "") {
                return item;
              } else if (
                item.position.toLowerCase().includes(search.toLowerCase()) ||
                item.company.toLowerCase().includes(search.toLowerCase()) ||
                item.workLocation.toLowerCase().includes(search.toLowerCase())
              ) {
                return item;
              }
            })
            .map((job) => (
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
    </section>
  );
};

export default AllJobs;
