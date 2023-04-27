import { useState } from "react";
import { Navigate } from "react-router-dom";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

const CreateJob = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleAddJob = async (e) => {
    e.preventDefault();
    try {
      const body = { company, position, workLocation, locationType };
      await fetch("http://localhost:5000/addJobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setNavigate(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <Card
      color="transparent"
      shadow={false}
      className="p-10 flex justify-center items-center min-h-[82vh]"
    >
      <Typography variant="h4" color="blue-gray">
        Add a new job
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Fill in the information below to get started.
      </Typography>
      <form
        onSubmit={handleAddJob}
        className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
      >
        <div className="mb-4 flex flex-col gap-6">
          <Input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            size="lg"
            label="Company"
          />
          <Input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            size="lg"
            label="Position"
          />
          <Input
            value={workLocation}
            onChange={(e) => setWorkLocation(e.target.value)}
            size="lg"
            label="workLocation"
          />
          <Input
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            size="lg"
            label="locationType"
          />
        </div>
        <Button type="submit" className="mt-6" fullWidth>
          Add job
        </Button>
      </form>
    </Card>
  );
};

export default CreateJob;
