import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { LoaderCard } from "./Loader.jsx";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import { Input, Typography } from "@material-tailwind/react";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
  const LIMIT = 10;

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    const { data } = await axios.get(
      "https://findyourjob.up.railway.app/getJobs",
      {
        params: { page: page, size: LIMIT },
      }
    );

    setJobs([...jobs, ...data.jobs]);
    setTotalJobs(data.total);
    setPage(page + 1);
  };

  return (
    <section className="min-h-[87vh]  bg-gray-100">
      <div className="flex bg-white flex-col justify-center items-center w-full min-h-[30vh] drop-shadow-md mb-10 p-10">
        <Typography className="text-light-blue-900 text-2xl md:text-4xl font-bold my-5">
          Search Your Dream Job
        </Typography>

        <form className="flex justify-center items-center gap-5">
          <div className=" w-[20rem] md:w-[32rem] relative">
            <Input
              type="text"
              outline={true}
              placeholder="Search for a job"
              className="!border !border-gray-600 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              labelProps={{
                className: "hidden",
              }}
              containerProps={{ className: "min-w-[100px]" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
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
