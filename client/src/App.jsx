import CreateJob from "./components/CreateJob";
import AllJobs from "./components/AllJobs";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import EditJob from "./components/EditJob";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
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
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={appRouter} />;
};

export default Root;
