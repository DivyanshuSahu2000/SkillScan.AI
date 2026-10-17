import { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import LoadingState from "../../shared/LoadingState.jsx";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await handleRegister({ username, email, password });
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to create your account. Try again."
      );
    }
  };
  if (loading) {
    return <LoadingState message="Creating your account" detail="Setting up your SkillScan workspace." />;
  }

  return (
    <main className="auth-page">
      <div className="form-container">
        <p className="brand-name">
          SkillScan<span>.AI</span>
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              type="text"
              required
              id="username"
              name="username"
              placeholder="Enter Username here"
            />
          </div>
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
              placeholder="Enter Email here"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              minLength={8}
              required
              id="password"
              name="password"
              placeholder="Enter Password here"
            />
          </div>
          {error && <p role="alert">{error}</p>}
          <button className="button primary-button">Register</button>
        </form>{" "}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
