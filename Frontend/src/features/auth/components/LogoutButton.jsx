import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth.js";

const LogoutButton = ({ className = "" }) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleClick = async () => {
    setError("");
    setLoading(true);
    try {
      await handleLogout();
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Could not log out. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="logout-control">
      <button
        type="button"
        className={`logout-button ${className}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "Logging out..." : "Log out"}
      </button>
      {error && (
        <p className="logout-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default LogoutButton;
