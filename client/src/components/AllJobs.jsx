import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { JobCardLoader, JobLoader } from "./Loader.jsx";
import { motion } from "framer-motion";

import homeImg from "../assets/bg.jpg";
import { Button, Input, Typography } from "@material-tailwind/react";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs();
  }, [page]);

  const getJobs = async () => {
    try {
      const response = await fetch(
        `https://cute-erin-cobra-kit.cyclic.app/getJobs?page=${page}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const jsonData = await response.json();
      const data = jsonData.jobs;
      setJobs((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <section className="bg-gray-100 min-h-[87vh]">
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
        <div className="w-full flex flex-wrap justify-center items-center gap-5 mt-5">
          <Button
            variant="text"
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-md"
            size="sm"
            onClick={() => setSearch("Remote")}
          >
            Remote
          </Button>
          <Button
            variant="text"
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-md"
            size="sm"
            onClick={() => setSearch("Intern")}
          >
            Internship
          </Button>
          <Button
            variant="text"
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-md"
            size="sm"
            onClick={() => setSearch("Frontend")}
          >
            Frontend
          </Button>
          <Button
            variant="text"
            className="bg-white bg-opacity-50 backdrop-blur-md shadow-md"
            size="sm"
            onClick={() => setSearch("")}
          >
            All
          </Button>
        </div>
      </div>

      {jobs.length === 0 ? (
        <JobLoader />
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
                  author: job?.author,
                  updatedAt: job?.updatedAt,
                }}
              />
            ))}

          {loading ? (
            <JobCardLoader />
          ) : (
            <h1 className="mx-auto my-5 text-lg">No More Jobs Available</h1>
          )}
        </motion.div>
      )}
    </section>
  );
};

export default AllJobs;
