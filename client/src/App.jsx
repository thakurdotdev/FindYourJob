import React, { useContext } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import { UserContextProvider, UserContext } from "./Context/userContext";
import LoadingScreen from "./components/LoaderScreen";

// Directly imported components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Hero from "./components/Hero";
import AllJobs from "./components/AllJobs";
import CreateJob from "./components/CreateJob";
import Register from "./components/Register";
import Login from "./components/Login";
import EditJob from "./components/EditJob";
import JobDetails from "./components/JobDetails";
import Error from "./components/Error";
import UserProfile from "./components/Profile/UserProfile";

const PrivateRoutes = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <LoadingScreen isLoading={loading} />;
  }

  if (!user?.email) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/addJob" element={<CreateJob />} />
            <Route path="/edit/:id" element={<EditJob />} />
            <Route path="/user/profile" element={<UserProfile />} />
          </Route>

          <Route path="/" element={<Hero />} />
          <Route path="/jobs" element={<AllJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </UserContextProvider>
  );
}

export default App;
