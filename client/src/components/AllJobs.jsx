import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { LoaderCard } from "./Loader.jsx";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import {
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";

const searchKeywords = [
  "Frontend Developer",
  "Remote",
  "Internship",
  "Backend",
  "Fullstack",
  "Software Developer",
];
const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    getJobs();
  }, []);

  const cacheKey = "cachedJobs"; // Define a key for your local storage cache

  const getJobs = async () => {
    // Check local storage for cached data
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const cachedJobs = JSON.parse(cachedData);
      setJobs(cachedJobs);
    }

    const { data } = await axios.get(
      "https://cute-erin-cobra-kit.cyclic.app/getJobs",
      {
        params: { page: page, size: LIMIT },
      }
    );

    // Update the cache in local storage with the newly fetched data
    const updatedJobs = [...jobs, ...data.jobs];
    localStorage.setItem(cacheKey, JSON.stringify(updatedJobs));

    setPage(page + 1);
    setJobs(updatedJobs);
    setTotalJobs(data.total);
  };

  return (
    <section className="min-h-[87vh]  bg-gray-200">
      <div className="flex bg-gray-100 flex-col justify-center items-center w-full min-h-[30vh] drop-shadow-sm shadow-lg mb-20">
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
          {searchKeywords.map((keyword) => (
            <Button
              variant="text"
              className="bg-white bg-opacity-50 backdrop-blur-md shadow-md"
              size="sm"
              onClick={() => setSearch(keyword)}
            >
              {keyword}
            </Button>
          ))}

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

      <InfiniteScroll
        dataLength={jobs.length}
        next={getJobs}
        hasMore={jobs.length < totalJobs}
        loader={<LoaderCard />}
        endMessage={
          <h1 className="mx-auto text-center my-5 text-2xl font-bold">
            No More Jobs Available
          </h1>
        }
      >
        {jobs.length === 0 ? (
          <LoaderCard />
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
          </motion.div>
        )}
      </InfiniteScroll>
    </section>
  );
};

export default AllJobs;
