// src/guards/RequireAuth.jsx
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
      const currentUser = useSelector((state)=>state.currentuserreducer)
    
  const location   = useLocation();

  if (!currentUser) {
    // Not logged in ➜ send to /Auth, but remember where they were heading.
    return <Navigate to="/Auth" state={{ from: location }} replace />;
  }

  // Logged in ➜ render whichever child route was requested.
  return <Outlet />;
};

export default RequireAuth;
