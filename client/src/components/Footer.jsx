import { Typography } from "@material-tailwind/react";

const Footer = () => {
  return (
    <footer className="flex w-full items-center justify-center py-2">
      <Typography color="blue-gray" className="font-bold text-lg">
        &copy; 2023 Find Your Job
      </Typography>
    </footer>
  );
};

export default Footer;
