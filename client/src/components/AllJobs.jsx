import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  const getJobs = async () => {
    try {
      const response = await fetch("http://localhost:5000/getJobs");
      const jsonData = await response.json();
      setJobs(jsonData.jobs);
      console.log(jsonData.jobs);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <section className="py-24 bg-blueGray-50 overflow-hidden min-h-screen">
      <div className="container px-4 mx-auto">
        <h2 className="mb-5 text-6xl text-center font-bold font-heading font-heading tracking-px-n leading-none">
          Jobs
        </h2>
        <p className="mb-16 text-lg text-gray-600 text-center font-medium leading-normal md:max-w-lg mx-auto">
          All the jobs that are currently available in India...
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
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllJobs;
