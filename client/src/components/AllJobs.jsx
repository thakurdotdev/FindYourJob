import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import Loader from "./Loader";

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
    <section className="py-24 bg-blueGray-50 overflow-hidden min-h-[83vh] bg-gray-100">
      <div className="container px-4 mx-auto">
        <h2 className="mb-5 text-4xl text-center font-bold font-heading font-heading tracking-px-n leading-none">
          Jobs
        </h2>
        <p className="mb-12 text-center text-blueGray-500 text-xl">
          {jobs.length === 0
            ? "No jobs available"
            : `We have ${jobs.length} jobs available`}
        </p>

        <div className="flex flex-wrap">
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
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllJobs;
