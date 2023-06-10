import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CreateJob from "./components/CreateJob";
import AllJobs from "./components/AllJobs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import EditJob from "./components/EditJob";
import { UserContextProvider } from "./Context/userContext";
import JobDetails from "./components/JobDetails";
import Hero from "./components/Hero";
import Error from "./components/Error";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <UserContextProvider>
      <Header />
      <Outlet />
      <ScrollToTop />
      <Footer />
    </UserContextProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    errorElement: <Error />,
    children: [
      { path: "/", element: <Hero /> },
      { path: "/jobs", element: <AllJobs /> },
      { path: "/addJob", element: <CreateJob /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/edit/:id", element: <EditJob /> },
      { path: "/job/:id", element: <JobDetails /> },
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={appRouter} />;
};

export default Root;
