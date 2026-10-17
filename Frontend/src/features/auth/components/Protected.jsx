// // import React from "react";
// // import { Navigate, useNavigate } from "react-router";
// // import { useAuth } from "../hooks/useAuth.js";

// // const Protected = ({ children }) => {
// //   const { loading, user } = useAuth();

// //   if (loading) {
// //     return (
// //       <main>
// //         <h1>Loading...</h1>
// //       </main>
// //     );
// //   }
// //   if (!user) {
// //     return <Navigate to="/login"></Navigate>;
// //   }
// //   return children;
// // };

// // export default Protected;

import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";
import AppHeader from "./AppHeader.jsx";
import LoadingState from "../../shared/LoadingState.jsx";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingState message="Checking your session" detail="Securely preparing your workspace." />;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <AppHeader />
      {children}
    </>
  );
};

export default Protected;
