import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Card, Input, Button, Typography } from "@material-tailwind/react";

const EditJob = () => {
  const { id } = useParams();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [locationType, setLocationType] = useState("");
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    getJob();
  }, []);

  const getJob = async () => {
    try {
      const response = await fetch(`http://localhost:5000/job/${id}`);
      const jsonData = await response.json();
      const { company, position, workLocation, locationType } = jsonData.job;
      setCompany(company);
      setPosition(position);
      setWorkLocation(workLocation);
      setLocationType(locationType);
    } catch (err) {
      console.error(err.message);
    }
  };

  const editJob = async (e) => {
    e.preventDefault();
    try {
      const body = { company, position, workLocation, locationType };
      await fetch(`http://localhost:5000/updateJob/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setNavigate(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/deleteJob/${id}`, {
        method: "DELETE",
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
        Edit job
      </Typography>

      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to edit job.
      </Typography>
      <form
        onSubmit={editJob}
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
          Edit
        </Button>
        <Button
          onClick={handleDelete}
          color="red"
          buttonType="outline"
          ripple="dark"
          className="mt-6"
          fullWidth
        >
          Delete
        </Button>
      </form>
    </Card>
  );
};

export default EditJob;
