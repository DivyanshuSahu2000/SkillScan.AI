// import React, { useEffect, useState } from "react";
// import "../auth.form.scss";
// import { Link, replace, useNavigate } from "react-router";
// import { useAuth } from "../hooks/useAuth.js";

// const Login = () => {
//   const navigate = useNavigate();
//   const { loading, user, handleLogin } = useAuth();
//   const [email, setEmail] = useState("");
//   const [password, setPssword] = useState("");

//   useEffect(() => {
//     if (user) {
//       navigate("/", { replace: true });
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await handleLogin({ email, password });
//     // navigate("/");
//   };
//   if (loading) {
//     return <main>Loading....</main>;
//   }
//   return (
//     <main>
//       <div className="form-container">
//         <h1>Login</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <input
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               type="email"
//               id="email"
//               name="email"
//               placeholder="Enter Email here"
//             />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input
//               onChange={(e) => {
//                 setPssword(e.target.value);
//               }}
//               type="password"
//               id="password"
//               name="password"
//               placeholder="Enter Password here"
//             />
//           </div>
//           <button className="button primary-button">Login</button>
//         </form>
//         <p>
//           Don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </main>
//   );
// };

// export default Login;

import { useState } from "react";
import { useNavigate, Link } from "react-router";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";
import LoadingState from "../../shared/LoadingState.jsx";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await handleLogin({ email, password });
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to log in. Try again."
      );
    }
  };

  if (loading) {
    return <LoadingState message="Signing you in" detail="Checking your account securely." />;
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <p className="brand-name">
          SkillScan<span>.AI</span>
        </p>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              required
              id="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              required
              id="password"
              name="password"
              placeholder="Enter password"
            />
          </div>
          {error && <p role="alert">{error}</p>}
          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have an account? <Link to={"/register"}>Register</Link>{" "}
        </p>
      </div>
    </main>
  );
};

export default Login;
