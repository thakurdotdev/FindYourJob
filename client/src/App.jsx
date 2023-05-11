import CreateJob from "./components/CreateJob";
import AllJobs from "./components/AllJobs";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import EditJob from "./components/EditJob";
import { UserContextProvider } from "./Context/userContext";
import JobDetails from "./components/JobDetails";

const App = () => {
  return (
    <UserContextProvider>
      <Header />
      <Outlet />
      <Footer />
    </UserContextProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AllJobs /> },
      { path: "/addJob", element: <CreateJob /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/edit/:id", element: <EditJob /> },
      { path: "/job/:id", element: <JobDetails /> },

      { path: "*", element: <h1>Not Found</h1> },
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={appRouter} />;
};

export default Root;
