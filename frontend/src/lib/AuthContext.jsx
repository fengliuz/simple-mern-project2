import { useContext, createContext, useState } from "react";
import api from "./api";
import {LoaderIcon} from "lucide-react"
import { useEffect } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get("/me");
      setUser(res.data.user);
    } catch (error) {
      console.log(error.response.data);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser, loading, checkAuth }}>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          Loading... <LoaderIcon className=" spin"/>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
// eslint-disable-next-line
export const useAuth = () => useContext(AuthContext);
