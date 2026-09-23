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

import React from "react";
import { useAuth } from "../hooks/useAuth.js";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default Protected;
