// import { createContext, useEffect, useState } from "react";
// import { getme } from "./services/auth.api";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getAndSetUser = async () => {
//       const data = await getme();
//       setUser(data.user);
//       setLoading(false);
//     };
//     getAndSetUser();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };

import { useEffect, useState } from "react";
import { getme } from "./services/auth.api.js";
import { AuthContext } from "./auth.context.js";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const data = await getme();
        if (isMounted) {
          setUser(data.user);
        }
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Failed to restore session:", error);
        }
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
