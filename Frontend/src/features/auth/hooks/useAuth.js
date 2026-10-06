import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { getme, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;
  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getme();
        // Optional chaining (?.) ensures it won't crash if data is undefined
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Failed to restore session (Server might be offline):",
          error
        );
        setUser(null);
      } finally {
        setLoading(false); // Turns off loading state even if server fails
      }
    };

    getAndSetUser();
  }, []);
  return { user, loading, handleLogin, handleLogout, handleRegister };
};
