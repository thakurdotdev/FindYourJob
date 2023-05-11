import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";

import { Button, Card, Typography } from "@material-tailwind/react";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`https://job-portal-app-kzk0.onrender.com/job/${id}`)
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

  return (
    <div className="flex flex-col-reverse md:flex-row w-full justify-center items-center">
      <div className="w-3/4 md:w-1/2 px-4 my-10">
        <Link to={"/"}>
          <Button variant="text" className="flex items-center gap-2 my-2">
            <ArrowLeftIcon strokeWidth={2} className="h-5 w-5" />
            All Jobs
          </Button>
        </Link>
        <Typography variant="h2" className="mb-8">
          {job.position}
        </Typography>
        <Typography variant="h5" className="my-2">
          The Role
        </Typography>
        <Typography variant="paragraph">
          In the world of AI, behavioural predictions are leading the charge to
          better machine learning. There is so much happening in the AI space.
          Advances in the economic sectors have seen automated business
          practices rapidly increasing economic value. While the realm of the
          human sciences has used the power afforded by computational
          capabilities to solve many human based dilemmas. Even the art scene
          has adopted carefully selected ML applications to usher in the
          technological movement. engineering team.
        </Typography>
        <Typography variant="h5" className="mb-2 mt-10">
          Requirments
        </Typography>
        <Typography variant="paragraph">
          In the world of AI, behavioural predictions are leading the charge to
          better machine learning. There is so much happening in the AI space.
          Advances in the economic sectors have seen automated business
          practices rapidly increasing economic value. While the realm of the
          human sciences has used the power afforded by computational
          capabilities to solve many human based dilemmas. Even the art scene
          has adopted carefully selected ML applications to usher in the
          technological movement. engineering team.
        </Typography>
      </div>
      <Card shadow={true} className="lg:w-60 flex flex-col bg-gray-50 p-10">
        <Typography variant="h4" className="mx-auto">
          {job?.company}
        </Typography>
        <Typography className="flex my-2">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {job?.createdAt}
        </Typography>
        <Typography className="flex my-2">
          <MapPinIcon className="w-5 h-5 mr-2" />
          {job?.workLocation},{job?.locationType}
        </Typography>
        <Button variant="text" className=" bg-blue-gray-50 mt-3">
          Apply Now
        </Button>
      </Card>
    </div>
  );
};

export default JobDetails;
