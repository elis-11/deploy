import { createContext, useContext, useState, useEffect } from "react";
import { checkAuthStatusApi, loginApi, logoutApi } from "../helpers/apiCalls";
import { useNavigate } from "react-router-dom";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

const DataProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const result = await checkAuthStatusApi()
      if (!user && !result.error) setUser(result)
    }
    checkAuthStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = async (email, password, redirectRoute = "/dashboard") => {
    if (!email || !password)
      return setError("Without Email & Password => no login!");

    const result = await loginApi(email, password);
    if (result.error) return setError(result.error);

    setUser(result);
    setError("");

    navigate(redirectRoute);
  };

  const logout = async () => {
    const result = await logoutApi();

    if (result.error) {
      return console.log("[OUCH]", result.error);
    }

    // logout user (=clear user state!)
    setUser();
    setBooks([]);

    navigate("/"); // Navigate to the home page
  };

  const sharedData = {
    user,
    setUser,
    books,
    setBooks,
    error,
    setError,
    login,
    logout,
  };

  return (
    <DataContext.Provider value={sharedData}>{children}</DataContext.Provider>
  );
};

export default DataProvider;
